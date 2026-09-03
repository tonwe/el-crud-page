# el-crud-page

一个基于 Vue 2 和 Element UI 2 的配置式 CRUD 列表组件，提供查询、标签页、操作按钮、动态表格、列显隐、排序和分页能力。

## 环境要求

- Vue 2.6+
- Element UI 2.x
- vuedraggable 2.24+

> 当前版本只适用于 Vue 2 / Element UI 2，不适用于 Vue 3 或 Element Plus。

## 安装

```bash
npm install el-crud-page element-ui vuedraggable
```

或：

```bash
yarn add el-crud-page element-ui vuedraggable
```

## 引入

组件库只提供具名导出，不提供默认安装插件，因此不能使用 `Vue.use(ElCrudPage)`。

### 全局注册

```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Crud } from 'el-crud-page';

Vue.use(ElementUI);
Vue.component('Crud', Crud);
```

### 页面内注册

```vue
<script>
import { Crud } from 'el-crud-page';

export default {
  components: { Crud }
};
</script>
```

当前包实际导出的组件为：

```js
import { Crud, CrudTable, QueryForm } from 'el-crud-page';
```

其中 `Crud` 是推荐使用的完整 CRUD 页面组件；`CrudTable` 和 `QueryForm` 是其内部使用的基础组件。当前版本没有 `CrudForm` 或 `CrudTabledForm` 导出。

## 快速开始

必须先通过 `setService()` 设置 `page` 方法，再调用 `refresh()`。`page` 方法可以返回结果对象或解析为该对象的 Promise，结果格式必须为 `{ code: 200, rows: [], total: 0 }`。

```vue
<template>
  <crud
    ref="crud"
    :columns="columns"
    :query-items="queryItems"
    :buttons="buttons"
    :tab-panes="tabPanes"
    :default-sort="{ prop: 'createTime', order: 'descending' }"
    @action="handleAction"
    @row-action="handleRowAction"
    @tabChange="handleTabChange"
  />
</template>

<script>
import { Crud } from 'el-crud-page';
import * as userApi from '@/api/user';

export default {
  components: { Crud },

  data() {
    return {
      tabPanes: [
        { label: '全部', name: 'all' },
        { label: '管理员', name: 'admin' }
      ],

      queryItems: [
        {
          label: '用户名',
          prop: 'username',
          type: 'input'
        },
        {
          label: '状态',
          prop: 'status',
          type: 'select',
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ]
        },
        {
          label: '创建时间',
          prop: 'createTimeRange',
          type: 'datetime',
          range: true
        }
      ],

      columns: [
        { type: 'selection', width: 55 },
        { type: 'index', label: '序号', width: 70 },
        {
          key: 'username',
          prop: 'username',
          label: '用户名',
          minWidth: 140,
          visible: true
        },
        {
          key: 'role',
          prop: 'role',
          label: '角色',
          visible: true,
          dict: [
            { label: '管理员', value: 'admin', type: 'danger' },
            { label: '普通用户', value: 'user', type: 'primary' }
          ]
        },
        {
          key: 'status',
          prop: 'status',
          label: '状态',
          visible: true,
          formatter: (row) => row.status === 1 ? '启用' : '禁用'
        },
        {
          key: 'createTime',
          prop: 'createTime',
          label: '创建时间',
          sortable: true,
          visible: true
        },
        {
          key: 'actions',
          type: 'action',
          label: '操作',
          width: 200,
          fixed: 'right',
          actions: ['info', 'update', 'delete']
        }
      ],

      buttons: (selections) => [
        {
          text: '新增',
          action: 'add',
          type: 'primary',
          icon: 'el-icon-plus',
          size: 'mini'
        },
        {
          text: '批量删除',
          action: 'batchDelete',
          type: 'danger',
          disabled: selections.length === 0,
          size: 'mini'
        }
      ]
    };
  },

  mounted() {
    this.$refs.crud.setService({
      page: userApi.page,
      delete: userApi.remove
    });
    this.$refs.crud.refresh();
  },

  methods: {
    // 顶部按钮会同时返回已选行和本次完整查询参数。
    handleAction(action, selections, queryParams) {
      if (action === 'add') {
        // 打开新增窗口
      }
      if (action === 'batchDelete') {
        // 批量删除 selections
      }
      console.log(action, selections, queryParams);
    },

    // scope 是 Element UI 表格作用域对象，可读取 scope.row 和 scope.$index。
    handleRowAction(action, scope) {
      if (action === 'info') {
        console.log('详情', scope.row);
      }
      if (action === 'update') {
        console.log('编辑', scope.row);
      }
    },

    handleTabChange(tabKey) {
      console.log('当前标签页', tabKey);
    }
  }
};
</script>
```

上例中使用了内置的 `delete` 行操作。只要同时配置了 `service.delete`，点击删除后组件会弹出确认框，并以当前行的 `row.id` 调用 `service.delete(id)`；删除接口返回 `{ code: 200 }` 后，组件会自动刷新列表。

## Service 接口

使用组件前至少需要提供 `page`：

```js
this.$refs.crud.setService({
  async page(params) {
    // params 包含查询条件、分页、标签页和排序参数。
    return {
      code: 200,
      rows: [],
      total: 0
    };
  },

  async delete(id) {
    return { code: 200 };
  }
});
```

当前主组件实际会自动调用的服务只有：

| 方法 | 调用时机 | 参数 | 期望结果 |
| --- | --- | --- | --- |
| `page` | `refresh()`、搜索、分页、排序或工具栏刷新 | 完整查询参数 | `{ code: 200, rows: Array, total: Number }` |
| `delete` | 行操作为 `delete` 且已配置该服务 | `row.id` | `{ code: 200 }` |

`setService()` 也允许保存 `add`、`update`、`info`、`list` 和 `export` 方法，但当前组件不会自动调用它们，应在业务事件中自行处理。

### 查询参数格式

`page(params)` 默认收到以下结构：

```js
{
  // QueryForm 中各 queryItems 的值
  username: 'tom',
  status: 1,

  // 分页参数
  pageNum: 1,
  pageSize: 10,

  // 当前标签页；没有标签页时为 undefined
  tabKey: 'admin',

  // 排序字段会从 camelCase 转为 snake_case
  orderByRowName: 'create_time',
  orderByRule: 'desc'
}
```

参数合并顺序为：查询条件、分页参数、标签页参数、排序参数；后面的同名字段会覆盖前面的字段。

可以通过 `query-params-method` 在请求前同步或异步转换参数：

```vue
<crud
  ref="crud"
  :columns="columns"
  :query-params-method="transformQueryParams"
/>
```

```js
methods: {
  transformQueryParams(params) {
    const [createTimeStart, createTimeEnd] = params.createTimeRange || [];

    return {
      ...params,
      createTimeStart,
      createTimeEnd,
      createTimeRange: undefined
    };
  }
}
```

## Crud API

### Props

在 Vue 模板中建议使用下表中的 kebab-case 写法。

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `columns` | `Array` | `[]` | 表格列配置 |
| `query-items` | `Array` | `[]` | 查询表单项配置 |
| `buttons` | `Array \| Function` | `[]` | 顶部按钮；函数参数为当前已选行 |
| `tab-panes` | `Array` | `[]` | 标签页，格式为 `{ label, name }[]`；首项默认选中 |
| `tab-panes-position` | `'top' \| 'container'` | `'top'` | 标签页位置；`top` 保持原位置，`container` 放在列表区块内部上方 |
| `query-line-clamp` | `Number` | `1` | 查询区域收起时最多显示的行数 |
| `query-label-width` | `Number` | `80` | 查询项标签宽度，单位 px |
| `query-input-width` | `Number` | `210` | 查询控件宽度，单位 px |
| `query-inline` | `Boolean` | `true` | 是否使用 Element UI 的行内表单 |
| `query-params-method` | `Function` | — | 请求前转换参数，支持返回 Promise |
| `default-sort` | `Object` | `{ prop: undefined, order: undefined }` | 默认排序；`order` 使用 `ascending` 或 `descending` |
| `border` | `Boolean` | `false` | 是否显示表格纵向边框 |

### Events

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `action` | `(action, selections, queryParams)` | 点击顶部按钮 |
| `row-action` | `(action, scope)` | 点击行操作；`scope.row` 是当前数据 |
| `tabChange` | `(tabKey)` | 当前标签页发生变化 |

> `tabChange` 是当前源码实际发出的事件名，字母 `C` 为大写。

### Methods

通过 `ref` 调用：

| 方法 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| `setService(service)` | 服务对象 | — | 合并并保存服务方法 |
| `refresh()` | — | `Promise<void>` | 使用当前参数重新请求列表 |
| `getParams()` | — | `Promise<Object>` | 获取经 `queryParamsMethod` 处理后的完整参数 |

```js
await this.$refs.crud.refresh();
const params = await this.$refs.crud.getParams();
```

## 查询项配置

`query-items` 当前支持 `input`、`select`、`date` 和 `datetime` 四种类型。

```js
queryItems: [
  {
    label: '名称',
    prop: 'name',
    type: 'input',
    placeholder: '请输入名称'
  },
  {
    label: '类型',
    prop: 'type',
    type: 'select',
    options: [
      { label: '类型 A', value: 'a' },
      { label: '类型 B', value: 'b' }
    ]
  },
  {
    label: '创建日期',
    prop: 'createDate',
    type: 'date',
    valueFormat: 'yyyy-MM-dd'
  },
  {
    label: '更新时间',
    prop: 'updateTimeRange',
    type: 'datetime',
    range: true,
    startPlaceholder: '开始时间',
    endPlaceholder: '结束时间',
    valueFormat: 'yyyy-MM-dd HH:mm:ss'
  }
]
```

### 通用字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `label` | `String` | 表单项标签 |
| `prop` | `String` | 查询参数字段名 |
| `type` | `String` | `input`、`select`、`date` 或 `datetime` |
| `placeholder` | `String` | 占位文本；省略时根据类型和标签自动生成 |

### Select 扩展字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `options` | `Array \| Function` | `{ label, value }[]`；函数不接收参数，每次渲染时调用 |
| `visibleChange` | `Function` | 下拉框显示状态变化时调用，参数为 `(visible, queryParams)` |

### Date / Datetime 扩展字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `range` | `Boolean` | 为真时使用日期范围或日期时间范围选择器 |
| `startPlaceholder` | `String` | 范围开始占位文本 |
| `endPlaceholder` | `String` | 范围结束占位文本 |
| `rangeSeparator` | `String` | 范围分隔符 |
| `valueFormat` | `String` | 日期值格式；date 默认 `yyyy-MM-dd`，datetime 默认 `yyyy-MM-dd HH:mm:ss` |

范围选择器仍然使用一个字符串 `prop`，其查询值为二元素数组。如需拆成开始和结束字段，请使用 `queryParamsMethod` 转换。

## 表格列配置

普通列支持 Element UI `el-table-column` 的常用属性，例如 `prop`、`label`、`width`、`minWidth`、`fixed` 和 `sortable`，并增加以下配置：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `String \| Number` | 列的稳定标识；启用列显隐或拖拽排序时建议必填且唯一 |
| `type` | `String` | 特殊列可设为 `selection`、`index` 或 `action` |
| `visible` | `Boolean` | 是否显示；定义该字段后，该列才会出现在列设置菜单中 |
| `hidden` | `Function` | 函数接收当前列配置，返回 `true` 时隐藏 |
| `formatter` | `Function` | 与 Element UI 一致：`(row, column, cellValue, index)` |
| `dict` | `Array \| Function \| Promise` | 字典项格式为 `{ label, value, type? }`，匹配后显示为 `el-tag` |
| `component` | `Function \| Object \| String` | 自定义单元格渲染 |
| `children` | `Array` | 嵌套表头的子列 |

### 字典列

```js
{
  prop: 'status',
  label: '状态',
  dict: [
    { label: '启用', value: 1, type: 'success' },
    { label: '禁用', value: 0, type: 'info' }
  ]
}
```

`dict` 为函数时会收到当前单元格值，并且必须返回字典数组：

```js
dict: (value) => statusOptions
```

### 自定义渲染列

```js
{
  prop: 'status',
  label: '状态',
  component({ h, scope }) {
    return h(
      'el-tag',
      { props: { type: scope.row.status === 1 ? 'success' : 'info' } },
      scope.row.status === 1 ? '启用' : '禁用'
    );
  }
}
```

### 操作列

```js
{
  type: 'action',
  label: '操作',
  width: 220,
  actions: ({ scope, h }) => [
    'info',
    {
      label: '编辑',
      action: 'update',
      type: 'text',
      icon: 'el-icon-edit',
      disabled: !scope.row.editable
    },
    [
      'delete',
      { label: '停用', action: 'disable', icon: 'el-icon-close' }
    ],
    ({ scope, h }) => h('el-button', {
      props: { type: 'text', size: 'mini' },
      on: { click: () => console.log(scope.row) }
    }, '自定义')
  ]
}
```

- 内置字符串操作为 `info`、`update`、`delete`。
- 对象操作支持 `label`、`action`、`type`、`size`、`icon` 和 `disabled`。
- 嵌套数组会渲染为“更多”下拉菜单。
- 函数操作应直接返回 VNode；它不会自动触发 `row-action`。

## 顶部按钮配置

`buttons` 可以是数组，也可以是接收当前选中行的函数：

```js
buttons: (selections) => [
  {
    key: 'add',
    text: '新增',
    action: 'add',
    type: 'primary',
    size: 'mini',
    icon: 'el-icon-plus',
    plain: false,
    disabled: false
  },
  {
    key: 'batch-delete',
    text: '批量删除',
    action: 'batchDelete',
    type: 'danger',
    disabled: selections.length === 0
  }
]
```

点击按钮会触发 `action(action, selections, queryParams)`。

## 标签页和排序

标签页格式：

```js
tabPanes: [
  { label: '全部', name: 'all' },
  { label: '待审核', name: 'pending' }
]
```

标签页默认位于查询区域上方。需要把它放到 `container-main` 列表区块内部、工具栏和表格上方时：

```vue
<crud
  :columns="columns"
  :tab-panes="tabPanes"
  tab-panes-position="container"
/>
```

组件默认选择第一项，并把当前项的 `name` 作为请求参数 `tabKey`。使用默认查询表单时，切换标签页会清空查询表单、清空当前排序并刷新列表；如果没有配置 `query-items`，切换操作只会更新 `tabKey` 并触发 `tabChange`，需要在事件处理器中主动调用 `refresh()`。

远程排序示例：

```js
columns: [
  { prop: 'createTime', label: '创建时间', sortable: true }
]
```

Element UI 返回的 `ascending` / `descending` 会分别转换成 `asc` / `desc`，字段名则从 camelCase 转换为 snake_case。

## Slots

| 插槽 | 作用域参数 | 说明 |
| --- | --- | --- |
| `tabQuery` | — | 替换标签页区域；位置由 `tab-panes-position` 决定 |
| `query` | `{ queryItems, lineClamp, labelWidth, inputWidth, inline }` | 替换查询区域 |
| `buttons` | `{ selections }` | 替换左侧按钮区域 |
| `toolbar` | `{ columns, showSearch }` | 替换右侧工具栏 |
| `default` | `{ data }` | 替换默认表格 |
| `pagination` | `{ total, pagination }` | 替换默认分页 |

自定义 `query` 插槽中的表单值不会被 `Crud.getParams()` 自动读取。如需让这些值进入分页请求，可在 `queryParamsMethod` 中合并外部维护的查询对象。自定义默认表格或分页后，对应的选择、刷新等交互也需要由业务组件自行连接。

例如，自定义顶部按钮：

```vue
<crud ref="crud" :columns="columns">
  <template #buttons="{ selections }">
    <el-button
      type="danger"
      size="mini"
      :disabled="selections.length === 0"
      @click="removeSelected(selections)"
    >
      删除选中项
    </el-button>
  </template>
</crud>
```

## 单独使用 QueryForm

```vue
<query-form
  :query-items="queryItems"
  :line-clamp="1"
  :label-width="80"
  :input-width="210"
  :inline="true"
  @queryTable="handleQuery"
/>
```

`QueryForm` 的 `queryTable` 事件参数是当前查询对象。可通过组件 `ref` 调用 `resetQuery()`，重置后也会触发一次查询。

## 注意事项

- 搜索、分页、排序和刷新按钮都会调用 `service.page`；使用默认查询表单时，标签页切换也会调用它。
- 查询表单重置后的字段值为 `null`。
- `delete` 行操作会先触发 `row-action`，之后再执行内置删除流程。已经配置 `service.delete` 时，不要在 `row-action` 中重复删除。
- `service.delete` 固定使用 `row.id`。如果业务主键不是 `id`，请不要配置内置 `delete` 服务，而应监听 `row-action` 自行删除。
- 列显隐菜单只列出显式配置了 `visible` 且类型不是 `index`、`selection` 的列。建议同时为这些列设置唯一的 `key`。

## 本地开发

```bash
npm install

# 监听并构建组件库
npm run dev

# 启动示例项目
npm run demo

# 构建并运行冒烟测试
npm test

# 构建组件库
npm run build
```

## License

[MIT](./LICENSE)
