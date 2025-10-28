<script lang="jsx">
import { renderNode } from "./utils/vnode"
import { isObject, isString ,isFunction} from "./utils/index"
import valueHook from "./utils/value-hook"

// type FormItems = { // 表单项配置
//     label: string; // 标签
//     prop: string; // 字段名

//     options?: { value: string; label: string; disabled?: boolean }[] || ()=>[]; // 字典数据
//     rules?: any[]; // 验证规则

//     children?: FormItems[];
//     hidden?: boolean; // 是否隐藏
//     help?: string; // 帮助信息

//     span?: number; // 栅格占据的列数
//     labelWidth?: string; // formitem 标签宽度 

//     component?: VNode;
// };
// type VNodeFunction = ({ scope,h }) => VNode | ({ scope,h }) =><div>{ scope }</div> | <div />;

// type VNodeObject = { 
//     name?: string | Component; // 组件名 | 组件引用
//     options?: any[]; // 选项
//     attrs?: any; // 属性
//     on?: any; // 事件
//     props?: any; // 属性
//     [key: string]: any;
// };
// type VNode = string | VNodeFunction | VNodeObject;


export default {
    props: {
        // 表单配置项，可以从外部传入
        formItems: {
            type: Array,
            default: () => []
        },
        // 初始表单数据
        initialFormData: {
            type: Object,
            default: () => ({})
        },
        // 按钮配置
        buttons: {
            type: Object,
            default: () => ({
                submit: {
                    show: true,
                    text: '提交',
                    type: 'primary',
                    loading: false
                },
                cancel: {
                    show: true,
                    text: '取消',
                    type: 'default'
                }
            })
        },
        // 按钮位置
        buttonPosition: {
            type: String,
            default: 'right', // center, left, right
            validator: value => ['center', 'left', 'right'].includes(value)
        },
        // 是否显示按钮区域
        showButtons: {
            type: Boolean,
            default: true
        },
        readonly: {
            type: Boolean
        },
        labelWidth: {
            type: String,
            default: '80px'
        },
        column: {
            type: Number,
            default: 2
        },
        gutter: {
            type: Number,
            default: 10
        },
        size: {
            type: String,
            default: 'small'
        },
        // value: {
        //     type: Object,
        //     default: () => ({})
        // },


    },

    data() {
        return {
            form: {},
            // 如果没有传入formItems，则使用默认配置
            items: [],
            activeName: 'first',
            submitLoading: false

        }
    },

    computed: {
        // 从items中提取所有字段的规则
        formRules() {
            const rules = {};

            // 递归提取规则函数
            const extractRules = (nodes) => {
                if (!nodes || !nodes.length) return;

                nodes.forEach(node => {
                    // 如果节点有children，递归处理
                    if (node.children && node.children.length) {
                        extractRules(node.children);
                    }

                    // 如果是表单字段且有规则，添加到规则对象
                    if (node.prop && node.rules) {
                        rules[node.prop] = node.rules;
                    }
                });
            };

            // 对所有配置项提取规则
            extractRules(this.items);

            return rules;
        },
        // 按钮区域样式
        buttonAreaStyle() {
            return {
                textAlign: this.buttonPosition,
                marginTop: '20px'
            };
        },
        // label宽度
        labelStyle() {
            return {
                width: this.labelWidth,
                textAlign: 'center'
            };
        },


    },

    watch: {
        // 监听外部传入的表单数据变化
        initialFormData: {
            handler(val) {
                this.form = JSON.parse(JSON.stringify(val));
            },
            immediate: true,
            deep: true
        },
        // 监听外部传入的表单配置变化
        formItems: {
            handler(val) {
                if (val && val.length) {
                    this.items = val;
                }
            },
            immediate: true,
            deep: true
        },
        // 监听外部传入的value变化
        // value: {
        //     handler(val) {
        //         this.form = JSON.parse(JSON.stringify(val)) || {};
        //     },
        //     immediate: true,
        //     deep: true
        // },
        // v-model绑定的值变化时，更新表单数据
        form: {
            handler(val) {
                this.$emit('input', val);
            },
            deep: true
        }
    },

    methods: {
        // 处理表单输入事件
        handleInput(prop, value) {
            this.$set(this.form, prop, value);
            // 触发change事件，将变更通知给父组件
            this.$emit('field-change', { prop, value, form: this.form });
        },

        // 递归渲染函数 - 根据节点类型渲染不同内容
        renderNode(node, index) {
            // 如果是只读模式，使用只读渲染函数
            if (this.readonly) {
                return this.renderReadOnlyNode(node, index);
            }

            // 如果是输入字段（没有type或没有children，则视为字段）
            if (!node.type || (!node.children && node.prop)) {
                return this.renderField(node, index);
            }

            // 根据节点类型渲染
            switch (node.type) {
                case 'tab':
                    return this.renderTab(node, index);
                case 'group':
                    return this.renderGroup(node, index);
                default:
                    // 默认当作字段渲染
                    return this.renderField(node, index);
            }
        },

        // 只读模式 - 递归渲染函数
        renderReadOnlyNode(node, index) {
            if (!node.type || (!node.children && node.prop)) {
                return this.renderReadOnlyField(node, index);
            }
            switch (node.type) {
                case 'tab':
                    return this.renderReadOnlyTab(node, index);
                case 'group':
                    return this.renderReadOnlyGroup(node, index);
                default:
                    return this.renderReadOnlyField(node, index);
            }
        },

        // 只读模式 - 渲染标签页
        renderReadOnlyTab(tab, index) {
            return (
                <el-tab-pane
                    key={tab.name || index}
                    label={tab.label}
                    name={tab.name || index}
                    {...tab.props}
                >
                    {this.renderReadOnlyChildren(tab.children)}
                </el-tab-pane>
            );
        },

        // 只读模式 - 渲染分组
        renderReadOnlyGroup(group, index) {
            return (
                <div class={['el-form-group', group.className]} key={index} {...group.props}>
                    <el-descriptions
                        title={group.title}
                        border
                        column={this.column}
                        size={this.size}
                        labelStyle={this.labelStyle}
                    >
                        {this.renderReadOnlyDescriptionItems(group.children)}
                    </el-descriptions>
                </div>
            );
        },

        // 只读模式 - 渲染字段
        renderReadOnlyField(field, index) {
            // 如果字段被配置为隐藏，则不渲染
            if (field.hidden) {
                return null;
            }

            // 获取字段值
            const value = this.form[field.prop];

            // 处理显示值
            let displayValue = value;

            // 处理不同类型的字段显示值
            if (field.options && Array.isArray(field.options)) {
                const option = field.options.find(opt => opt.value === value);
                if (option) {
                    displayValue = option.label;
                }
            }

            // 如果处于顶层（不在group内），则需要包装在el-descriptions中
            if (!field._inGroup) {
                return (
                    <el-col span={24 / this.column || field.span || 12} key={field.prop || index}>
                        <el-descriptions labelStyle={this.labelStyle} border column={this.column} size={this.size}>
                            <el-descriptions-item label={field.label || ''}>
                                {displayValue || '-'}
                            </el-descriptions-item>
                        </el-descriptions>
                    </el-col>
                );
            }
            // 在group内部的字段直接返回
            return (
                <el-descriptions-item label={field.label || ''}>
                    {displayValue || '-'}
                </el-descriptions-item>
            );
        },

        // 只读模式 - 渲染描述项
        renderReadOnlyDescriptionItems(children) {
            if (!children || !children.length) {
                return null;
            }

            return children.map(child => {
                // 标记字段在group内部
                child._inGroup = true;
                return this.renderReadOnlyField(child);
            });
        },

        // 只读模式 - 渲染子节点
        renderReadOnlyChildren(children) {
            // 如果没有子节点，返回空
            if (!children || !children.length) {
                return null;
            }

            // 检查第一个子节点类型，判断是否需要包装
            const firstChild = children[0];

            // 如果第一个子节点是group，不需要额外包装
            if (firstChild.type === 'group') {
                return children.map((child, index) => this.renderReadOnlyNode(child, index));
            }

            // 如果子节点不是输入字段，也不是分组，则直接渲染
            if (firstChild.type && firstChild.type !== 'group' && !firstChild.prop) {
                return children.map((child, index) => this.renderReadOnlyNode(child, index));
            }

            // 如果是普通字段（非group），则包装在el-descriptions中
            return (
                <el-descriptions border column={this.column} size={this.size} labelStyle={this.labelStyle}>
                    {children.map((child, index) => {
                        child._inGroup = true;
                        return this.renderReadOnlyNode(child, index);
                    })}
                </el-descriptions>
            );
        },

        // 渲染标签页
        renderTab(tab, index) {
            return (
                <el-tab-pane
                    key={tab.name || index}
                    label={tab.label}
                    name={tab.name || index}
                    {...tab.props}
                >
                    {this.renderChildren(tab.children)}
                </el-tab-pane>
            );
        },

        // 渲染分组
        renderGroup(group, index) {
            return (
                <div class={['el-form-group', group.className]} key={index} {...group.props}>
                    {group.title && <div class="el-form-group__title">{group.title}</div>}
                    <div>
                        {this.renderChildren(group.children)}
                    </div>
                </div>
            );
        },

        // 渲染各种表单控件
        renderFormControl(field) {
            let component = field.component;
            if (isString(field.component)) {
                component = {
                    name: field.component,
                    attrs: {
                        placeholder: field.placeholder || `请输入${field.label}`,
                        clearable: typeof field.clearable !== 'undefined' ? field.clearable : true,
                    }
                }
            }
            if ( !isFunction(field.component)) {
                if (field.component === 'el-select') {
                    component.attrs = {
                        ...component.attrs,
                        placeholder: field.placeholder || `请选择${field.label}`,
                        filterable: true,

                    }
                } 
            }

            if( field.hook?.bind?.length ){
                let value = valueHook.bind(this.form[ field.prop ], field.hook?.bind , this.form)
                this.$set(this.form, field.prop, value)
            }
            // component 渲染 { prop: this.column.prop, scope: scope }
            return renderNode.call(this, component, {
                prop: field.prop,
                scope: this.form
            });

        },

        // 渲染字段
        renderField(field, index) {
            // 如果字段被配置为隐藏，则不渲染
            if (field.hidden) {
                return null;
            }
            return (
                <el-col span={24 / this.column || field.span || 12} key={field.prop || index}>
                    <el-form-item
                        label={field.label}
                        prop={field.prop}
                        rules={field.rules} // 直接使用字段自身的规则
                        labelWidth={field.labelWidth || this.labelWidth}
                        {...field.formItemProps}
                    >
                        {this.renderFormControl(field)}
                        {field.help && <div class="form-item-help">{field.help}</div>}
                    </el-form-item>
                </el-col>
            );
        },

        // 渲染子节点
        renderChildren(children) {
            // 如果没有子节点，返回空
            if (!children || !children.length) {
                return null;
            }

            // 检查第一个子节点类型，判断是否需要包装
            const firstChild = children[0];

            // 如果第一个子节点是group，不需要额外包装
            if (firstChild.type === 'group') {
                return children.map(this.renderNode);
            }

            // 如果子节点不是输入字段，也不是分组，则直接渲染
            if (firstChild.type && firstChild.type !== 'group' && !firstChild.prop) {
                return children.map(this.renderNode);
            }

            // 其他情况（子节点是输入字段）包装在row中
            return <el-row gutter={this.gutter}>{children.map(this.renderNode)}</el-row>;
        },

        // 判断是否有标签页
        hasTabs() {
            return this.items && this.items.some(item => item.type === 'tab');
        },

        // 渲染按钮区域
        renderButtons() {
            if (!this.showButtons || this.readonly) return null;

            return (
                <div class="form-button-area" style={this.buttonAreaStyle}>
                    {this.buttons.cancel && this.buttons.cancel.show && (
                        <el-button
                            onClick={this.handleCancel}
                            type={this.buttons.cancel.type}
                            {...this.buttons.cancel.props}
                        >
                            {this.buttons.cancel.text}
                        </el-button>
                    )}
                    {this.buttons.submit && this.buttons.submit.show && (
                        <el-button
                            onClick={this.handleSubmit}
                            type={this.buttons.submit.type}
                            loading={this.submitLoading || (this.buttons.submit.loading)}
                            {...this.buttons.submit.props}
                        >
                            {this.buttons.submit.text}
                        </el-button>
                    )}
                </div>
            );
        },

        // 处理提交
        async handleSubmit() {
            try {
                this.submitLoading = true;
                // 表单验证
                const formData = await this.validate();
                // 发出提交事件
                this.$emit('submit', formData);

                // return formData;
            } catch (error) {
                this.$emit('submit-error', error);
                return Promise.reject(error);
            }
            this.submitLoading = false;
        },

        // 处理取消
        handleCancel() {
            this.$emit('cancel');
        },

        // 表单验证方法
        validate() {
            return new Promise((resolve, reject) => {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        resolve(this.form);
                    } else {
                        reject(new Error('表单验证失败'));
                    }
                });
            });
        },

        // 重置表单
        resetForm() {
            this.form = JSON.parse(JSON.stringify(this.initialFormData)) || {};
            this.$refs.form.resetFields();
            this.$emit('form-reset', this.form);
        },

        // 获取表单数据
        getFormData() {
            return this.form;
        }
    },

    render() {

        if (this.readonly) {
            // 只读模式渲染
            return (
                <div class="dynamic-form-container readonly">
                    {this.hasTabs() ? (
                        // 渲染标签页结构
                        <el-tabs v-on={this.$listeners} v-model={this.activeName}>
                            {this.items.map((item, index) => this.renderReadOnlyNode(item, index))}
                        </el-tabs>
                    ) : (
                        // 非标签页结构，直接渲染
                        this.renderReadOnlyChildren(this.items)
                    )}
                </div>
            );
        }

        const formProps = {
            model: this.form,
            rules: this.formRules,
            ...this.$attrs
        };
        // 如果没有配置项，渲染空表单
        if (!this.items || !this.items.length) {
            return <div class="dynamic-form-container"><el-form ref="form" {...{ props: formProps }}></el-form></div>;
        }

        return (
            <div class="dynamic-form-container">
                <el-form ref="form" {...{ props: formProps }}>
                    {this.hasTabs() ? (
                        // 渲染标签页结构
                        <el-tabs v-on={this.$listeners} v-model={this.activeName}>
                            {this.items.map(this.renderNode)}
                        </el-tabs>
                    ) : (
                        // 非标签页结构，直接渲染
                        this.renderChildren(this.items)
                    )}

                    {/* 渲染按钮区域 */}
                    {this.renderButtons()}
                </el-form>
            </div>
        );
    }
}
</script>

<style scoped lang="scss">
.dynamic-form-container {
    padding: 20px;

    .el-form{
        

        .el-form-item {
            
            &::v-deep{
                .el-input,
                .el-select{
                    width: 100%;
                }
                .el-input__inner {
                    width: 100%;
                }
            }

        }

         

    }
}

.el-form-group {
    margin-bottom: 20px;
    /* padding: 15px; */
    border-bottom: 1px solid #ebeef5;
}

.el-form-group__title {
    font-weight: bold;
    margin-bottom: 15px;
    font-size: 14px;
    color: #606266;
}

.form-button-area {
    padding-top: 10px;
    border-top: 1px solid #ebeef5;
}

.form-button-area .el-button+.el-button {
    margin-left: 10px;
}

/* 只读模式样式 */
.dynamic-form-container.readonly {
    .el-descriptions__body {
        background-color: #fafafa;
    }

    .el-descriptions-item__label {
        font-weight: bold;
    }

    .el-descriptions-item__content {
        word-break: break-all;
    }
}
</style>
