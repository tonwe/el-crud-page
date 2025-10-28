import { isFunction, isString, cloneDeep, isObject } from "./index";
import Vue from "vue";

// ...删除固定创建的 __inst ...
const __vue = Vue   // Vue

/**
 * Parse JSX, filter params
 * options 增加 inst 参数，代表外部传入的 Vue 实例
 * @param {*} vnode
 * @param {{inst, scope, prop, children, $scopedSlots}} options
 */
const parse_jsx = (vnode, options = {}) => {
	const { inst, scope, prop, $scopedSlots, children = [] } = options;
	const h = inst.$createElement;

	if (vnode.name.indexOf("slot-") == 0) {
		let rn = $scopedSlots[vnode.name];

		if (rn) {
			return rn({ scope });
		} else {
			return "错误";
		}
	}

	if (vnode.render) {
		if (!inst.$root.$options.components[vnode.name]) {
			__vue.component(vnode.name, cloneDeep(vnode));
		}

		// Avoid props prompts { type:null }
		delete vnode.props;
	}

	const keys = [
		"class",
		"style",
		"props",
		"attrs",
		"domProps",
		"on",
		"nativeOn",
		"directives",
		"scopedSlots",
		"slot",
		"key",
		"ref",
		"refInFor"
	];

	// Avoid loop update
	let data = cloneDeep(vnode);

	for (let i in data) {
		if (!keys.includes(i)) {
			delete data[i];
		}
	}

	if (scope) {
		if (!data.attrs) {
			data.attrs = {};
		}

		if (!data.on) {
			data.on = {};
		}

		if (!data.props) {
			data.props = {};
		}

		// 添加作用域
		data.props.scope = scope

		// 输入事件
		const onInput = data.on.input

		// 设置默认值
		data.attrs.value = scope[prop];

		// 监听输入事件
		data.on.input = (val) => {
			inst.$set(scope, prop, val);
			if (onInput) {
				onInput(val)
			}
		};
	} 
	return h(vnode.name, cloneDeep(data), children);
};

/**
 * Render vNode
 * options 允许 inst 为空，通过调用者的 this 获取 Vue 实例
 * @param {*} vnode
 * @param {{inst?, prop, scope, $scopedSlots}} options
 */
export function renderNode(vnode, options) {
	// 如果 options.inst 为空，则尝试用调用者上下文的 this
	const { prop, scope, $scopedSlots } = options;
	const inst = options.inst || this;
	const h = inst.$createElement;
	 
	if (!vnode) {
		return null;
	}

	// When slot or tagName
	if (isString(vnode)) {
		return parse_jsx({ name: vnode }, { inst,prop, scope, $scopedSlots });
	}

	// When customeize render function
	if (isFunction(vnode)) {
		return vnode({ scope, h });
	}
	// When jsx
	if (isObject(vnode)) {
		if( isObject(  vnode.name ) ){
			let component = vnode.name
			let curComponent = Object.values(inst.$options.components).find(item=>item == vnode)
			if( curComponent ){
				vnode.name = curComponent.name ;
			}else{
				const componentName = component.name || "component_" + Math.random().toString(36).substr(2, 9);
				inst.$options.components[ componentName ] = component;
				vnode.name = componentName;
				console.log( componentName )
			}
		}
		
		if (vnode.context) {
			return vnode;
		}

		if (vnode.name) {
			// Handle general component
			const keys = ["el-select", "el-radio-group", "el-checkbox-group"];
			if (keys.includes(vnode.name)) {
				let options = vnode.options;
				if( isFunction( options ) ){
					options = options( scope );
				}
				
				// Append component children
				const children = (options || []).map((e, i) => {
					if (vnode.name === "el-select") {
						let label, value;

						if (isString(e)) {
							label = value = e;
						} else if (isObject(e)) {
							label = e.label;
							value = e.value;
						} else {
							return "错误";
						}

						return (
							<el-option
								{...{
									props: {
										key: i,
										label,
										value,
										...e.props
									}
								}}
							/>
						);
					} else if (vnode.name === "el-radio-group") {
						return (
							<el-radio
								{...{
									props: {
										key: i,
										label: e.value,
										...e.props
									}
								}}>
								{e.label}
							</el-radio>
						);
					} else if (vnode.name === "el-checkbox-group") {
						if(  typeof scope[prop]==='undefined' ){ 
							inst.$set(scope, prop, [])
						}

						return (
							<el-checkbox
								{...{
									props: {
										key: i,
										label: e.value,
										...e.props
									}
								}}>
								{e.label}
							</el-checkbox>
						);
					} else {
						return null;
					}
				});
				return parse_jsx(vnode, { inst, prop, scope, children });
			} else {
				return parse_jsx(vnode, { inst, prop, scope, $scopedSlots });
			}
		} else {
			return "错误";
		}
	}
}