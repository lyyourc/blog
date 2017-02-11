---
title: Medium 是如何加载图片的？
author: Drake Leung
tags: []
categories: []
date: 2016-03-01 17:11:29
foreword: 分析及实现 Medium 加载图片的效果。
---


## What

首先，我们来看看 Medium 加载图片的效果是怎样子的：

{% vimeo 157258221 %}

我的[博客首页](http://drakeleung.github.io/blog/)也实现了这种效果。下面我们就分析如何实现。

## How
我们随便打开 Medium 中有图片的[页面](https://medium.com/tag/javascript)，然后 *审查元素*，就可以得到：

![](/inspect.png)

简化之后得到：

```html
<section>
  <div class="placeholder"></div>
  <div class="prossiveMedia">
    <img class="img-samll">
    <canvas></canvas>
    <img class="img-large">
  </div>
</section>
```

实现的过程大致如下：

1. 使用一个 `placeholder` 来防止图片 *collapse*。
2. 先加载一个很小的图片
3. 当这个小图片加载完毕之后，把他画在 `<canvas>` 里面，然后把图片弄模糊。
4. 当大图片加载完毕之后，显示他。


## Do it

首先，HTML 结构如下：

```html
<section class="banner">
  <div class="placeholder"></div>
  <img
    class="img-small"
    src="https://cdn-images-1.medium.com/freeze/max/27/1*sg-uLNm73whmdOgKlrQdZA.jpeg?q=20"
    data-large="https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg"
   >
</section>
```

`.placeholder` 是用来撑起 `.banner` 的高度。因为如果我们想要让两张图片重叠的话，会用到 `position: absolute`，定位元素会脱离文档流，那么 `.banner` 的高度就会为 `0`。

`.img-small` 首先加载的是小图片。大图片的 URL 放在了 `data-large` 属性里面。

接下来是，CSS部分：

```CSS
.banner {
  position: relative;
  overflow: hidden;
}

.placeholder {
  padding-bottom: 66.6%;
}

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 1s linear;
}

img.loaded {
  opacity: 1;
}

.img-small {
  filter: blur(50px);
  -webkit-filter: blur(50px);
}
```

`.banner` 设置了 `relative`，所以他成为了他 children (`.placeholder`, `img`) 的 *containning block* 了。

注意到，`.placeholder` 设置了 `padding-bottom: 66.6%`。`66.6%` 是相对于他的 *containning block* 的宽度，也就是 `.banner` 的宽度。
这个值应该和 `img` 的高度一样，这样一来，`.banner` 的高度就是 `img` 的高度了。

利用 `transition` 让透明度变化有个渐变效果。

实现模糊效果是使用了 `filter: blur()`，而没有使用 `<canvas>`。

然后，JavaScript 代码部分比较简单：

```javascript
const app = (() => {
  const imgSmall = document.querySelector('.img-small')

  const loadImage = () => {
    const img = new Image()

    img.src = imgSmall.src
    img.addEventListener('load', (e) => {
      imgSmall.classList.add('loaded')
    }, false)

    const imgLarge = new Image()

    imgLarge.src = imgSmall.dataset.large
    imgLarge.addEventListener('load', (e) => {
      imgLarge.classList.add('loaded')
    }, false)

    imgSmall.parentNode.appendChild(imgLarge)
  }

  return {
    loadImage
  }

})()

app.loadImage()
```

需要注意的是，我们不能直接监听 `.img-small` 的 `load` 事件，要 `new Image`，然后赋予其 `src`，然后我们就可以监听他的 `load` 事件了。

最后，为了凸显效果，我们要禁止缓存和设置较差的网络环境。具体做法如图：

![](/network.png)

实际效果如下：
{% jsfiddle 5sLzjk99 %}

## Resources
- [How Medium does progressive image loading](https://jmperezperez.com/medium-image-progressive-loading-placeholder/)
