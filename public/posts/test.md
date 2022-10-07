---
title: 测试
date: 2022-01-15
tags: [前端, 教程, 背景]
top_img: false
keywords: [前端, 教程, 背景]
categories: [Web开发]
---

1. Web Components
2. 血脉传承
3. 过程 3.1. github-corners 3.1.1. 是什么？ 3.1.2. 为什么? 3.1.3. 怎么做？ 3.1.4. 细节 3.1.5. 打包 3.1.6. 完善 3.1.7. 发布
4. 实装
5. 后话从零开始写一个 Web Component - GitHub Corners 2021-09-25- 2021-11-11 3.2k- 12m-- 32 云游的小教程-GitHubWeb Componentslit Web Components 什么是 Web Components?

Web Components 是一套不同的技术，允许您创建可重用的定制元素（它们的功能封装在您的代码之外）并且在您的 web 应用中使用它们。

Web Components 实际上和现在 React/Vue 等前端框架的组件概念十分相似，或者倒不如说 Vue 的 SFC（单文件组件）其实正是借鉴自 Web Components 的概念。它本身 Shadow DOM 的方案做了 CSS 隔离，很好地解决了 CSS 命名污染等问题，但 Web Components 除了规范推进缓慢，也还有很多开发（效率、生态、兼容等）上的不足。

简单来说 Web Components 其实就好比给予你一些浏览器的 API 权限，去定义一个 HTML 标签来自己使用。更多的介绍其实看 MDN 的介绍即可，也无需在这听我这二手的长篇大论。

Web Components | MDN

我自己本身也向来讨厌通篇理论，而热衷实践，所以我们不妨动手一试，写一个真正实用的 Web Component - github-corners。（成果请到文章末尾取用）

满口大道理，写十行代码九个报错，一个警告

血脉传承且慢，正所谓磨刀不误砍柴工。在真正动手之前，我们还是了解一下当前 Web Components 的发展状况，找一个趁手又可靠的工具。

Web Components 框架有哪些？ skatejs: 最后一次 Release 是 2017，最后一次更新是 2019，不做考虑。 slim.js: 看起来还在活跃，但知名度（Star）似乎并不高。 omi: 腾讯旗下，实际上暑假我也参与了腾讯的开源活动 腾讯犀牛鸟开源人才培养计划 并顺利结业，对其也贡献了些代码。作者当耐特是微信支付团队成员，也是此次参与项目活动的导师。 Polymer: Google 早期的 Web Components 框架，Since 2013。 lit: 依旧是 Google 出品，但谷歌对于 Polymer 不是很满意，于是另起炉灶地造了 lit-element，最终合并到 lit，Since Google I/O 2018。简而言之，Polymer -> lit-element -> lit。

而大部分 Web Components 相关的框架其实很多要么年久失修，要么其实并没有多少人用（意味着很容易遇到问题而无法依靠前人经验），可选项似乎只剩下 omi 与 lit。

尽管我也算是 omi 的贡献者，不过项目本身我觉得并不算腾讯主力在做的事情，与参与 W3C 标准制定的谷歌相比，lit 是一个公司层面上支撑团队在做的事情，而 omi 则是员工的业余开源作品。

因此在生产环境我更倾向于使用 lit 而非 omi。(omi 当作一个实验学习的地方，而 lit 则作为生产实践。) 而恰好 vite 也提供了 lit 的模板。

相关导航：

WEBCOMPONENTS.ORG: 有很多 Web Components 例子，可以粘贴自己的 npm 包链接到这里发布。过程 github-corners 我们这次的目标就是实现一个 github-corners 组件。

Web Components 的现况似乎还并不适合大型项目的开发，而 GitHub Corners 恰好是一个极小的实现，同时其功能目的，又能完美发挥 Web Components 独有的优势——跨框架。

先来三段论。

是什么？ github-corners 是一个右上角的图标，链接至你的 GitHub 项目。同时当鼠标悬停于上时，它的尾巴还会发生轻微的抖动。

预览: wc-github-corners

GitHub Corners Preview

为什么? 这件事似乎已经有人做了，我们为什么还要重复造轮子？

首先是用于练手学习，其次的话，这个仓库的 GitHub Corners 实际上是原生的 HTML 与 CSS 的结合体，也就是说我们使用它还需要粘贴它的代码，配置各种参数才能使用。（这明显是很麻烦的）

所以我们的第二个目标是将其封装为一个 npm 包，用户只需要安装这个包，就可以简单地一行代码引入，而且可以通过配置参数实现其不同的效果。

说白了，并不是重新造轮子，而是在轮子上进一步优化封装。

我们可以查一下大致有哪些组件。（以 github corners 为例）

我们可以发现其实大部分已有的包，要么是 Vue 组件，要么是 React 组件，这意味着我们只能在对应的框架中使用，而这一简单的功能完全可以使用 Web Components 来实现（这也正是它的优势），从而解决跨框架的问题。（无论你喜欢 Vue 还是 React 抑或是 Angular/Svelte，都可以将其作为 HTML 标签来使用。）

还有一个原因则是，GitHub Corners 已有的 Vue 组件还不支持 Vue3，我早在数月前提了个 [Feature Request] Support vue3 | Issue，但是作者打了 enhancement 标签后就鸽了。尽管我打算提 PR 重构，作者似乎还没有回应，所以我决定重新写一个更为通用的组件。（其实这也是本篇文章诞生的原因）

以及在 webcomponents.org 上搜索 github-corners，目前的确还没有这个组件。

怎么做？废话少说，上号废话少说，上号

正如前文所述，在 Google 的血脉压制下，我们决定使用 lit 框架。

那么，首先建立一个 vite + lit 模板。（wc 不是厕所，是 Web Components 的首字母缩写！）

yarn create vite wc-github-corners

# pnpm create vite wc-github-corners

选择 lit-ts。（前几天打算给 Vite 提 PR，结果刚好那几天有人提了。）

lit 2.0 将 lit-element 合并进了 lit。

开始开发！

建立仓库 YunYouJun/wc-github-corners | GitHub。（开源精神，当然是 MIT 协议啦！）

我们主要在 src/index.ts 编辑即可，就如同一个普通的 Class，设置我们需要暴露给用户的属性，并根据属性渲染对应的 DOM 结构。

src/index.ts | wc-github-corners

我抽取了几个我认为比较重要的属性。

blank: boolean，是否打开新的标签页 color: string，字体色彩，即 GitHub Logo 颜色 fill: string，填充背景色 repo: string，你的项目链接，默认为 GitHub 仓库，因此可以简略地写为 YunYouJun/wc-github-corners url: string，链接，可以覆盖自动生成的 GitHub 仓库链接 label: string，标签，鼠标悬浮时的标题 reverse: boolean，反转，将 GitHub Logo 色彩与背景色进行交换 position: string，位置，位于左上角还是右上角更多可参见 fields | wc-github-corners。

更具体的过程其实是件很无聊的事情，无非是查 lit 文档，写模板、写参数。以至于我自己懒得在此一一道来，而想起那天恰好无聊开了直播，朋友帮忙录了下来……（咳，有闪过什么羞耻的东西还请忽略）

录制-822719-20210930-200614-500-从零开始的 Web Component | bilibili

所以更具体的开发过程介绍，就用这个糊弄一下吧，随便拖拽进度条了解思路即可。看仓库代码可能反而更快。

细节当然在此过程中也有一些细节问题。

blank 属性为什么默认是 false？ /\*\*

- A github corner. \*/ @customElement('github-corners') export class GitHubCorners extends LitElement { // ... /\*\*
  - target="\_blank" for link \*/ @property({ type: Boolean }) blank = false // ... } 如上，我们添加了 blank 作为链接的 target='\_blank' 的缩写属性。

因为在 HTML 标签上想要实现布尔值只能省略不写，普通地给 HTML 标签属性传值都会被当作字符串解析。

譬如 blank="false" 其实等价于传入了 ‘false’ 这一字符串，仍然会被当作 true。只有当我们不写 blank 这个属性时，blank 属性数值才会是 false。

<!-- 而我们需要其为 true 时，只需要这样写 -->

<github-corners blank></github-corners> lit 的响应式属性 lit 的 dom 和属性是响应式的，即你修改组件的属性，它渲染出来的 dom 也会响应式变化。

但是 style 并没有，所以如果你有时候需要 property 控制的 style 也是，这时需要给其设置 reflect: true。

见 Reactive properties | Lit

打包因为我们尽量想要独立使用，所以需要配置一下 vite，以便在打包时不会将 lit 代码排除。

import { defineConfig } from 'vite'

// https://vitejs.dev/config/ export default defineConfig({ build: { lib: { entry: 'src/index.ts', formats: ['es'], fileName: format => `index.${format}.js`, }, // Because we try to use it independently, we don’t exclude lit. // rollupOptions: { // external: /^lit/, // }, }, }) 完善一个成功的项目，开发是一部分，而文档和维护也是非常重要的点。

开发完毕后，我们还应当补充好 API 文档，构建后发布到 NPM 包。

# 构建

npm run build

# 生成 dist/index.es.js

npm publish

# 将当前文件夹下 dist 和 types 相关文件发布到 npm 包

好，完成。

组件中有着一些属性和对应注释，我需要将这些参数和注释说明转换为文档来给用户阅读。（虽然直接读代码也行，hhh）

手写文档倒不是什么难事，但是以后一旦修改属性、或者描述，我就要再改一遍文档，这合理吗？（合理！）

手动修改难免同步会有疏漏，最优雅的方案应当是根据代码自动生成文档。（就像 TypeDoc 做的事那样）因为代码本身便是用 TypeScript 写的，所以这倒不是什么难事。当然 lit 本身也已经给我们提供了一些方案。

在参考 lit-element-starter-ts 想要自动生成文档时，我发现了 @custom-elements-manifest/analyzer 这个包。可以自动解析 class 生成相关参数的信息。

在看了 repo 后，我又发现了 @custom-elements-manifest/to-markdown 这个包，可以直接利用其结合注释生成文档，而这正是我需要的。

但这还不够，我需要将其直接插入我的 README.md（这样更直观方便），而不是生成一个新的 markdown。

我在其他项目其实也有过类似的需求，所以此前我将其封装成了一个 npm 包，我现在可以直接安装使用。（什么叫沉淀输出，战术后仰）

pnpm add @yunyoujun/utils import { markdown } from "@yunyoujun/utils"; 生成文档部分代码可见 scripts/gen-docs.ts。

发布终于到了发布阶段。我们发布的内容主要包括 dist 与 types，dist 是我们编译后直接就可以拿来用的代码，types 则是辅助的类型提示。

package.json 中可以如下设置。

{ "name": "wc-github-corners", "version": "0.1.3", "main": "dist/index.es.js", "exports": { ".": "./dist/index.es.js" }, "types": "types/index.d.ts", "files": ["dist", "types"], "scripts": { "analyze": "custom-elements-manifest analyze --globs 'src/index.ts' --outdir dist", "dev": "vite", "build": "tsc && vite build && npm run copy:demo && npm run docs:gen", "copy:demo": "cp demo/\* dist/", "preview": "vite preview", "docs:gen": "npm run analyze && esmo scripts/gen-docs.ts", "prepublishOnly": "npm run build" } // 。。。 }

# 发布，确保处于 npm 官方源下

npm publish 执行发布包的命令，同时会自动触发我们写在脚本里的 prepublishOnly 进行构建，确保每次发布时，都是构建后没问题的。

除了 NPM 包，我们还可以发布到 webcomponents.org，通过已发布的 npm 包名来发布即可。

wc-github-corners | webcomponents.org

实装总之先展示一下最后成果。

GitHub: wc-github-corners Demo: https://www.yunyoujun.cn/wc-github-corners/ Demo 代码: wc-github-corners/demo/index.html 软件界用自己的东西叫做 dogfooding, (Eating your own dog food - 吃自己的狗粮)

所以我打算先好好品尝一下，在自己的各个项目里开始使用起来。

Web Components 的原理，使得它可以在任意框架里被使用，比如我可以在我的 Vue 项目中使用，也可以 React，甚至原生 CDN 引入使用。

我在我的 char-dust 中尝试引用了它，只需要在 head 和 body 标签中对应引入 CDN 和 github-corners 标签即可，So Easy!

<head>
  <script
    type="module"
    src="https://cdn.jsdelivr.net/npm/wc-github-corners@latest"
  ></script>
  <!-- ... -->
</head>
<body>
  <github-corners blank repo="YunYouJun/char-dust"></github-corners>
  <!-- ... -->
</body>
demo/index.html | char-dust
不使用 CDN 的话，也可以在 main.ts 中 import "wc-github-corners"; 来直接使用。

就此，一个基于 Web Components 技术的小组件就实现完毕了。除了 Demo 本身的示例作用，我想它本身也是足够实用的。也欢迎大家将其用于展示自己的项目。✌️

后话实质上这个小项目本在国庆就已经完成了，但却一直拖到现在才介绍。最近终于下定决心做了一个可能决定自己未来走向的选择，希望能在下次和大家好好说道说道。

Q.E.D.

我很可爱，请给我钱本文作者：云游君本文链接：https://www.yunyoujun.cn/posts/how-to-write-a-web-component/ 版权声明：本博客所有文章除特别声明外，均默认采用 许可协议。聊聊四元数与万向锁及其实际意义旋转吧！徽章！如果您有任何关于博客内容的相关讨论，欢迎前往 GitHub Discussions 与我交流。昵称邮箱(可选) 网址(可选) 填写邮箱，可以收到回复通知哦～

0 字 32 评论按正序按倒序按热度

二哈 2022-07-15 0

江西 Edge103.0Windows 10 不可以

喵二 2022-07-11 0

香港 Chrome103.0Windows 10 云姐好久没更新了 bb_doge

云游君博主 2022-07-11 0

Chrome103.0Mac OS 10.15.7 @ 喵二: 被我爸发现博客了……

echocbx2022-09-29 0

北京 Safari15.3Mac OS 10.15.6 @云游君: 没逝吧

鸟叔 2022-06-13 0

山西 Chrome101.0Windows 7 厉害 又是一个编程大咖

过客 2022-05-29 0

湖北 Chrome95.0Windows 10 作者的 blog 很漂亮 qq_grin

liugezhou2022-05-08 0

北京 Chrome101.0Mac OS 10.15.7 Cool!

喵帕斯先生 2022-04-24 0

山东 Chrome100.0Windows 10 评论怎么设置都只是显示个框，是怎么回事？

Brannua2022-01-22 0

Chrome96.0Linux x86_64 大佬有无推荐的做法：关于如何在 web component 中使用 iconfont

云游君博主 2022-01-23 0

江苏 Chrome97.0Mac OS 10.15.7 @Brannua: 无想法……关于图标的解决方案，我现在十分推荐 unplugin-icons。我现在的项目图标都采用此方案。

Brannua2022-01-24 0

河南 Chrome96.0Linux x86_64 @云游君: 感谢大佬，我尝试在 web component 中使用 iconfont，发现一旦开启了 shadowDOM，iconfont 就失效了，并且百度说 web-component 不支持 @font-face，然后我直接用单个图标 svg 的形式引入了，这块的 BUG 您有遇到过嘛，想听下您的见解，谢谢大佬

云游君博主 2022-01-24 0

江苏 Chrome97.0Mac OS 10.15.7 @Brannua: Web Components 我也是浅尝辄止，日常真正开发还是以 Vue/React 为主。关于图标，直接 SVG 的方式应该是没问题的，而且按理说这也应该是最佳方式，font 图标的方式以后应该会慢慢淘汰的。虽然 font 的方式很方便，但是体积等是个问题，而比如我上面提的 unplugin-icons 等一些打包工具，可以根据类似 font class 的方式来在打包时自动插入 svg ，因此既兼顾了便利也提高了加载速度。

Brannua2022-01-25 0

Chrome96.0Linux x86_64 @云游君: 原来如此，谢谢大佬

孙悟元 2022-01-20 0

湖南 Chrome94.0Windows 10 666bb_doge

JIeJaitt2022-01-08 0

Safari15.2Mac OS 10.15.7 大佬，你这博客是怎么搭建的呀，太好看了吧

云游君博主 2022-01-09 0

北京 Chrome96.0Mac OS 10.15.7 @JIeJaitt , 主题文档见 https://yun.yunyoujun.cn/ 。

Brannua2022-01-07 0

河南 Chrome96.0Linux x86_64 但是为什么说 web components 的效率不足呢 ？我理解可重用元素能够实现高内聚低耦合，不应该是提升了开发效率吗（避免了重复造轮子），是我理解那里出问题了么，谢谢大佬

云游君博主 2022-01-09 0

北京 Chrome96.0Mac OS 10.15.7 @Brannua , 组件式确实一定程度上可以复用提高开发效率，而我所指的效率主要是相对 Vue/React 等现代前端开发框架而言。Vue/React 等的组件式开发相比 Web Components 已经相当成熟，各种周边的插件、包也更为丰富易用，因此 Web Components 的开发效率便相形见绌。

Brannua2022-01-11 0

Chrome96.0Linux x86_64 @云游君 , 哦这个意思呀，那这样就明白啦，谢谢大佬！！！bb_cute

Powered by Waline v2.12.0 苏 ICP 备 17038157 号 © 2016 – 2022 云游君由 Hexo 驱动 v6.2.0|主题 - Yun v1.10.7 本网站由又拍云提供 CDN 加速
