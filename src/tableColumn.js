// 组件说明：TableColumn 用于在 CRUD 表格中动态渲染列，支持嵌套子列，处理字典与格式化展示。
import { renderNode } from "./utils/vnode.jsx";
import { isFunction, isString, isArray, cloneDeep, isObject,isPromise } from "./utils";


const TableColumn = {
    // 组件名称
    name: "TableColumn",
    data() {
        return {
            // emit:{},
            actionMap: {
                info: {
                    label: "详情",
                    type: "text",
                    action: "info",
                    icon: "el-icon-document"
                },
                update: {
                    label: "编辑",
                    type: "text",
                    action: "update",
                    icon: "el-icon-edit"
                },
                delete: {
                    label: "删除",
                    type: "text",
                    action: "delete",
                    icon: "el-icon-delete"
                },
                 
            }
        }
    },
    props: {
        // 列配置对象，包含列属性、子列、格式化函数等
        column: {
            type: Object,
            required: true
        },
        // 行索引生成方法，用于动态生成行号
        indexMethod: {
            type: Function,
            required: false
        },
    },
    computed: {
        // 判断当前列是否包含子列
        hasChildren() {
            return this.column.children && this.column.children.length > 0;
        },
        // 生成并返回列的属性集合，默认居中对齐
        columnProps() {
            return Object.assign({}, this.column, {
                align: this.column.align || "center"
            });
        },
        // 生成唯一的列 key，用于 Vue 渲染优化
        columnKey() {
            return "crud-table-column-" + (this.column.prop || Math.random());
        },
        
    },
    mounted() {
    },
    methods: {
        // 根据传入值查找并返回字典中对应的对象
        getDict(value) {
            if( isPromise(this.column.dict)){
                this.column.dict.then((dict)=>{
                    this.column.dict = dict;
                });
                return null
             }
            // this.column.dict 如果 this.column.dict 是个 function
            // 则调用 this.column.dict(value) 返回字典对象
            if (typeof this.column.dict === "function") {
                return this.column.dict(value).find(d => d.value == value);
            }

            if (this.column.dict) {
                return this.column.dict?.find(d => d.value == value);
            }
            return null;
        },
        // 检查传入的值是否严格为 null
        isNull(val) {
            return val === null;
        },
        renderNode(vnode, options) {
            return renderNode.call(this, vnode, options);
        },
        renderSelection(h) {
            return h(
                "el-table-column",
                {
                    key: this.columnKey,
                    props: Object.assign({}, this.columnProps, { index: this.indexMethod })
                },
                []
            );

        },
        // 渲染操作列
        renderActions(h) {
            return h(
                "el-table-column",
                {
                    key: this.columnKey,
                    props: Object.assign({}, this.columnProps, { index: this.indexMethod }),
                    scopedSlots: {
                        default: scope => {
                            let actions = this.column.actions;
                            if (isFunction(this.column.actions)) {
                                actions = this.column.actions({ scope, h });
                            }

                            return actions?.map(action => {

                                // 自定义渲染函数
                                if (isFunction(action)) {
                                    return action({ scope, h });
                                }
                                // 预设的操作映射
                                if (isString(action)) {
                                    action = this.actionMap[action];
                                    if( !action){
                                        return null;
                                    }
                                }
                                // action 如果是数组 创建 更多 按钮列表
                                if (isArray(action)) {
                                    return h(
                                        "el-dropdown",
                                        {
                                            props: {
                                                trigger: "hover",
                                                // size: "mini"
                                            },
                                            on: {
                                                command: (e) => {
                                                    this.$emit("action", e, scope);
                                                }
                                            },
                                            style: {
                                                right: "auto",
                                                "margin-left":"10px"
                                            }
                                        },
                                        [
                                            h(
                                                "span",
                                                {
                                                    class: "el-dropdown-link",
                                                    style: "margin-left: 0",
                                                },
                                                [
                                                    "更多",
                                                    h("i", {
                                                        class: "el-icon-arrow-down el-icon--right"
                                                    })
                                                ]
                                            ),
                                            h(
                                                "el-dropdown-menu",
                                                {
                                                    slot: "dropdown"
                                                },
                                                action.map(item => {
                                                    let _item = item 
                                                    // 预设的操作映射
                                                    if (isString(_item)) {
                                                        _item = this.actionMap[_item];
                                                        if( !_item){
                                                            return null;
                                                        }
                                                    }
                                                    return h(
                                                        "el-dropdown-item",
                                                        {
                                                            props: {
                                                                command: _item.action,
                                                                icon: _item.icon,
                                                                disabled: _item.disabled,
                                                            },
                                                        },
                                                        _item.label
                                                    );
                                                })
                                            )
                                        ]
                                    );
                                }



                                // 渲染 action 按钮
                                return h(
                                    "el-button",
                                    {
                                        props: {
                                            type: action.type || "text",
                                            size: action.size || "mini",
                                            icon: action.icon || "",
                                            disabled: action.disabled || false
                                        },
                                        on: {
                                            click:(e)=> {
                                                this.$emit("action", action.action, scope); 
                                            }
                                        }
                                    },
                                    action.label
                                );
                            }).filter(item=>item);
                        }
                    }
                },
                []
            );
        },
         
    },
    // 动态渲染函数，根据列配置渲染 el-table-column
    render(h) {
        if ( this.column.hidden ){
            if( typeof this.column.hidden === "function" ){
                // 如果 hidden 是函数，则调用函数判断是否隐藏
                if (this.column.hidden(this.column)) {
                    return null;
                }
            }
        }

        if (this.column.visible === false) {
            return null;
        }
        if (this.column.type === "selection" || this.column.type === "index") {
            // 对于 selection 类型，直接传递 props 让 Element 内部处理选中状态
            return this.renderSelection(h);
        } else if (this.column.type === "action") {
            // 对于 action 类型，渲染操作列
            return this.renderActions(h);
        }
        return h(
            "el-table-column",
            {
                key: this.columnKey,
                props: Object.assign({}, this.columnProps, { index: this.indexMethod }),
                scopedSlots: {
                    // 自定义表头渲染：支持 slot 覆盖默认表头
                    header: scope => {
                        return this.$scopedSlots["header-" + this.column.prop]
                            ? this.$scopedSlots["header-" + this.column.prop](scope)
                            : scope.column.label;
                    },
                    // 自定义单元格渲染：支持 slot、组件、格式化函数或字典
                    default: (scope) => {
                        let content;
                        // 检查是否有自定义 slot 渲染
                        if (this.$scopedSlots["column-" + this.column.prop]) {
                            content = this.$scopedSlots["column-" + this.column.prop]({
                                scope: scope,
                                column: this.column
                            });
                        } else if (this.column.component) {
                            // 通过 renderNode 调用渲染组件，确保 this 指向当前实例
                            content = this.renderNode(this.column.component, { prop: this.column.prop, scope: scope });
                        } else if (this.column.formatter) {
                            content = this.column.formatter(
                                scope.row,
                                scope.column,
                                scope.row[this.column.prop],
                                scope.$index
                            );
                        } else if (this.column.dict) {
                            const dictItem = this.getDict(scope.row[this.column.prop]);
                            if (dictItem?.label) {
                                content = h(
                                    "el-tag",
                                    {
                                        props: {
                                            size: "mini",
                                            disableTransitions: true,
                                            type: dictItem.type 
                                            // effect: "dark"
                                        }
                                    },
                                    dictItem.label
                                );
                            } else {
                                content = scope.row[this.column.prop];
                            }
                        } else if (this.isNull(scope.row[this.column.prop])) {
                            content = scope.emptyText;
                        } else {
                            content = scope.row[this.column.prop];
                        }
                        return content;
                    }
                }
            },
            // 若有子列则递归渲染
            this.hasChildren
                ? this.column.children.map((child, idx) =>
                    h(TableColumn, {
                        key: idx,
                        props: { 
                            column: child, 
                            indexMethod: this.indexMethod,

                         },
                         on: this.$listeners,

                         

                    })
                )
                : []
        );
    },

};

// 支持自身递归调用（递归组件）
TableColumn.components = {
    TableColumn
};

export default TableColumn;