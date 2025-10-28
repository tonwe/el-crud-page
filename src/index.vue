<!-- crud组件 主要用于子组件的上下文传递 -->
<!-- 
    搜索组件配置 queryItems 可配置
    搜索及重置事件 queryTable 
     
    切换组件配置 tabPanes 可配置
    切换参数 tabQuery 
    
    按钮组件配置 buttons 可配置
    右侧工具条
    表格列配置 columns 可配置
    表格数据
    分页数据
 -->
<template>

    <div class="el-crud">
        <!-- 搜索过滤插槽 -->
        <slot name="query" :queryItems="queryItems" :lineClamp="queryLineClamp" :labelWidth="queryLabelWidth"
            :inputWidth="queryInputWidth" :inline="queryInline">
            <query-form v-show="showSearch" v-if="queryItems && queryItems.length" :queryItems="queryItems"
                :lineClamp="queryLineClamp" :label-width="queryLabelWidth" :input-width="queryInputWidth" :inline="queryInline"
                @queryTable="handleQuery" />
        </slot>
        <div class="container-main" :class="{ pt5: tabPanes.length > 0 }">
            <slot name="tabQuery">
                <el-tabs class="top-tab-query" v-if="tabPanes.length > 0" :value="tabQuery.tabKey"
                    @tab-click="handleTabClick">
                    <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabPanes"
                        :key="item.name"></el-tab-pane>
                </el-tabs>
            </slot>
            <!-- 工具条插槽 -->
            <div class="flex justify-between el-crud-toolbar">
                <slot name="buttons" :selections="selections">
                    <div>
                        <el-button :size="item.size" @click="handleButtonClick(item)" v-for="(item,index) in actionButtons" :key="`${item.key || ('action-btn-'+index)}`"
                            :plain="item.plain" :disabled="item.disabled" :type="item.type" :icon="item.icon">{{
                                item.text
                            }}</el-button>
                    </div>
                </slot>
                <slot name="toolbar" :columns="columns" :showSearch="showSearch">
                    <right-toolbar :showSearch.sync="showSearch" @queryTable="refresh" :columns="columns"
                        :search="!!(queryItems && queryItems.length)"></right-toolbar>
                </slot>
            </div>
            <!-- 默认插槽 并传 data -->
            <slot :data="data">
                <crud-table v-loading="listLoading" size="mini" @selection-change="handleSelectionChange"
                    :highlightCol="highlightCol" :resizable="resizable" :border="border" :columns="columns" :data="data"
                    @row-action="handleRowAction" @sort-change="handleSortChange"
                    :default-sort="defaultSort"></crud-table>
            </slot>
            <!-- 分页插槽 并传 total queryParams -->
            <slot name="pagination" :total="total" :pagination="pagination">
                <pagination v-show="total > 0" :total="total" :page.sync="pagination.pageNum"
                    :limit.sync="pagination.pageSize" @pagination="refresh" />
            </slot>
        </div>

    </div>

</template>


<script>
import CrudTable from "./table.vue";
import RightToolbar from "./rightToolbar.vue";
import QueryForm from "./queryForm.vue";
import Pagination from "./pagination.vue"
import { toLine } from "./utils";

export default {
    components: {
        CrudTable, RightToolbar, QueryForm, Pagination
    },
    name: 'Crud',
    provide() {
        return {
            crud: this
        };
    },
    props: {
        queryParamsMethod: {
            type: Function
        },
        columns: {
            type: Array,
            default: () => []
        },
        queryItems: {
            type: Array,
            default: () => []
        },
        queryLineClamp: {
            type: Number,
            default: 1
        },
        queryLabelWidth: {
            type: Number,
            default: 80
        },
        queryInputWidth: {
            type: Number,
            default: 210
        },
        queryInline: {
            type: Boolean,
            default: true
        },
        buttons: {
            type: Array | Function,
            default: () => []
        },
        tabPanes: {
            type: Array,
            default: () => []
        },
        defaultSort: {
            type: Object,
            default: () => {
                return {
                    prop: undefined,
                    order: undefined
                }
            }
        },
        highlightCol: {
            type: Boolean,
            default: false
        },
        resizable: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        tabPanes: {
            handler(val) {
                if (val.length) {

                    this.tabQuery.tabKey = val[0].name
                }
            },
            deep: true,
            immediate: true
        },
        "tabQuery.tabKey": {
            handler(val) {
                this.$emit("tabChange", val);
            },

        }
    },
    computed: {
        actionButtons() {
            let buts = this.buttons;
            if (typeof buts === 'function') {
                return buts(this.selections);
            } else if (buts?.length) {
                return buts
            }
            return []
        }
    },
    data() {
        return {
            listLoading: false,
            showSearch: true,
            selections: [],
            data: [],
            service: { // 增删改查导出
                add: null,
                update: null,
                delete: null,
                page: null,
                info: null,
                list: null,
                export: null,
            }, // 服务
            queryParams: {
                // pageNum: 1,
                // pageSize: 10
            }, // 查询参数

            tabQuery: {
                tabKey: undefined
            }, // 参数
            filterParams: {}, // 过滤参数
            pagination: {
                pageNum: 1,
                pageSize: 10
            },
            orderParams: {
                orderByRowName: undefined,
                orderByRule: undefined
            },
            total: 0,

        }
    },
    created() {
    },
    methods: {
        handleTabClick(tab) {
            this.tabQuery.tabKey = tab.name
            this.refresh()
        },
        handleSelectionChange(e) {
            this.selections = e
        },
        handleQuery(query) {
            this.queryParams = query;
            this.refresh()
        },
        handleButtonClick(item) {
            this.$emit("action", item.action, this.selections);
        },
        handleRowAction(action, scope) {
            this.$emit("row-action", action, scope);
            if (action === 'delete' && this.service.delete) {
                this.delete(scope)
            }
        },
        handleSortChange(column) {
            this.orderParams.orderByRowName = toLine(column.prop);
            if (column.order == "descending") {
                this.orderParams.orderByRule = "desc";
            } else if (column.order == "ascending") {
                this.orderParams.orderByRule = "asc";
            } else {
                this.orderParams.orderByRule = undefined;
                this.orderParams.orderByRowName = undefined;
            }
            this.refresh();
        },
        // 服务
        setService(service) {
            this.service = Object.assign(this.service, service);
        },
        // 设置列
        setColumns(columns) {
            this.columns = columns;
        },
        // 设置数据
        setData(data) {
            // this.crud.data = data;
        },
        // 获得查询参数
        async getParams() {
            const defaultSort = this.defaultSort;
            let orderParams = this.orderParams;

            if (!orderParams?.orderByRowName && defaultSort?.prop) {
                const orderByRowName = toLine(defaultSort.prop);
                let orderByRule = defaultSort.order;

                if (defaultSort.order == "descending") {
                    orderByRule = "desc";
                } else if (defaultSort.order == "ascending") {
                    orderByRule = "asc";
                }

                orderParams = {
                    orderByRowName,
                    orderByRule
                }
            }

            let params = { ...this.queryParams, ...this.pagination, ...this.tabQuery, ...orderParams }



            if (this.queryParamsMethod) {
                return await this.queryParamsMethod(params);
            }
            return params;
        },
        // 刷新列表数据
        async refresh() {
            this.listLoading = true;
            try {
                const queryParams = await this.getParams();
                const { code, rows, total } = await this.service.page(queryParams);
                if (code === 200) {
                    this.data = rows;
                    this.total = total;
                }

            } catch (error) {
                console.log(error);
            }
            this.listLoading = false;
        },
        // 删除
        async delete({ row }) {
            try {
                let id = row?.id;
                await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                const { code } = await this.service.delete(id);
                if (code === 200) {
                    this.refresh();
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                }
            } catch (error) {
                console.log(error);

            }


        }

    }

}

</script>

<style scoped lang="scss">
.top-tab-query {
    margin-bottom: 10px;

    &::v-deep {
        .el-tabs__header {
            margin: 0;
        }
    }
}
</style>