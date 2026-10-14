<template>
    <!-- 
     
    queryItems: [
                // input string
                {
                    label: "项目名称",
                    prop: "name",
                    type: "input",
                    placeholder: "请输入项目名称",
                },
                // select
                {
                    label: "申办单位",
                    prop: "sponsorId",
                    type: "select",
                    placeholder: "请选择申办单位",
                    options: [],
                },
                // date日期
                {
                    label: "创建日期",
                    prop: ["createDateStart", "createDateEnd"],
                    type: "date",
                    range: true,
                    placeholder: "请选择创建日期",
                },
                // datetime 时间
                {
                    label: "更新时间",
                    prop: "updateTime",
                    type: "datetime",
                    placeholder: "请选择更新时间",
                },
            ],
    
    -->
    <div class="container-main el-crud-query" v-if="queryItems.length">
        <el-form :model="queryParams" :size="size" :style="{ maxHeight: expand || formMaxHeight === null ? '' : (formMaxHeight + 'px') }"
            ref="queryForm" :inline="inline" :label-width="labelWidthStr" class="el-crud-query-form" @submit.native.prevent>
            <el-form-item v-for="item in queryFormItems" v-show="expand || !item.hidden" :label="item.label"
                :prop="item.prop" :key="item.prop">
                <el-input v-if="item.type === 'input'" v-model="queryParams[item.prop]" :placeholder="item.placeholder"
                    clearable @keyup.enter.native="handleQuery" :style="inputStyle"></el-input>
                <el-select v-else-if="item.type === 'select'" v-model="queryParams[item.prop]"
                    :placeholder="item.placeholder" clearable filterable
                    @visible-change="($event) => item.visibleChange && item.visibleChange($event, queryParams)"
                    :style="inputStyle">
                    
                    <template v-if="typeof item.options === 'function'">
                        <el-option v-for="option in item.options()" :key="option.value" :label="option.label" :value="option.value"></el-option>
                    </template>
                    <template v-else>
                        <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value"></el-option>
                    </template>

                </el-select>

                <el-date-picker v-else-if="item.type === 'date'" :type="item.range ? 'daterange' : 'date'"
                    v-model="queryParams[item.prop]" :placeholder="item.placeholder" clearable
                    :start-placeholder="item['startPlaceholder'] || '开始日期'"
                    :end-placeholder="item['endPlaceholder'] || '结束日期'" :range-separator="item['rangeSeparator']"
                    :value-format="item['valueFormat'] || 'yyyy-MM-dd'"
                    :style="inputStyle"></el-date-picker>
                <el-date-picker v-else-if="item.type === 'datetime'" :type="item.range ? 'datetimerange' : 'datetime'"
                    v-model="queryParams[item.prop]" :placeholder="item.placeholder" clearable
                    :start-placeholder="item['startPlaceholder'] || '开始时间'"
                    :end-placeholder="item['endPlaceholder'] || '结束时间'" :range-separator="item['rangeSeparator']"
                    :value-format="item['valueFormat'] || 'yyyy-MM-dd HH:mm:ss'"
                    :style="item.range ? dateRangeStyle : inputStyle"></el-date-picker>
            </el-form-item>
            <el-form-item label=" " ref="queryFormBtn">
                <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
                <el-button type="text" @click="handelExpand" v-if="needExpand">
                    <span>更多</span>
                    <i :class="expand ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
                </el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>

import { debounce } from './utils'
export default {
    props: {

        // queryParams: {
        //     type: Object,
        //     required: true
        // },
        queryItems: {
            type: Array,
            required: true
        },
        size: {
            type: String,
            default: 'mini'
        },
        labelWidth: {
            type: Number,
            default: 80
        },
        inputWidth: {
            type: Number,
            default: 200
        },
        lineClamp: {
            type: Number,
            default: 1
        },
        inline: {
            type: Boolean,
            default: true
        }

    },
    watch: {
        queryItems: {
            handler(val) {
                this.reset()
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        this.$_layoutActive = false;
        this.$_layoutVersion = 0;
    },
    data() {
        return {
            queryParams: {},
            queryFormItems: [],
            formMaxHeight: null,
            expand: false,
            needExpand: false,
            // 用于展示窗口大小变化绑定
            $_sidebarElm: null,
            $_resizeHandler: null
        }
    },
    computed: {
        labelWidthStr() {
            if (typeof this.labelWidth === 'number') {
                return this.labelWidth + 'px';
            }
            return this.labelWidth + 'px';
        },
        inputStyle() {
            return {
                width: this.inputWidth + 'px'
            };
        },
        dateRangeStyle() {
            return {
                width: (this.inputWidth * 2 + this.labelWidth + 10) + 'px'
            };
        }
    },
    mounted() {
        this.bindResize();
        this.refreshLayout();
    },
    activated() {
        if (!this.$_resizeHandler) {
            this.bindResize();
        }
        this.refreshLayout();
    },
    beforeDestroy() {
        this.unbindResize();
    },
    deactivated() {
        this.unbindResize();
    },
    methods: {
        $_sidebarResizeHandler(e) {
            if (e.propertyName === 'width') {
                this.$_resizeHandler && this.$_resizeHandler()
            }
        },
        // 展示窗口大小变化绑定
        bindResize() {
            this.$_layoutActive = true;
            this.$_resizeHandler = debounce(() => {
                this.refreshLayout();
            }, 100)

            window.addEventListener('resize', this.$_resizeHandler);
            this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
            this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
            if (typeof ResizeObserver !== 'undefined') {
                this.$_resizeObserver = new ResizeObserver(entries => {
                    const { width, height } = entries[0].contentRect;
                    const visible = width > 0 && height > 0;
                    if (width !== this.$_observedWidth || visible !== this.$_observedVisible) {
                        this.$_observedWidth = width;
                        this.$_observedVisible = visible;
                        this.$_resizeHandler && this.$_resizeHandler();
                    }
                });
            }
        },
        // unbindResize 
        unbindResize() {
            this.$_layoutActive = false;
            this.$_layoutVersion++;
            window.removeEventListener('resize', this.$_resizeHandler)
            this.$_resizeHandler = null
            this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
            this.$_resizeObserver && this.$_resizeObserver.disconnect();
            this.$_resizeObserver = null;
            this.$_observedForm = null;
            this.$_observedWidth = null;
            this.$_observedVisible = null;
        },
        refreshLayout() {
            if (!this.$_layoutActive) return;
            const version = ++this.$_layoutVersion;
            // 先解除上一次折叠，再在可见的 DOM 上测量，避免隐藏页面的零高度污染布局。
            this.formMaxHeight = null;
            this.needExpand = false;
            this.queryFormItems.forEach(item => {
                this.$set(item, 'hidden', false);
            });
            this.$nextTick(() => {
                if (!this.$_layoutActive || version !== this.$_layoutVersion) return;
                const form = this.$refs.queryForm?.$el;
                if (this.$_resizeObserver && form !== this.$_observedForm) {
                    this.$_resizeObserver.disconnect();
                    this.$_observedForm = form;
                    this.$_observedWidth = null;
                    this.$_observedVisible = null;
                    if (form) this.$_resizeObserver.observe(form);
                }
                if (!form || !form.clientWidth || !form.clientHeight) return;
                const rowHeight = this.measureHeight();
                const maxHeight = rowHeight * this.lineClamp;
                if (!Number.isFinite(maxHeight) || maxHeight <= 0) return;
                this.formMaxHeight = maxHeight;
                this.handleNeedExpand();
                this.redraw(version);
            });
        },
        handelExpand() {
            this.expand = !this.expand;
            this.refreshLayout();

        },
        handleNeedExpand() {
            const $queryForm = this.$refs?.queryForm?.$el;
            if (!$queryForm || this.formMaxHeight === null) return;
            let scrollHeight = $queryForm.scrollHeight;
            if ( this.formMaxHeight < scrollHeight) {
                this.needExpand = true;
            } else {
                this.needExpand = false;
            }

        },
        // 
        redraw(version = this.$_layoutVersion) {
            if (!this.$_layoutActive || version !== this.$_layoutVersion || this.expand || this.formMaxHeight === null) {
                return;
            }
            // 确保DOM完全渲染后再执行某些操作
            const $queryForm = this.$refs?.queryForm?.$el;
            if (!$queryForm) return;
            $queryForm.style.overflow = "hidden";
            this.$nextTick(() => {
                if (!this.$_layoutActive || version !== this.$_layoutVersion || this.expand || !$queryForm.clientWidth || !$queryForm.clientHeight) return;
                let scrollHeight = $queryForm.scrollHeight;
                let clientHeight = $queryForm.clientHeight;
                if (scrollHeight > clientHeight) {
                    let noHiddenItems = this.queryFormItems.filter(item => !item.hidden);
                    let lastItem = noHiddenItems.find((item, index) => (noHiddenItems.length - 1 == index))
                    if (lastItem) {
                        this.$set(lastItem, 'hidden', true);
                        this.redraw(version);
                    }

                }
                // 判断是否有滚动条

            });


        },

        //测量单行高度 + margin-top + margin-bottom
        measureHeight() {
            let queryFormBtn = this.$refs.queryFormBtn;
            if(queryFormBtn){
                let queryFormBtnHeight = queryFormBtn.$el.clientHeight;
                if (!queryFormBtnHeight) return;
                let queryFormItemsMarginTop = parseFloat(window.getComputedStyle(queryFormBtn.$el).marginTop) || 0;
                let queryFormItemsMarginBottom = parseFloat(window.getComputedStyle(queryFormBtn.$el).marginBottom) || 0;
                return queryFormBtnHeight + queryFormItemsMarginTop + queryFormItemsMarginBottom
            }
            
        },

        reset() {
            this.queryItems.forEach(item => {
                this.$set(this.queryParams, item.prop, null);
            });
            this.queryFormItems = this.queryItems.map(item => {
                let placeholder = item.placeholder;
                if( !placeholder){

                    switch (item.type) {
                        case 'input':
                            placeholder = '请输入' + item.label;
                            break;
                        default:
                            placeholder = '请选择' + item.label;
                    }

                }


                return {
                    ...item,
                    placeholder,
                    hidden: false
                }
            });
            this.refreshLayout();
        },
        resetQuery() {

            this.$refs.queryForm?.resetFields();
            this.handleQuery();
        },
        handleQuery() {
            this.$emit('queryTable', this.queryParams);
        }

    }
}

</script>

<style scoped lang="scss">
.container-main{
    background-color: #fff;
}
.el-crud-query{
    overflow: hidden;
    .el-crud-query-form {
        margin-bottom: -10px;

        &::v-deep {
            .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
                margin-bottom: 10px;
            }
        }
    }
}


</style>
