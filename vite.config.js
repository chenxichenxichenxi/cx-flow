import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import { resolve } from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/plugins/index.js'),
      name: 'cx-flow',
      fileName: 'cx-flow',
      formats: ['umd'],
      cssCodeSplit: false,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-ui', 'butterfly-vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-ui': 'ElementUI',
          'butterfly-vue': 'ButterflyVue',
        },
      },
      plugins: [
        {
          name: 'auto-css-inject',
          generateBundle(config, bundle) {
            // 查找生成的CSS文件
            const cssFiles = Object.keys(bundle).filter((key) => key.endsWith('.css'));
            if (cssFiles.length === 0) return;
            // 读取CSS文件内容
            const cssContent = cssFiles.map((file) => bundle[file].source).join('\n');

            // 创建一个注入CSS的新模块
            const cssInjectionCode = `
              const style = document.createElement('style');
              style.type = 'text/css';
              style.innerHTML = \`${cssContent.replace(/`/g, '\\`')}\`;
              document.head.appendChild(style);
            `;

            // 将注入代码添加到主入口文件中
            const entryFile = Object.keys(bundle).find((key) => key.startsWith('cx-flow') && key.endsWith('.js'));
            if (entryFile) {
              const entryContent = bundle[entryFile].code;
              bundle[entryFile].code = cssInjectionCode + entryContent;
            }

            // 删除原有的CSS文件
            cssFiles.forEach((file) => {
              delete bundle[file];
            });
          }
        }
      ]
    }
  }
})
