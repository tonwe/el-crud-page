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
        <el-form :model="queryParams" :size="size" :style="{ maxHeight: expand ? '' : (formMaxHeight + 'px') }"
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
         
    },
    data() {
        return {
            queryParams: {},
            queryFormItems: [],
            formMaxHeight: 0,
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
        this.$nextTick(() => {
            this.formMaxHeight = this.measureHeight() * this.lineClamp; 
            // this.handleNeedExpand()
            this.redraw();
            this.bindResize();
            setTimeout(() => {
                this.$_resizeHandler && this.$_resizeHandler();
            }, 100);
            
        });

    },
    activated() {
        if (!this.$_resizeHandler) {
            this.bindResize();
        }
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
                this.$_resizeHandler()
            }
        },
        // 展示窗口大小变化绑定
        bindResize() {
            this.$_resizeHandler = debounce(() => {
                this.drawTime = 0;
                this.queryFormItems.forEach(item => {
                    item.hidden = false;
                });
                this.$nextTick(() => {
                    this.handleNeedExpand()
                    this.redraw();
                })

            }, 100)

            window.addEventListener('resize', this.$_resizeHandler);
            this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
            this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)


        },
        // unbindResize 
        unbindResize() {
            window.removeEventListener('resize', this.$_resizeHandler)
            this.$_resizeHandler = null
            this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
        },
        handelExpand() {
            this.drawTime = 0;
            this.expand = !this.expand;
            this.$_resizeHandler();

        },
        handleNeedExpand() {
            const $queryForm = this.$refs?.queryForm?.$el;
            let scrollHeight = $queryForm.scrollHeight;
            if ( this.formMaxHeight < scrollHeight) {
                this.needExpand = true;
            } else {
                this.needExpand = false;
            }

        },
        // 
        redraw() {
            if (typeof this.drawTime == 'undefined') {
                this.drawTime = 0;
            }
            if (this.drawTime > 60) {
                return;
            }
            // 确保DOM完全渲染后再执行某些操作
            const $queryForm = this.$refs?.queryForm?.$el;
            if ($queryForm) {
                $queryForm.style.overflow = "hidden";
            }
            this.$nextTick(() => {
                let scrollHeight = $queryForm.scrollHeight;
                let clientHeight = $queryForm.clientHeight;
                if (scrollHeight > clientHeight) {
                    this.drawTime++;
                    let noHiddenItems = this.queryFormItems.filter(item => !item.hidden);
                    let lastItem = noHiddenItems.find((item, index) => (noHiddenItems.length - 1 == index))
                    if (lastItem) {
                        this.$set(lastItem, 'hidden', true);
                        this.redraw();
                    }

                }
                // 判断是否有滚动条

            });


        },

        //测量单行高度 + margin-top + margin-bottom
        measureHeight() {
            let queryFormBtn = this.$refs.queryFormBtn;
            if(queryFormBtn){
                let queryFormBtnHeight = queryFormBtn.$el.clientHeight || 29;
                let queryFormItemsMarginTop = parseInt(window.getComputedStyle(queryFormBtn.$el).marginTop);
                let queryFormItemsMarginBottom = parseInt(window.getComputedStyle(queryFormBtn.$el).marginBottom);
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
    padding: 10px;
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
