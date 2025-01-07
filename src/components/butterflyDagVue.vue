<template>
  <div class='butterflyVue'>
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="addNode">添加节点</el-button>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="primary" @click="init">模拟初始化</el-button>
      </el-col>
      <el-col :span="20">
        <div style='width: 100%; height: 100vh;'>
          <butterfly-vue ref='butterflyVue' :canvasConf="canvasConfig" :canvasData="mockData" @deleteNode="deleteNode" @openDrawer="openDrawer" @onOtherEvent="onOtherEvent" @onDeleteEdge="onDeleteEdge" />
        </div>
      </el-col>
    </el-row>

    <el-drawer :title="title" :visible.sync="drawer" direction="rtl">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
import { ButterflyVue } from 'butterfly-vue';
import mockData from "./mockData.js";
import BaseNode from './baseNode.vue';

export default {
  name: 'butterflyDagVue',
  components: {
    ButterflyVue,
  },
  watch: {
    mockData: {
      handler(val) {
        console.log('mockData', val);
      },
      deep: true
    }
  },
  data() {
    //这里存放数据
    return {
      mockData,
      drawer: false,
      title: '我是标题',
      canvasConfig: {
        // disLinkable: true, // 可删除连线
        linkable: true,    // 可连线
        draggable: true,   // 可拖动
        zoomable: true,    // 可放大
        moveable: true,    // 可平移
        // layout: {
        //   // type: "dagreGroupLayout",
        //   options: {
        //     rankdir: "TB",
        //     adjustSizes: true,
        //     // nodeDistance: 100,
        //     // scalingRatio: 1,
        //     nodesep: 80,
        //     // ranksep: 50,
        //     // controlPoints: false,
        //     // links: {
        //     //   strength: 10
        //     // },
        //   },
        // },
        // autoResizeRootSize: true,
        // moveable: true,
        theme: {
          edge: {
            shapeType: 'Manhattan',
            arrow: true,
            // arrowShapeType: 'circle',
            // defaultAnimate: true,
            isExpandWidth: true,
            // style: {
            //   lineColor: '#f00',
            //   lineWidth: 10,
            //   lineAppendWidth: 10,
            // }
          },
          endpoint: {
            // position: [],        //限制锚点位置['Top', 'Bottom', 'Left', 'Right'],
            linkableHighlight: true,//连线时会触发point.linkable的方法，可做高亮
            expandArea: {        //锚点过小时，可扩大连线热区
              left: 20,
              right: 20,
              top: 20,
              botton: 20
            }
          },
        }
      },
      // 选中的连线ID
      selectedLines: [],
    };
  },
  //方法集合
  methods: {
    // 添加节点
    addNode() {
      console.log(this.mockData.nodes);

      const maxValue = this.mockData.nodes.at(-1).id.split('_')[1];
      const endpoints = [
        {
          id: 'top',
          orientation: [0, -1],
          pos: [0.5, 0]
        },
        {
          id: 'bottom',
          orientation: [0, 1],
          pos: [0.5, 1]
        },
        {
          id: 'left',
          orientation: [-1, 0],
          pos: [1, 0.5]
        },
        {
          id: 'right',
          orientation: [1, 0],
          pos: [1, 0.5]
        },
      ];
      this.mockData.nodes.push({
        id: `node_${Number(maxValue) + 1}`,
        text: `节点${Number(maxValue) + 1}`,
        top: 300,
        left: 400,
        render: BaseNode,
        endpoints: endpoints,
      });
      console.log('this.$refs.butterflyVue.canvas', this.$refs.butterflyVue.canvas)
      // this.$refs.butterflyVue.redraw()
      console.log(this.mockData.nodes);
      // this.$forceUpdate();
    },
    // 删除节点
    deleteNode(id) {
      console.log('id', id)
      this.$refs.butterflyVue.canvas.removeNode(id);
      const index = this.mockData.nodes.findIndex(item => item.id === id);
      this.mockData.nodes.splice(index, 1);
    },
    // 打开抽屉
    openDrawer(data) {
      this.title = `我是${data.text}`;
      this.drawer = true;
    },
    // 监听删除连线
    onDeleteEdge(data) {
      console.log('删除连线', data);
      const index = this.mockData.edges.findIndex(item => item.id === data.edgeId);
      // console.log('this.mockData.edges',this.mockData.edges)
      // this.mockData.edges.splice(index, 1);
      // console.log('this.mockData.edges',this.mockData.edges)

      // this.$refs.butterflyVue.canvas.removeEdge(data.edgeId);
    },
    onOtherEvent(data) {
      // console.log('data', data)
      if (data.type === 'link:click') {
        console.log('点击了连线', data.edge);
        data.edge.dom.classList.add('selected');
        this.selectedLines.push(data.edge.id);
        // 监听键盘是否点击了delete键
        document.onkeydown = (e) => {
          if (e.keyCode === 46) {
            this.selectedLines.forEach(item => {
              this.$refs.butterflyVue.canvas.removeEdge(item);
            })
          } else {
            data.edge.dom.classList.remove('selected');
            // 取消监听键盘事件
            document.onkeydown = null;
            this.selectedLines = [];
          }
        }
      }
      if (data.type === 'nodes:delete') {
        console.log('删除的节点', data.nodes[0].id);
        // this.deleteNode(data.nodeId);
        // 如果删除节点，需要删除节点的连线
        const edges = this.mockData.edges.filter(item => item.sourceNode === data.nodes[0].id || item.targetNode === data.nodes[0].id);
        edges.forEach(item => {
          const index = this.mockData.edges.findIndex(edge => edge.id === item.id);
          this.mockData.edges.splice(index, 1);
        })
      }
    },
    // 保存
    save() {
      console.log("BaseNode", BaseNode);

      console.log('this.mockData', this.mockData);
      const data = JSON.parse(JSON.stringify(this.mockData));
      localStorage.setItem('mockData', JSON.stringify(data));
    },
    // 模拟初始化
    init() {
      console.log('模拟初始化');
      this.mockData = localStorage.getItem('mockData') ? JSON.parse(localStorage.getItem('mockData')) : [];

      this.mockData.nodes.forEach(item => {
        item.render = BaseNode;
      })
    }
  }
}
</script>
<style lang='scss' scoped>
::v-deep .butterfly-svg {
  .butterflies-link {
    stroke-width: 5px;
    // 鼠标选中连线的样式
    &.selected {
      stroke: #f00;
    }
  }
  .butterflies-arrow {
    stroke-width: 5px;
  }
}
</style>