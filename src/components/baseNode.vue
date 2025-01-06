<template>
  <div class="base-node">
    <div class="top-part">
      <span class="text" ref="text" @dblclick="openDrawer">{{itemData.text}}</span>
      <span class="close" @click="close">✖</span>
    </div>
    <el-select v-model="value" size="mini">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>

export default {
  name: "base-node",
  props: {
    itemData: {
      type: Object,
    },
    canvasData: {
      type: Object
    },
  },
  data() {
    return {
      value: '',
      options: [
        { value: 'option1', label: '选项1' },
        { value: 'option2', label: '选项2' },
        { value: 'option3', label: '选项3' }
      ]
    }
  },
  methods: {
    close() {
      console.log('close');
      this.$emit('deleteNode', this.itemData.id);
    },
    openDrawer(e) {
      console.log('openDrawer');
      this.$emit('openDrawer', this.itemData);
    }
  },
};
</script>

<style lang="scss" scoped>
.base-node {
  width: 200px;
  height: 120px;
  padding: 10px;
  cursor: pointer;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .top-part {
    display: flex;
    justify-content: space-between;
  }

  .el-select {
    margin-top: 5px;
  }
}
</style>
