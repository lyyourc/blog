---
title: 不好好地引入 Babel Polyfill 怎么行
date: '2017-09-18'
draft: false
---

如果要引入 [Babel Polyfill](https://babeljs.io/docs/usage/polyfill/) 的话，那就按需引入吧。

因为引入整个的话，有 100+ KB ；手动引入的话，有太麻烦了。😒


## 编译时-按需引入
思路：根据预先定义好的浏览器版本列表，引入对应的 polyfill 。

实现：[babel-preset-env](https://github.com/babel/babel-preset-env) 。

```javascript
// 需要 Babel 7 !!
// .babelrc.js

module.exports = {
  presets: [
    [
      'env',
      {
        modules: false,
        useBuiltIns: 'usage',
        shippedProposals: true,
        targets: {
          browsers: ['> 1%', 'last 2 versions'],
        },
      },
    ],
  ],
}
```

* `targets.browsers` 字段是用 [browserslist](https://github.com/ai/browserslist) 这个库解析的，如果想知道具体包含了哪些浏览器，可以查看网站 [browserl.ist](http://browserl.ist/) 。
* 设置 [useBuiltIns](https://github.com/babel/babel-preset-env/tree/2.0#usebuiltins-usage) 的值为 `usage` 的话，可以做到**自动**引入 polyfill 。


## 运行时-按需引入
然而，真正的按需引入应该是根据当前用户使用的浏览器来决定才对。

思路：根据 `User-Agent` 来获取当前浏览器的版本，然后引入所需的 polyfill 。

实现：[polyfill.io](polyfill.io) 。

这种方法缺点是，**无论如何都要发一次请求** ，即使我当前使用的浏览器并不需要 polyfill 。

## 最后
还有一种思路是这种，[deploying-es2015-code-in-production-today](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) 。

利用 `<script type="module"></script>` 来**倒推**出当前的浏览器需要哪些 polyfill 。
