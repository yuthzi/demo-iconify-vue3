import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      // relative paths to the directory to search for components.
      dirs: ['src/components'],
      resolvers: [
        IconsResolver({customCollections: ["custom"]})
      ],
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        // 加载该目录下所有。
        custom: FileSystemIconLoader("./src/assets"),
      },
      iconCustomizer(collection, icon, props) {
        const name = `${collection}:${icon}`;
        if (name === "inline:async" || name === "inline:foo" || name === "custom:car-a") {
          props.width = "1em";
          props.height = "1em";
          props.color = "skyblue";
        }
      },
    }
    ),
  ],
  resolve: {
    alias: {
        "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
    }
}

})

