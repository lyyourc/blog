---
title: 不好好地引入 Babel Polyfill 怎么行
date: 2017-09-18
draft: false
---

如果要引入 [Babel Polyfill](https://babeljs.io/docs/usage/polyfill/) 的话，那就按需引入吧。


## 编译时-按需引入
思路：根据预先定义好的浏览器版本列表，引入对应的 polyfill 。

实现：[babel-preset-env](https://github.com/babel/babel-preset-env) 。


## 运行时-按需引入

思路：根据 `User-Agent` 来获取当前浏览器的版本，然后引入所需的 polyfill 。

实现：[polyfill.io](polyfill.io) 。
