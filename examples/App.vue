<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1>el-crud-page 完整示例</h1>
      </el-header>
      <el-main>
        <!-- CRUD 组件 -->
        <crud
          ref="crud"
          :columns="columns"
          :queryInputWidth="140"
          :queryLabelWidth="80"
          :query-items="queryItems"
          :buttons="buttons"
          @action="handleAction"
          @row-action="handleRowAction">
        </crud>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { Crud } from '../src/index.js';

export default {
  name: 'App',
  components: {
    Crud
  },
  data() {
    return {
      // 表格列配置
      columns: [
        { type: 'selection', width: 55 },
        { type: 'index', label: '序号', width: 60 },
        { prop: 'id', label: 'ID', width: 80, sortable: true, visible: true },
        { prop: 'username', label: '用户名', width: 120, visible: true },
        { prop: 'nickname', label: '昵称', width: 120, visible: true },
        { prop: 'email', label: '邮箱', width: 200, visible: true },
        { prop: 'phone', label: '手机号', width: 130, visible: true },
        { 
          prop: 'role', 
          label: '角色', 
          width: 100,
          component ({ h, scope  }) {
            const row = scope.row;
            const roleMap = {
              'admin': { text: '管理员', type: 'danger' },
              'user': { text: '普通用户', type: 'primary' },
              'guest': { text: '访客', type: 'info' }
            };
            const role = roleMap[row.role] || { text: row.role, type: 'info' };
            return h('el-tag', { props: { type: role.type } }, role.text);
          }
        },
        { 
          prop: 'status', 
          label: '状态', 
          width: 80,
          formatter: (row) => {
            return row.status === 1 ? '启用' : '禁用';
          }
        },
        { prop: 'createTime', label: '创建时间', width: 180 },
        {
          label: '操作',
          width: 200,
          type: 'action',
          fixed: 'right',
          actions: ()=>[
            "info",
            {
                label: "编辑",
                type: "text",
                action: "update",
                icon: "el-icon-document"
            },
            {
                label: "查看",
                type: "text",
                action: "view",
                icon: "el-icon-document"
            }
          ]
        }
      ],

      // 查询表单配置
      queryItems: [
        {
          label: '用户名',
          prop: 'username',
          type: 'input',
        },
        {
          label: '邮箱',
          prop: 'email',
          type: 'input',
          placeholder: '请输入邮箱'
        },
        {
          label: '角色',
          prop: 'role',
          type: 'select',
          placeholder: '请选择角色',
          options:()=> [
            { label: '管理员', value: 'admin' },
            { label: '普通用户', value: 'user' },
            { label: '访客', value: 'guest' }
          ]
        },
        {
          label: '状态',
          prop: 'status',
          type: 'select',
          placeholder: '请选择状态',
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ]
        },
        {
          label: '创建时间',
          prop: 'dateRange',
          type: 'datetime',
          range: "daterange",
        }
      ],

      // 顶部按钮配置（使用函数形式，根据选中数据动态配置）
      buttons: (selections) => {
        return [
          { 
            text: '新增', 
            type: 'primary', 
            icon: 'el-icon-plus', 
            action: 'add' ,
            size: 'mini'
          },
          { 
            text: '批量删除', 
            type: 'danger', 
            icon: 'el-icon-delete', 
            action: 'batchDelete',
            disabled: selections.length === 0,
            size: 'mini'
          },
          { 
            text: '导出', 
            type: 'warning', 
            icon: 'el-icon-download', 
            action: 'export' ,
            size: 'mini'
          }
        ];
      },
 
    };
  },
  mounted() {
    // 设置服务接口
    this.$refs.crud.setService({
      page: this.getListData  // 分页查询接口
    });
    // 刷新列表
    this.$refs.crud.refresh();
  },
  methods: {
    // 分页查询接口，需要返回 { code: 200, rows: [], total: 0 } 格式
    async getListData(params) {
      console.log('查询参数:', params);
      
      // 模拟 API 请求延迟
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockData = this.getMockData();
          const { pageNum = 1, pageSize = 10 } = params;
          
          // 模拟分页
          const startIndex = (pageNum - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const rows = mockData.slice(startIndex, endIndex);
          
          resolve({
            code: 200,
            rows: rows,
            total: mockData.length
          });
        }, 500);
      });
    },

    // 生成模拟数据
    getMockData() {
      const data = [];
      for (let i = 1; i <= 50; i++) {
        data.push({
          id: i,
          username: `user${i}`,
          nickname: `用户${i}`,
          email: `user${i}@example.com`,
          phone: `138${String(i).padStart(8, '0')}`,
          role: ['admin', 'user', 'guest'][i % 3],
          status: i % 3 === 0 ? 0 : 1,
          remark: `这是用户${i}的备注信息`,
          createTime: new Date(2025, 0, i).toLocaleString('zh-CN')
        });
      }
      return data;
    },

    // 顶部按钮点击事件
    handleAction(action, selections) {
      console.log('按钮操作:', action, '选中数据:', selections);
      
      switch (action) {
        case 'add':
          this.handleAdd();
          break;
        case 'batchDelete':
          this.handleBatchDelete(selections);
          break;
        case 'export':
          this.handleExport();
          break;
      }
    },

    // 行内按钮点击事件
    handleRowAction(action, scope) {
      console.log('行操作:', action, '当前行:', scope.row);
      
      switch (action) {
        case 'view':
          this.handleView(scope.row);
          break;
        case 'edit':
          this.handleEdit(scope.row);
          break;
        case 'delete':
          this.handleDelete(scope.row);
          break;
      }
    },

    // 新增
    handleAdd() {
      this.$message.info('新增功能开发中...');
    },

    // 编辑
    handleEdit(row) {
      this.$message.info(`编辑用户 "${row.username}" 功能开发中...`);
    },

    // 查看
    handleView(row) {
      this.$alert(
        `<div style="text-align: left;">
          <p><strong>用户名：</strong>${row.username}</p>
          <p><strong>昵称：</strong>${row.nickname}</p>
          <p><strong>邮箱：</strong>${row.email}</p>
          <p><strong>手机号：</strong>${row.phone}</p>
          <p><strong>角色：</strong>${row.role}</p>
          <p><strong>状态：</strong>${row.status === 1 ? '启用' : '禁用'}</p>
          <p><strong>创建时间：</strong>${row.createTime}</p>
          <p><strong>备注：</strong>${row.remark || '无'}</p>
        </div>`,
        '用户详情',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '关闭'
        }
      );
    },

    // 删除
    handleDelete(row) {
      this.$confirm(`确认删除用户 "${row.username}" 吗？`, '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$message.success('删除成功');
        this.$refs.crud.refresh();
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },

    // 批量删除
    handleBatchDelete(selections) {
      if (!selections || selections.length === 0) {
        this.$message.warning('请先选择要删除的数据');
        return;
      }
      
      this.$confirm(`确认删除选中的 ${selections.length} 条数据吗？`, '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$message.success('删除成功');
        this.$refs.crud.refresh();
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },

    // 导出
    handleExport() {
      this.$message.info('导出功能开发中...');
    },

    // 行内按钮点击事件
    handleRowAction(action, scope) {
      console.log('行操作:', action, '当前行:', scope.row);
      
      switch (action) {
        case 'view':
          this.handleView(scope.row);
          break;
        case 'edit':
          this.handleEdit(scope.row);
          break;
        case 'delete':
          this.handleDelete(scope.row);
          break;
      }
    },

    // 状态切换
    handleStatusChange(row, value) {
      console.log('状态切换:', row, value);
      this.$message.success(`已${value === 1 ? '启用' : '禁用'}用户 "${row.username}"`);
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
}

#app {
  height: 100vh;
}

.el-header {
  background-color: #409EFF;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.el-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 500;
}

.el-main {
  background-color: #f0f2f5;
  padding: 20px;
}
</style>
