# el-crud-page

一个基于 Element UI v2 的强大 CRUD 页面组件库，简化表格、表单和查询的开发。

## 特性

- 🚀 开箱即用的 CRUD 页面组件
- 📋 灵活的表格配置
- 📝 自动表单生成
- 🔍 查询表单支持
- 🎨 完全兼容 Element UI v2
- 💪 TypeScript 支持

## 安装

```bash
npm install el-crud-page
# 或
yarn add el-crud-page
```

## 依赖

本库需要以下依赖（需要在你的项目中安装）：

- Vue 2.6+
- Element UI 2.x

## 使用

### 完整引入

```javascript
import Vue from 'vue';
import { Crud, CrudTabledForm, QueryForm } from 'el-crud-page';

Vue.component('Crud', Crud); 
```

### 按需引入

```javascript
import { Crud } from 'el-crud-page';

export default {
  components: {
    Crud
  }
}
```

## 组件说明

### Crud

主组件，集成了表格、表单和查询功能。

### CrudTable

表格组件，基于 Element UI 的 Table 组件封装。

### CrudForm

表单组件，基于 Element UI 的 Form 组件封装。

### QueryForm

查询表单组件，用于数据筛选。

## 基础示例

```vue
<template>
  <crud
    ref="crud"
    :columns="columns"
    :query-items="queryItems"
    :buttons="buttons"
    @action="handleAction"
    @row-action="handleRowAction"
  />
</template>
 
```

## 完整示例

更完整的示例请参考 [examples/App.vue](./examples/App.vue)

## API 说明

### Crud Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表格列配置 | Array | [] |
| queryItems | 查询表单配置 | Array | [] |
| buttons | 顶部按钮配置，可以是数组或函数 | Array/Function | [] |
| tabPanes | 标签页配置 | Array | [] |
| queryLineClamp | 查询表单行数限制 | Number | 1 |
| queryLabelWidth | 查询表单标签宽度 | Number | 80 |
| queryInputWidth | 查询表单输入框宽度 | Number | 210 |
 

### Crud Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| action | 顶部按钮点击事件 | (action, selections) |
| row-action | 行内按钮点击事件 | (action, scope) |
| tabChange | 标签页切换事件 | (tabKey) |

### Crud Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| setService | 设置服务接口 | (service) service对象包含 page/add/update/delete/info 等方法 |
| refresh | 刷新列表数据 | - | 

### 列配置 (columns)

```javascript
{
  type: 'selection', // 列类型: selection/index/expand
  prop: 'name',      // 字段名
  label: '名称',     // 列标题
  width: 120,        // 列宽度
  fixed: 'left',     // 固定列: left/right
  sortable: true,    // 是否可排序
   
}
```

### 查询表单配置 (queryItems)

```javascript
 
```

### 按钮配置 (buttons)

```javascript
// 数组形式
buttons: [
  {
    text: '新增',
    type: 'primary',
    icon: 'el-icon-plus',
    action: 'add',
    plain: false,
    disabled: false
  }
]

// 函数形式（可根据选中数据动态配置）
buttons: (selections) => {
  return [
    {
      text: '批量删除',
      type: 'danger',
      action: 'batchDelete',
      disabled: selections.length === 0
    }
  ];
}
```

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```

## License

MIT

## 作者

tonwe
