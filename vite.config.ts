import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

//按需自动加载组件
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

//引入一个函数 获取绝对路径，用来简化路径前缀，使用绝对路径
import { resolve } from "path";
function pathResolve(dir: string) {
  // 获取绝对路径的方法
  return resolve(process.cwd(), ".", dir);
}

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  resolve: {
    alias: [
      {
        // 简化路径前缀，使用绝对地址
        find: "@",
        replacement: pathResolve("src"),
      },
    ],
  },
  server: {
    // 浏览器服务端端口
    host: "localhost",
    port: 8000,
  },
});
