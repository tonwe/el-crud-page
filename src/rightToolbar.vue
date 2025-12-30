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
        <el-popover
          placement="bottom"
          trigger="click"
          v-model="popoverVisible"
          popper-class="columns-popover"
          v-if="showColumnsType == 'checkbox'"
        >
          <draggable
            v-model="visibleColumnsList"
            class="columns-list"
            handle=".drag-handle"
            animation="200"
            @end="onDragEnd"
          >
            <div
              v-for="item in visibleColumnsList"
              :key="item.key"
              class="column-item"
            >
              <i class="el-icon-rank drag-handle"></i>
              <el-checkbox
                v-model="item.visible"
                @change="checkboxChange"
              >
                {{ item.label }}
              </el-checkbox>
            </div>
          </draggable>
          <el-button size="mini" circle icon="el-icon-menu" slot="reference" style="margin-left: 12px" />
        </el-popover>
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
import draggable from 'vuedraggable';

export default {
  name: "RightToolbar",
  inject: ["crud"],
  components: {
    draggable
  },
  data() {
    return {
      value: [],
      title: "显示/隐藏",
      open: false,
      popoverVisible: false,
      localColumns: [],
    };
  },
  props: {
    showSearch: {
      type: Boolean,
      default: true,
    },
    columns: {
      type: Array,
    },
    search: {
      type: Boolean,
      default: true,
    },
    showColumnsType: {
      type: String,
      default: "checkbox",
    },
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
    },
    visibleColumnsList: {
      get() {
        return this.localColumns.filter(item => {
          return item.type !== 'index' && 
                 item.type !== 'selection' && 
                 typeof item.visible !== 'undefined';
        });
      },
      set(value) {
        const visibleKeys = value.map(v => v.key);
        const otherColumns = this.localColumns.filter(item => {
          return item.type === 'index' || 
                 item.type === 'selection' || 
                 typeof item.visible === 'undefined';
        });
        this.localColumns = [...otherColumns, ...value];
      }
    }
  },
  watch: {
    columns: {
      handler(newVal) {
        this.localColumns = newVal ? [...newVal] : [];
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    if (this.showColumnsType == 'transfer') {
      for (let item in this.columns) {
        if (this.columns[item].visible === false) {
          this.value.push(parseInt(item));
        }
      }
    }
  },
  methods: {
    toggleSearch() {
      this.$emit("update:showSearch", !this.showSearch);
    },
    refresh() {
      this.$emit("queryTable");
    },
    dataChange(data) {
      for (let item in this.columns) {
        const key = this.columns[item].key;
        this.columns[item].visible = !data.includes(key);
      }
    },
    showColumn() {
      this.open = true;
    },
    checkboxChange() {
      this.$emit('update:columns', this.localColumns);
    },
    onDragEnd() {
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

<style lang="scss">
.columns-popover {
  padding: 8px 0;
  min-width: 200px;
}

.columns-list {
  max-height: 400px;
  overflow-y: auto;
}

.column-item {
  display: flex;
  align-items: center;
  padding: 8px 16px 8px 10px;
  user-select: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f7fa;
  }
  
  .drag-handle {
    margin-right: 8px;
    color: #909399;
    cursor: move;
    
    &:hover {
      color: #409eff;
    }
  }
  
  .el-checkbox {
    flex: 1;
  }
}

.sortable-ghost {
  opacity: 0.4;
  background-color: #ecf5ff;
}

.sortable-drag {
  opacity: 0.8;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
