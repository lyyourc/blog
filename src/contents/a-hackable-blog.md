---
title: A hackable blog
date: 2017-02-21
---

某些时候，为了学习/试验现代的前端技术，我们没有很好的适合的项目作为实验。所以我决定用 blog 作为载体，实践这些新技术。**实际上，有些技术并不一定适合 blog 这个场景**，但我们的初衷是试验这些技术，对吧。

那么，我们现在就开始吧。

> A hackable blog for the 21st Century.


## How

实现的经历大致如下。*（完整代码 [A Hackable Blog for the 21st Century](https://github.com/DrakeLeung/blog) ）*

### Webpack

首先，我们得让 webpack 跑起来再说。 [webpack - Getting Started](https://webpack.js.org/guides/get-started/) 教程。


### Vue.js

接着，我们要用到 Vue.js 诶，怎么配置 webpack 呢？
可以参考：[vue project scratch](https://skyronic.com/blog/vue-project-scratch) 以及 [vue-template/webpack simple](https://github.com/vuejs-templates/webpack-simple/blob/master/template/webpack.config.js) 。


### Babel

在上一步中，我们是要配置 Babel 的。

值得一提的是，[babel-preset-env](https://github.com/babel/babel-preset-env) 这个 preset 好棒，根据浏览器自动加载插件和 polyfill ，感觉和 CSS 的 autoprefix 差不多。不像以前那么麻烦，想用哪个语法就需要自己手动加。


```js
// .babelrc
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
```


### PostCSS

我想用 PostCSS 。

因为 vue-loader v11.x 开始支持 PostCSS 配置文件，所以我们可以直接在根目录下新建一个 `postcss.config.js` 文件。为了使用未来的 CSS 语法以及适应不同屏幕的字体大小，我们使用了
[postcss-cssnext](https://github.com/MoOx/postcss-cssnext) 和 [postcss-responsive-type](https://github.com/seaneking/postcss-responsive-type) 。

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-cssnext')(),
    require('postcss-responsive-type')(),
  ]
}
```

### Optimization

优化的话，我们要知道哪一部分需要优化。所以需要 [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) 来帮我们分析打包后的情况。

然后参考下面的链接，不过我还有很多特性没实现呢。

* [webpack - code-splitting](https://webpack.js.org/guides/code-splitting/)
* [Production Deployment Tips](https://vuejs.org/v2/guide/deployment.html)
* [SurviveJS - Webpack Optimizing](https://survivejs.com/webpack/optimizing/)


## Issue

Webpack 配置完毕后，我们就开始编写我们的 blog 了。其中一个可能的问题是：

> 如何获取 markdown 文件内容，在没有服务器的情况下

如果使用 webpack 的 [markdown-loader](https://www.npmjs.com/package/markdown-loader) 的话，它仅仅支持引用一个 markdown 文件。但是我们需要的是读取一个目录下的所有 markdown 文件。

这个时候我们需要使用到 webpack 的 [require.context](https://webpack.js.org/guides/dependency-management/#require-context) 。

```js
function importAll (r) {
  r.keys().forEach(r)
}
importAll(require.context('content/', true, /\.md$/))
```

不过这样子还是不够的，我们需要告诉 webpack 如何处理 `.md` 文件：

```js
// webpack.config.js
{
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: './src/utils/md-fm-loader.js',
        options: {
          breaks: true,
        },
      }
    ]
  }
}
```

[md-fm-loader.js](https://github.com/DrakeLeung/blog/blob/master/src/utils/md-fm-loader.js) 是我们自定义的一个 loader 。
他的作用是把 markdown 文件的 frontmatter 提取出来，剩下的转换成 HTML：

```js
const MarkdownIt = require("markdown-it")
const hljs = require('highlight.js')
const markdownItAnchor = require('markdown-it-anchor')
const frontMatter = require('front-matter')
const loaderUtils = require("loader-utils")

module.exports = function(source) {
  this.cacheable()

  // not complete codes here
  const options = this.query
  const content = frontMatter(source)

  const output = Object.assign(
    {},
    content,
    { body:  markdownIt.render(content.body),
  })

  return `module.exports = ${JSON.stringify(output)}`
}
```

其实我们可以把这转换的步骤交给前端来做，这时候需要 [raw loader](https://github.com/webpack-contrib/raw-loader) 。

这个方法看似很不错，但是我发现这些 markdown 文件占用了打包后的大部分体积。

然后我又想到了一个还不错的方法，**把这些 markdown 文件写在仓库的 issue 里，然后调用 [GitHub API](https://developer.github.com/v3/issues/#list-issues-for-a-repository) 来获取他们**。这是很棒的，即可以保存，又可以减少打包的体积。

## Pre-render

其实 blog 这个场景并不适合 SPA ，如果有办法把他转成 Static site 就好了。

暂时的解决办法是 [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin) ，他可以解决 SPA 的 SEO 和 速度慢的问题。

使用感受：

* 每个路由都可以独立运行的，即刷新后也能跑，像多页面一样。
* 首页似乎提前渲染好。
* 体积并没有减少。

暂时先这样。(逃

*完整代码 [A Hackable Blog for the 21st Century](https://github.com/DrakeLeung/blog)*