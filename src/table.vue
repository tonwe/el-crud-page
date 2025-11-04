<!-- crud table 组件 -->
<template>
    <el-table :data="data" class="crud-table" ref="table" v-bind="combinedProps" v-on="combinedEvents">
        <crud-table-column v-for="(column,index) in columns" :key="`${ column.key || ('column_'+index) }`" :indexMethod="(index)=>( baseIndex + 1 + index )"
            v-if="!column[`v-hasPermi`] || !column[`v-hasPermi`].length || $auth.hasPermiOr(column[`v-hasPermi`] || [])"
            :column="column" @action="onRowAction">
        </crud-table-column>
    </el-table>
</template>
<script>


/**
 * CRUD table组件
 */

import CrudTableColumn from "./tableColumn.js";

export default {
    name: "CrudTable",
    components: {
        CrudTableColumn
    },
    inject: ["crud"],
    props: {
        columns: {
            type: Array,
            default: () => []
        },
        on: {
            type: Object,
            default: () => {
                return {};
            }
        },
        data: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
            emit: {},
            defaultProps: {
                stripe: true,
                size: "mini",
            }
        };
    },
    computed: {
        // 将外部传入的 props 与 crud 内部样式合并
        combinedProps() {
            return Object.assign({}, this.defaultProps, this.$attrs);
        },
        // 将各事件处理函数合并，包括 emit 与 on 上的回调
        combinedEvents() {
            return Object.assign(
                {},
                {
                    "selection-change": this.onSelectionChange,
                    "sort-change": this.onSortChange,
                    "row-contextmenu": this.onRowContextMenu
                },
                this.emit,
                this.on
            );
        },
        baseIndex(){
            if( this.crud?.pagination ){
                return (this.crud?.pagination?.pageNum-1) * this.crud?.pagination?.pageSize;
            }else{
                return 0;
            }
        }
    },
    mounted() {
        this.bindEmits();
        this.bindMethods();
    },
    methods: {
        // 绑定 el-table 回调
        bindEmits() {
            const emits = [
                "select",
                "select-all",
                "cell-mouse-enter",
                "cell-mouse-leave",
                "cell-click",
                "cell-dblclick",
                "row-click",
                "row-contextmenu",
                "row-dblclick",
                "header-click",
                "header-contextmenu",
                "filter-change",
                "current-change",
                "header-dragend",
                "expand-change"
            ];

            emits.forEach((name) => {
                this.emit[name] = (...args) => {
                    this.$emit(name, ...args);
                };
            });
        },

        // 绑定 el-table 事件
        bindMethods() {
            const methods = [
                "clearSelection",
                "toggleRowSelection",
                "toggleAllSelection",
                "toggleRowExpansion",
                "setCurrentRow",
                "clearSort",
                "clearFilter",
                "doLayout",
                "sort"
            ];

            methods.forEach((n) => {
                this[n] = this.$refs["table"][n];
            });
        },
        onSelectionChange(selection) {
            this.$emit("selection-change", selection);
        },
        onSortChange({ prop, order }) {
            this.$emit("sort-change", { prop, order });
        },
        onRowContextMenu(row, column, event) {
            this.$emit("row-contextmenu", row, column, event);
        },
        onRowAction(action, scope) {
            this.$emit("row-action", action, scope);
            this.$emit(`row-${action}`, scope);
        }
    }

}
</script>

<style scoped lang="scss">
.crud-table {
    &::v-deep {
        .el-table__fixed,
        .el-table__body-wrapper {
            .el-table__cell {
                .cell:empty::after {
                    content: '/';
                    color: #c0c4cc;
                }
            }
        }
    }
}
</style>
