---
title: bubble sorting visually
author: Drake Leung
tags: []
categories: []
date: 2016-03-27 23:01:37
foreword: 实现一个冒泡排序的可视化。
---

TL;DR: [在线例子和相关代码请查看这里。](http://plnkr.co/edit/je2wWv?p=preview)

本文章的目的来源于知乎的一个问题：[我用js写了一个冒泡排序法，怎么用html和css把排序过程展现出来？](https://www.zhihu.com/question/41642706)

下面讲一下要解决的几个问题和 tips。

## 如何实现「交换」的动画
我觉得这个是整个应用的难点。

看了 [visual.net](http://visualgo.net/sorting.html)，他的实现是利用 CSS3 的 `transform` 函数里面的 `translate`。这似乎是不错的想法，但是我发现要用 JS 获取 `translate` 对应的值的话，[有点麻烦](http://stackoverflow.com/questions/21912684/how-to-get-value-of-translatex-and-translatey)。

接着，我又看了一个答案的[实现](http://meowtec.github.io/demo/sort-v/)。他的方法是利用 CSS 中的 `left`。而 `left` 的值是相对于设定了 `position: relative` 的 *parent*。

我不是很懂上面的方法。但是我想到了另一个方法：**`left` 是相对于他本身**。也就是设置他本身为 `position: relative` 而不是他的 *parent*。

```css
.bar {
  position: relative;
  left: 0;  /* must set, or not transition when value in falsy */
  /*transition: left 1s;*/
}
```

我之所以设置 `left` 为 `0`，是因为我们要用 CSS3 的 `transition` 实现渐变的效果。

然后，每次交换的时候，我们只需要把他当前的 `left` 加/减 柱形图的宽度。没错，这就是这种方法的「缺点」之一，我们需要用 JS 写死柱形图的宽度。

```javascript
swap () {
  // ...

  const getLeft = item =>
    parseInt(item.style.left.slice(0, -2)) || 0 // rm 'px'

  item1.style.left = `${this.barWidth + getLeft(item1)}px`
  item2.style.left = `${-this.barWidth + getLeft(item2)}px`
}
```

在交换的时候，我们要先找到对应的 DOM 元素，也就是上面代码中的 `item` 和 `item2`。

怎么找？（假设我们排序的是一堆数字）
一开始我想到了两种方法。

第一种是，根据数字，找到具有对用数字的 DOM 元素，就像这样：

```javascript
swap (value1, value2) {
  const item1 = this.el.querySelector(`[data-value='${value1}']`)
}
```

但这种方法是行不通的。为什么？
因为当有多个数字相同的时候，我们找到的 DOM 元素不一定是我们想要交换的。因为 `querySelector` 返回的总是第一个匹配的元素。

那我们在 `item1` 后面才开始找 `item2` 行不行？使用 CSS3 的 `~` 选择器。比如这样：

```javascript
swap (value1, value2) {
  const item1 = this.el.querySelector(`[data-value='${value1}']`)
  const item2 = this.el.querySelector(`[data-value='${value2}'] ~ data-value='${value2}']`)
}
```

这种方法有时可以，有时是不可以的。为什么？
因为我们的 DOM 结构根本就没有变化，只是用 CSS 的 `left` 在视觉上改变了位置而已。

因此，我们的第二种方法当然就是在交换的时候，不仅改变 `left` 的值，而且交换 DOM 的位置。

```javascript
function swapDOM(element1, element2) {
  element1.parentNode.insertBefore(element2, element1);
}
```

但是，这种方法还是行不通的。因为 `insertBefore` 会把 `element2` 从 DOM 中删掉。这样的话，就没有了「交换」的渐变效果。

果然，我们还是不能 DOM 元素。那么只能返回第一种方法。

这个时候我突然想到了 React 中循环的时候需要写上 `key` 属性。然后。。。然后只要把 `key` 和 数字绑定在一起，查找数字对应的 DOM 元素只需要使用 `key` 就行。

```javascript
// data = [64, 39, 78, 36]
this.items = data.map((d, i) => ({key: `key-${i}`, value: d}))

swap (key1, key2) {
  const item1 = this.el.querySelector(`[data-key='${key1}']`)
}
```

终于搞定了「交换」动画了，不知道有没有更好的实现方法呢？


## 为什么我的「交换」动画一瞬间就跑完了

假设我们的排序算法是这样的：

```javascript
sort () {
  const items = this.items

  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length - i - 1; j++) {
      const item1 = items[j]
      const item2 = items[j + 1]

      if (less(item2.value, item1.value)) {
        swap(j, j + 1, items)
      }
    }
  }
  return this.items
}
```

注意到，我们的 `swap` 函数是在 `for` 循环里面调用的，这是没错的。

然而我们的「交换」动画就跑完了，根本没有渐变的效果，我们想要的是等到前一个交换动画完成后，下一个才发生。为什么会这样？因为我们的两个 `for` 是瞬间就可以跑完的= =

怎么解决这个问题呢？`setInterval`？好像会把排序算法的逻辑扰乱。
突然，我想到了 jQuery 好像有个动画队列的东西。

也就是说，**我们可以把所有的动画先放在一个队列里面。然后再一个一个地出队，一个一个地调用。**

```javascript
for () {
  for () {
    if (less(item2.value, item1.value)) {
      this.queue.push(() => this.swap(item1.key, item2.key))
    }
  }
}

play () {
  const intervalId = setInterval(() => {
    if (this.queue.length === 0) {
      clearInterval(intervalId)
    } else {
      const swap = this.queue.shift()
      swap()
    }
  }, 2 * 1000)
}
```

看了知乎上的答案，这个问题还有其他实现的方法。**总的来说，就是如何解决异步编程问题。**

## Tips
可以利用 CSS 的 伪元素`::before` 以及 `attr` 函数，来实现柱形图上显示对应的数字。

```css
.bar::before {
  content: attr(data-value);
  position: absolute;
  top: -16px;
  color: #233;
}
```

## Continue

我们的代码还可以继续优化，比如接口如何设计，使得可以扩展于其他的排序算法。还有用户体验,比如，排序前中后状态的颜色都设为不同，等等。
