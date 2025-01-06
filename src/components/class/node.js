import { Node } from 'butterfly-dag';
import Vue from 'vue';

class BaseNode extends Node {
  constructor(opts) {
    super(opts);
    this.render(opts);
  }

  render(opts) {
    console.log('opts', opts);

    const container = document.createElement('div');
    container.className = 'base-node';

    // 设置节点的基本属性和样式
    container.setAttribute('id', opts.id);
    container.style.position = 'absolute';
    container.style.top = `${opts.top}px`;
    container.style.left = `${opts.left}px`;
    container.style.width = `${opts.width}px`;
    container.style.height = `${opts.height}px`;
    container.style.border = opts.border;
    
    const selectContainer = document.createElement('div');
    container.appendChild(selectContainer);
    this.dom = container;

    new Vue({
      el: selectContainer,
      data: {
        value: '',
        options: [
          { value: 'option1', label: '选项1' },
          { value: 'option2', label: '选项2' },
          { value: 'option3', label: '选项3' }
        ]
      },
      methods: {
        closeNode() {
          // 触发全局事件，而不是组件内的事件
          window.dispatchEvent(new CustomEvent('close-node', { detail: opts.id }));
        }
      },
      render(h) {
        const span = h(
          'span', {
          class: 'text',
        }, opts.text);
        const close = h(
          'span', {
          on: {
            click: () => this.closeNode()
          }
        }, '✖');
        const div = h(
          'div', {
          class: 'top-part',
          style: {
            display: 'flex',
            'justify-content': 'space-between'
          }
        }, [span, close]);
        const select = h(
          'el-select', {
          props: {
            value: this.value,
            placeholder: '请选择',
            size: 'mini'
          },
          style: {
            'margin-top': '5px' // 添加 margin-top
          },
          on: {
            input: (val) => {
              this.value = val;
            },
          }
        }, this.options.map(option => {
          return h('el-option', {
            props: {
              key: option.value,
              label: option.label,
              value: option.value
            }
          });
        }));
        return h('div', [div, select]);
      }
    })
  }
}

export default BaseNode;