<template>
    <div class="top-right-btn" :style="style">
      <div class="flex flex-row items-center">
        <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top" v-if="search">
          <el-button size="mini" circle icon="el-icon-search" @click="toggleSearch()" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="refresh()" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="显隐列" placement="top" v-if="columns">
          <el-button size="mini" circle icon="el-icon-menu" @click="showColumn()" v-if="showColumnsType == 'transfer'"/>
          <el-dropdown trigger="click" :hide-on-click="false" style="padding-left: 12px" v-if="showColumnsType == 'checkbox'">
            <el-button size="mini" circle icon="el-icon-menu" />
            <el-dropdown-menu slot="dropdown">
              <template >
                <el-dropdown-item v-for="item in columns" :key="item.key" v-if="item.type!=`index` && item.type!=`selection` && (typeof item.visible) !== `undefined` ">
                  <el-checkbox :checked="item.visible" @change="checkboxChange($event, item)" :label="item.label" />
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-tooltip>
      </div>
      <el-dialog :title="title" :visible.sync="open" append-to-body>
        <el-transfer
          :titles="['显示', '隐藏']"
          v-model="value"
          :data="columns"
          @change="dataChange"
        ></el-transfer>
      </el-dialog>
    </div>
  </template>
  <script>
  export default {
    name: "RightToolbar",
    inject: ["crud"],
    data() {
      return {
        // 显隐数据
        value: [],
        // 弹出层标题
        title: "显示/隐藏",
        // 是否显示弹出层
        open: false,
        // 本地列数据副本（用于拖拽）
        localColumns: [],
      };
    },
    props: {
      /* 是否显示检索条件 */
      showSearch: {
        type: Boolean,
        default: true,
      },
      /* 显隐列信息 */
      columns: {
        type: Array,
      },
      /* 是否显示检索图标 */
      search: {
        type: Boolean,
        default: true,
      },
      /* 显隐列类型（transfer穿梭框、checkbox复选框） */
      showColumnsType: {
        type: String,
        default: "checkbox",
      },
      /* 右外边距 */
      gutter: {
        type: Number,
        default: 10,
      },
    },
    computed: {
      style() {
        const ret = {};
        if (this.gutter) {
          ret.marginRight = `${this.gutter / 2}px`;
        }
        return ret;
      }
    },
    watch: {
      columns: {
        handler(newVal) {
          // 当 columns prop 变化时，更新本地副本
          this.localColumns = newVal ? [...newVal] : [];
        },
        immediate: true,
        deep: true
      }
    },
    created() {
      if (this.showColumnsType == 'transfer') {
        // 显隐列初始默认隐藏列
        for (let item in this.columns) {
          if (this.columns[item].visible === false) {
            this.value.push(parseInt(item));
          }
        }
      }
    },
    methods: {
      // 搜索
      toggleSearch() {
        this.$emit("update:showSearch", !this.showSearch);
      },
      // 刷新
      refresh() {
        this.$emit("queryTable");
      },
      // 右侧列表元素变化
      dataChange(data) {
        for (let item in this.columns) {
          const key = this.columns[item].key;
          this.columns[item].visible = !data.includes(key);
        }
      },
      // 打开显隐列dialog
      showColumn() {
        this.open = true;
      },
      // 勾选
      checkboxChange(event, item) {
        item.visible = event;
        // 通知父组件更新
        this.$emit('update:columns', this.localColumns);
      },
      // 拖拽结束
      onDragEnd(event) {
        // 拖拽结束后，通知父组件列顺序已改变
        this.$emit('update:columns', this.localColumns);
        this.$emit('columns-order-changed', this.localColumns);
      }
    },
  };
  </script>
  <style lang="scss" scoped>
  ::v-deep .el-transfer__button {
    border-radius: 50%;
    padding: 12px;
    display: block;
    margin-left: 0px;
  }
  ::v-deep .el-transfer__button:first-child {
    margin-bottom: 10px;
  }
  
  .drag-item {
    padding: 8px;
    cursor: move;
    border-bottom: 1px solid #ebeef5;
    display: flex;
    align-items: center;
    
    &:hover {
      background-color: #f5f7fa;
    }
  }
  
  .drag-handle {
    color: #909399;
    
    &:hover {
      color: #409eff;
    }
  }
  
  </style>
  