---
title: 从零开始编写一个Hexo主题
author: Drake Leung
tags: [hexo, theme]
categories: []
date: 2016-01-27 22:23:29
foreword: 从零开始写一个主题的话，就意味着我们要了解Hexo的workflow。
---

之前我也不会写，但是当我了解以下东西的时候，就可以从零开始写一个Hexo主题了。
![](https://ws1.sinaimg.cn/large/7f85b91egy1fcyigcftb4j209j05lq2t)

- NodeJS / NPM
- 模板引擎(Template Engine)，比如EJS, Jade，Handlebars等等都可以
- HTML / CSS / JavaScript
- 阅读Hexo的[文档](https://hexo.io/docs/)
- 阅读Hexo默认主题[landscape](https://github.com/hexojs/hexo-theme-landscape)的源码

以上正是一名Web前端人员需要了解和掌握的东西。
**不过，不会前端也不要紧，我告诉你以下的东西就足够了。**

## NodeJS / NPM
首先，Hexo是由NodeJS来编写的。编写一个应用是需要第三方包(依赖/库)，这个就是我们的`package.json`文件的由来。这些package怎么下载的呢？答案就是通过[NPM](https://www.npmjs.com/)(Node Package Manager)，然后他们都会安装在`node_modules/`这个文件夹里面。

OK，这就是我们需要知道的NodeJS和NPM的知识。

## Hexo的Workflow
**下面是重点。**

Hexo会读取根目录下的`_config.yml`里面的`theme`属性, 从而采用对应的主题。而主题都是放在`themes/`目录下面的，然后你会发现他里面有个`landscape`的目录，这个就是默认主题啦。

![](https://ws1.sinaimg.cn/large/7f85b91egy1fcyigc2329j20bj06qdg3)

接着，我们查看`themes/landscape/`目录，以及根据文档[docs-themes](https://hexo.io/docs/themes.html)，我们很容易得出：一个主题其实由4部分组成。

- `_config.yml`: 主题的配置文件
- `source/`: 放我们的CSS文件以及图片
- `layout/`: 模板文件
- `scripts`: 放JavaScript文件，他们会自动加载

然后，根据文档[docs-templates](https://hexo.io/docs/templates.html)，不难得出：

每次当我们在浏览器访问时，Hexo都会去解析`sources`目录下对应的模板文件。不同的URL对应不同的文件，所以才有了不同的页面。那么，我们怎么知道哪个URL对应哪个页面呢？(下面我们以`EJS`为例)

无论URL是什么，Hexo先读取`layout.ejs`，然后里面的[body](https://github.com/hexojs/hexo-theme-landscape/blob/master/layout%2Flayout.ejs)变量会替换成以下内容：(*Fallback*的意思是如果访问`/archives`时，我们的`archives.ejs`不存在的话，就会返回`index.ejs`)

URL   | Template  | Fallback
---   | ----      | ---
/     | index.ejs |
/archives | archive.ejs | index.ejs
文章  | post.ejs  | index.ejs


如下图所示:

![](https://ws1.sinaimg.cn/large/7f85b91egy1fcyigcbx4zj20az070mxi)

或者，可以先尝试一下没有`layout.ejs`的情况，因为比较简单。也就是，访问`/`，Hexo就返回`index.ejs`里面的东西给你。访问`/archives`就返回`archive.ejs`。

## 模板文件
那么，接下来就要编写我们的模板文件了。怎么写呢？
比如我的根目录想显示所有的文章？我们就要使用Hexo提供的[变量](https://hexo.io/docs/variables.html)了。通过文档，我们可以得出`page.posts`这个变量就包含了所有的文章。

```html
<% page.posts.each(function(post){ %>
  <article>
    <h1> post.title </h1>
    <div> post.content </div>
  </article>
<% }) %>
```

编写模板文件的时候，我们可能利用Hexo内置的一些[helper](https://hexo.io/docs/helpers.html)来方便开发，比如分页使用[paginator](https://hexo.io/docs/helpers.html#paginator)，路径处理使用[url_for](https://hexo.io/docs/helpers.html#url_for)等。

## 样式
我们的CSS文件是放在`source`里面的，然后要怎么加载呢？这个时候，我们就需要在模板文件里面引入，比如我们的首页需要`app.css`，那么就在`index.ejs`里面引用就行了。如果每个页面都用到的话，就放在`layout.ejs`。
```html
<%- css('path/to/app') %>
```

当然，你也可以使用预处理器来写样式，比如Sass，Stylus等等。此时，你就要下载对应的package来解释成CSS。比如，我使用的是Sass，那么我就要`npm i --save hexo-renderer-sass`来把`.scss`文件解释成`.css`文件。

## 总结一下
如果遇到问题的话，查看Hexo默认主题[landscape](https://github.com/hexojs/hexo-theme-landscape)的源码以及[文档](https://hexo.io/docs/)就能解决了。
最后卖下广告，这是我写的主题：[hexo-theme-again](https://github.com/DrakeLeung/hexo-theme-again)。
