# Vue 3 + TypeScript + Vite + Iconify

离线使用Iconify + 自定义图标 demo。

## 安装相应组件

安装Iconify离线图标集
```
pnpm i -D @iconify-json/mdi
pnpm i -D @iconify-json/devicon
``` 

安装unplugin-vue-components插件和unplugin-icons。unplugin-vue-components是实现按需导入，unplugin-icons是基于unplugin实现对iconify按需导入。

```
pnpm i -D unplugin-vue-components
pnpm i -D unplugin-icons
```

## 配置vite.config.ts

```
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
        // 加载该目录下所有图标。
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
```

## 使用Iconify图标例子

```
<template>
	<i-mdi-light-alarm style="font-size: 60px; color: red" />
	<i-custom-steering-wheel />
	<i-custom-car-a style="color: red; font-size: 100px" />
</template>

```
