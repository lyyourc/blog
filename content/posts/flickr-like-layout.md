---
title: flickr 图片布局下必定隐藏着什么
date: '2016-04-29'
draft: false
---

  Flickr 团队最近开源了他们图片布局的项目 - [Flickr's Justified Layout](https://github.com/flickr/justified-layout/blob/master/README.md) 。那么，通过阅读其源代码后，我实现了一个简单版 - [jjjustify](https://github.com/DrakeLeung/demo/blob/gh-pages/toys%2Fjjjustify%2FREADME.md)。点击这里可以查看在线 [demo](http://frontend-addiction.github.io/Baidu-IFE/stage03/task43/flickr/index.html) 。

  ## 核心算法
  整个应用的核心是：**如何确定一行中的图片数量并且保持横纵比** 。

  首先，我们需要知道一个知识：

  > 假设我们一行的高度为 300 ，宽度为 1200 。那么在这一行中的所有图片的横纵比之和就小于等于这一行的横纵比，也就是 4:1 。

  我们这里不用数学来证明。但是不妨想象，当一行中的图片都收缩或者拉伸之后，是可以占满整行的，这时，就相当于这一行。所以，当前行所有图片的横纵比之和要**小于等于**初始设定的整行的横纵比。

  ![](https://ws1.sinaimg.cn/large/7f85b91egy1fcyigc5aptj20e409cq2y)

  但是，为了增加灵活性，我们可以**设定一个容忍度**。他的取值范围是 `[0, 1]` 。如果当前行所有图片的横纵比之和介于（初始设定的整行的横纵比 * (1 +- 容忍度）的话，我们都能接受（容忍），在当前行插入该图片。

  举个例子：初始设定的整行的横纵比（`targetRowAspectRatio`）为 4 ，我们的容忍度（`tolerance`）为 `0.25` 。所以，只要图片们的横纵比之和介于 `targetRowAspectRatio * (1 - tolerance)` 和 `targetRowAspectRatio * (1 + tolerance)` 就让他们在当前行。

  ![](https://ws1.sinaimg.cn/large/7f85b91egy1fcyigc9gpmj20dh0bjmxm)

  如果大于容忍后的横纵比的话，**为了更加精确，我们可以比较绝对值**。看看插入图片后的横纵比之和 - targetRowAspectRatio 的绝对值小，还是插入图片前的横纵比之和 - targetRowAspectRatio 的绝对值小。哪个小就采用哪种方案。

  插入新图片前的绝对值为 `3.5` :
  ![](https://ws1.sinaimg.cn/large/7f85b91egy1fcyigc7tzwj20cs0b1wep)

  插入后的绝对值为 `0.5` ，小于 `3.5` ，所以我们选择在当前行插入该图片。
  ![](https://ws1.sinaimg.cn/large/7f85b91egy1fcyigc5216j20cw09ngls)


  如果小于容忍后的横纵比的话，假设还没插完图片，就继续插。如果已经插完了图片，这里我们可以选择是否铺满一行，还是就让他这样。这个时候我们的高度就是原始设定的高度。

  详细代码实现请参考 [rrrow.js](https://github.com/DrakeLeung/demo/blob/gh-pages/toys%2Fjjjustify%2Frrrow.js) 的 `addItem()` 方法。
