title: BFC in CSS(0) - WTF
author: Drake Leung
tags: [BFC]
categories: [CSS]
date: 2015-07-25 01:21:40
description: BFC？听起来很高大上的样子~
---

看了[Understanding Block Formatting Contexts in CSS](http://www.sitepoint.com/understanding-block-formatting-contexts-in-css/)这篇文章，终于有点明白什么是BFC(Block Formatting Context)了。

## Normal Flow
**下面这句话不要忽略啊。要不然很多事情就想不通**。
> Boxes in the normal flow belong to a formatting context, which may be block or inline, but not both simultaneously. Block-level boxes participate in a block formatting context. Inline-level boxes participate in an inline formatting context.

在normal flow中的盒子都是属于formatting context的！！什么意思？
```html
<body>
  <p> I am in the formatting context</p>
  <div> I also belong to the formatting context</div>
</body>
```

在上面的例子，`p`和`div`都是在*normal flow*里面的。并且，他们都是块级元素，所以他们参与了block formatting contexts。

那么，参与了BFC又会怎么样呢？

## Block Formatting Contexts
下面的[文档](http://www.w3.org/TR/CSS21/visuren.html#block-formatting)定义了*在BFC中盒子是怎么排版的*:

> In a block formatting context, boxes are laid out one after the other, vertically, beginning at the top of a containing block. The vertical distance between two sibling boxes is determined by the 'margin' properties. Vertical margins between adjacent block-level boxes in a block formatting context collapse.

在BFC中，盒子都是按垂直方向一个挨着一个排版的，从*containing block*的顶部开始。2个sibing boxed的
垂直方向的距离是由`margin`来决定的，但此时的2个盒子的`margin`是会**collapse**(坍塌？折叠？)

那到底是怎么collapse法，我们要怎样才能解决。

## BFC引起的Collapse Margins
```html
<style>
  p {
    margin: 10px;
    background-color: lightgreen;
  }
</style>

<p> Sibling 1 </p>
<p> Sibling 2 </p>
```

上面的例子中，2个`p`的之间的`margin`只有`10px`而不是`20px(10 + 10)`。为什么？因为前面说过，

2个`p`都是在*normal flow*中，并且，他们是块级元素，所以他们会参与block formatting contexts。

又因为在BFC中，2个sibling element的垂直方面的`margin`会collapse！于是，结果取2者较大的那个。

```css
P:last-child {
  margin: 20px;
}
```

这样一来，2个`p`垂直方向的`margin`就取`20`。因为20比10大。

那么，我们如何解决margin collapse呢？答案就是**创建一个新的bfc**。

为什么可以？因为前面的文档说过: *In a block formatting....*才会发生margin collapse。
也就是说，如果**不在同一个bfc**的话，那么就不会有margin collapse。因此，我们创建新的bfc就行了。

那么，怎样才能创建新的bfc呢？

## Create a New BFC
> Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.

通过上面的[文档](http://www.w3.org/TR/CSS21/visuren.html#block-formatting)，我们可以总结出以下的情况会创建出新的BFC:

- `float`的值不为`none`
- `position`的值不为`static`或者`relative`。
- `display`的值为`table-cell`, `table-caption`, `inline-block`
- `overflow`的值不为`visible`。

举个例子:
```html
<style>
  .newBFC {
    overflow: hidden;
  }
</style>

<div class="newBFC">
  <p>I am in the BFC created by my parent tag</p>
</div>
```
上面例子中的`div`就创建了一个新的bfc。

所以，我们就可以解决margin collapse:

```html
<style>
  p {
    margin: 10px;
    background-color: lightgreen;
  }
  .newBFC {
    overflow: hidden;
  }
</style>

<p> Sibling 1 </p>
<div class="newBFC">
  <p> Sibling 2 </p>
</div>
```

## Wrap up
总的来说，BFC就是定义了块级元素是如何排版的。

另外，创建新的BFC可以解决一些问题。比如上面的*margin collapse*，还有更多的例子，我们下篇再说。
