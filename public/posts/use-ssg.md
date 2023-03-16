---
title: vite-ssg使用与踩坑
date: 2023-03-10
tags: [前端, SSG]
top_img: false
keywords: [前端, SSG]
categories: [Web开发]
---

### Vite-SSG 介绍

`Vite-SSG` 是[ antfu ](https://github.com/antfu)基于 `Vite` 和 `Vue3` 开源的一个静态站点生成器, 类似的产品有 `Vuepress` 和 `hexo`


---

### 食用

> 需要 node>=14!!

```
npm i -D vite-ssg vue-router @vueuse/head
```

**配置 `package.json`**

```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite-ssg build",
    "build": "vite-ssg build -c another-vite.config.ts"
  }
}
```

**main.ts**引入

```ts
// src/main.ts
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'

// 自己定义的路由配置
import routes from '@/router/index.ts'

export const createApp = ViteSSG(App, { routes }, ({ app, router, routes, isClient, initialState }) => {})
```

---


### 路由配置的坑

> `Vite-SSG` 路由只需要定义 `routes`即可, 不要使用 `createRouter`创建了路由!! 否则会出现以下报错, 出现 `location is no defined` 也是类似的原因.

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ff77539e7be41d4a43b245d667d5d83~tplv-k3u1fbpfcp-watermark.image?)

---

**错误的路由定义**:

```ts
// src/router/index.ts
import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

import Home from '@/views/Home/index.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        name: 'Home',
    }
    ...

]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default routes
```

**正确的定义**

```ts
// src/router/index.ts
import { RouteRecordRaw } from 'vue-router'

import Home from '@/views/Home/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    name: 'Home',
  }
  ...

]

export default routes

```

---

### 配套方案推荐

- `vite-plugin-pages` 基于文件系统的路由
- `vitesse` 一个简单的 `Vite-SSG` 模板
- [`vite-plugin-pwa`](https://github.com/antfu/vite-plugin-pwa) - PWA

[更多使用方式请参考 Vite-SSG 官方文档](https://github.com/antfu/vite-ssg)
