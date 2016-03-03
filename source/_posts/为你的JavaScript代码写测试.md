---
title: 为你的JavaScript代码写测试
author: Drake Leung
tags: [JavaScript, test]
categories: []
date: 2016-02-17 19:32:51
foreword: 我会把测试JavaScript代码的功力一一传授给你。
---
下面会讲解如何使用 karama, jasmine 以及 webpack，来为我们的 ES6 代码编写测试。
（最后我写了一个可用的例子，请查看 [ES2015-Starter-Kit](https://github.com/DrakeLeung/ES2015-Starter-Kit/tree/master) ）

## 艰难的抉择
> 首先，我们要写测试，用什么写？自己写一个函数，还是使用某个测试框架？

看起来，后者可观一点。

> 然后，有哪些测试框架可以选择？选哪个？

于是，我们 google 之，找到 stackoverflow 的一个问题 [JavaScript unit test tools for TDD](http://stackoverflow.com/questions/300855/javascript-unit-test-tools-for-tdd)。

看了问题回答，很纠结，太多了不知道选择哪个！最后，我决定选择 [Karma](https://karma-runner.github.io/0.13/index.html), [Jasmine](https://github.com/jasmine/jasmine) 和 [Mocha](http://mochajs.org/) 这三者之一，根据 Star 数量以及维护团队。

{% asset_img 0.png %}

> 那么，*Karma*, *Jasmine* 以及 *Mocha* 这三者之间哪个好，有什么不同？

于是，我们不妨 google，找到了 [What are the differences between mocha, chai, karma, jasmine, should.js, etc. testing frameworks?](http://stackoverflow.com/questions/24391462/what-are-the-differences-between-mocha-chai-karma-jasmine-should-js-etc-te) 这个问题。

从回答中我们可以知道：*Karma* 只是一个 test runner，他负责提供 environment。而 *Jasmine* 和 *Mocha* 是编写测试脚本的框架。也就是说，我们可以选择 *Karma + Jasmine*或者 *Karma + Mocha*。我们不妨先选择前者~

综上所述，**我们要使用 *Karma + Jasmine* 组合来为我们的 JavaScript 代码写测试**。

## 战斗的号角
接下来，我们根据文档（[karma - Installation](https://karma-runner.github.io/0.13/intro/installation.html), [karma - Configuration](https://karma-runner.github.io/0.13/intro/configuration.html) 和 [Jasmine - introduction](http://jasmine.github.io/2.0/introduction.html)），很容易就能搞起来。

在这里我想说的是：当编写多个测试脚本的时候，你也许可以使用 `beforeEach` 和 `afterEach`。他们分别会在每个测试（spec）的之前和之后执行一次。

## 副本
最后还有一个问题是*如何结合 [Webpack](http://webpack.github.io/)* 来为我们的ES6代码编写测试。

我不得不承认，这是一个很不错的问题。然而，我也通过google找到了答案。

详细教程请看 *VueJS* 的 [Testing](https://vuejs.github.io/vue-loader/workflow/testing.html) 文档。

## 战斗的荣耀
你可以为你的仓库弄一个亮晶晶的 [travis ci status image](https://docs.travis-ci.com/user/status-images/)：

![](https://travis-ci.org/travis-ci/travis-web.svg?branch=master)

详细设置请查看 [travis docs](https://docs.travis-ci.com/user/getting-started/)以及这篇教程 [Testing JavaScript with Jasmine, Travis, and Karma](http://www.sitepoint.com/testing-javascript-jasmine-travis-karma/)。

最后，如果还是不懂的话，可以查看我写的一个例子：[ES2015-Starter-Kit](https://github.com/DrakeLeung/ES2015-Starter-Kit/tree/master)

## Resources
- [JavaScript unit test tools for TDD](http://stackoverflow.com/questions/300855/javascript-unit-test-tools-for-tdd)
- [What are the differences between mocha, chai, karma, jasmine, should.js, etc. testing frameworks?](http://stackoverflow.com/questions/24391462/what-are-the-differences-between-mocha-chai-karma-jasmine-should-js-etc-te)
- [vuejs - Testing](https://vuejs.github.io/vue-loader/workflow/testing.html)
- [Testing JavaScript with Jasmine, Travis, and Karma](http://www.sitepoint.com/testing-javascript-jasmine-travis-karma/)
