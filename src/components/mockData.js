//mockData.js
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
import BaseNode from './baseNode.vue';
export default {
  nodes: [
    {
      id: "node_1",
      text: "节点1",
      top: 0,
      left: 200,
      render: BaseNode,
      endpoints: endpoints,
    },
    {
      id: "node_2",
      text: "节点2",
      top: 0,
      left: 500,
      render: BaseNode,
      endpoints: endpoints,
    },
    {
      id: "node_3",
      text: "节点3",
      top: 0,
      left: 800,
      render: BaseNode,
      endpoints: endpoints,
    },
    {
      id: "node_4",
      text: "节点4",
      top: 300,
      left: 400,
      render: BaseNode,
      endpoints: endpoints,
    },
  ],
  edges: [
    {
      id: 'edge_1',
      type: 'endpoint',
      sourceNode: 'node_1',
      source: 'bottom',
      targetNode: 'node_4',
      target: 'top',
    },
    {
      id: 'edge_2',
      type: 'endpoint',
      sourceNode: 'node_2',
      source: 'bottom',
      targetNode: 'node_4',
      target: 'top',
    },
    {
      id: 'edge_3',
      type: 'endpoint',
      sourceNode: 'node_3',
      source: 'bottom',
      targetNode: 'node_4',
      target: 'top',
    }
  ],
};