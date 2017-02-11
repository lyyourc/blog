---
title: 5 Ways To Make A Sticky Footer
author: Drake Leung
tags: []
categories: []
date: 2016-01-20 15:19:06
foreword: 总结一下创建Sticky Footer的5种方法。
---

*Sticky Footer*在内容展示的网站都会用到。比如blog，xx的主页等等。

## What is Sticky Footer

为了简单起见，我们不妨假设我们的`index.html`是这样的:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ways to make a sticky foote</title>
</head>
<body>
  <main></main>
  <footer></footer>
</body>
</html>
```

那么，如下面的图所示，图`a`和`b`都不是*Sticky Footer*.

![](http://ww2.sinaimg.cn/large/7f85b91egw1f0asb7siypj20go088q4x.jpg)

因为图`a`的页脚的后面还有空白部分。我们想要的应该是页脚就是在页面的最底部。

那么图`b`为什么不是呢？他不是在页面的最底部吗？没错，但是我们想要的是只有当**scroller bar**滑到最底部的时候，才会出现页脚。

像下面的图`c`和`d`才是我们的*Sticky Footer*:
![](http://ww2.sinaimg.cn/large/7f85b91egw1f0asq75p07j20gl09i0vh.jpg)

## Ways to Sticky Footer
废话少说，下面会介绍几种创建*Sticky Footer*的方法。

我们会从最简单的方法开始，但最简单的不一定是最好的，符合自己的使用场景才是最好的。最后总结每种方法的优缺点。

(P.S. 假设我们都使用上面的`index.html`所示结构)

### Flexbox
*[方法来源](https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/)*

```css
/* #0 */
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}

/* #1 */
main {
  flex: 1;
}
```

`#0`是中的`min-height: 100vh`是为了让`<main>`的高度没有大于屏幕的高度时，使得`footer`可以在页面的底部。而，`margin: 0`是去掉原本浏览器自带的`<body>`的样式。

`#1`的`flex: 1`是为了让`<main>`占满多余的空间。

### Modern Way
*[方法来源](http://mystrd.at/modern-clean-css-sticky-footer/)*

```css
/* #0 */
html {
  position: relative;
  min-height: 100%;
}

/* #1 */
body {
  margin: 0;
  margin-bottom: 100px; /* same to footer height */
}

/* #2 */
footer {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100px;
}
```

`#0`中的`position: relative`很显然是为了让`<html>`变成*containning block*，
这个在`#2`会说到。同样地，`min-height: 100%`和上面的*flexbox*方法中的`#0`一样。

`#1`的`margin-bottom`设为`100px`是和`<footer>`的高度一样的。目的是当`<body>`的内容溢出
的时候，防止`<footer>`的内容蹿到`<body>`里面。

`#2`设置了`position: absolute`，这样，`left`和`bottom`的值都是相对于`<footer>`的*containning block*来说的。
由于在`#0`设置了`<html>`的`position`为`relative`，所以`<html>`就是`<footer>`的*containning block*。

### Table Way
*[方法来源](http://codepen.io/anon/pen/zrRLVW)或者[这个](https://gist.github.com/goldsky/7322156)*

```css
html,
body {
  height: 100%;
}

body {
  margin: 0;
  display: table; /* #0 */
}
main,
footer {
  display: table-row;
}

/* #1
main {
  height: 100%;
}
*/

footer {
  height: 1px; /* #2 */
}
```

其实这个方法就是利用了`table`布局，然后设置`<footer>`的高度为`1px`(如`#2`所示)。但是我并不知道为什么。
并且，如果我把`#2`注释掉，把`#1`的注释去掉，也是work的。所以不知道设置`1px`有什么用。

### Old Way
*[方法来源](http://ryanfait.com/resources/footer-stick-to-bottom-of-page/)*

这种方法需要我们改变一下我们的`index.html`，给我们的`<main>`添加一个空白的`<div>`。
他其实是`<footer>`的*placeholder*。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ways to make a sticky foote</title>
</head>
<body>
  <main>
    <div class="push"></div> <!-- new -->
  </main>
  <footer></footer>
</body>
<html>
```
那么，对应的CSS是这样的：

```css
html, body {
  height: 100%;
}

body {
  margin: 0;
}

main {
  min-height: 100%;
  margin-bottom: -100px; /* #0 */
}

footer,
.push {
  height: 100px; /* #1 */
}
```

`#0`给`<main>`设置了`margin-bottom: -100px`。这是`<footer>`的高度的相反数。
他是为了让`<footer>`可以蹿到`<div class="push"></div>`的位置。

因为`.push`就是`<footer>`的placeholder, 显然他们的`height`必须是一样的，如`#1`所示。

其实我们还可以使用为了`:after`改进一下。因为`.push`存在的意义只是为了样式而样式，并不是页面的结构，所以也没有必要出现在`index.html`里面。因此，我们有了下面的*Old Way Plus*。

### Old Way Plus
*[方法来源](https://css-tricks.com/snippets/css/sticky-footer/)*

(注意，这个时候我们并不需要给`<main>`添加一个`<div class="push"></div>`)

```css
html, body {
  height: 100%;
}

main {
  min-height: 100%;
  /* equal to footer height */
  margin-bottom: -100px;
}

/* #0 */
main:after {
  content: "";
  display: block;
  height: 100px;
}

footer {
  height: 100px;
}
```
`#0`, 我们利用伪类`:after`来替代上面的*Old Way*的`.push`，这样就不需要给`index.html`
添加不必要的标签。

## To Sum Up
方法  | 难度   | Footer需要固定高度 | 浏览器兼容
----    | ----  | -------            |  ------
Flexbox | +  | No                 |   +
Modern way | ++ | Yes                 |  +++
Table way | ++   | No             | ++?
Old way | +++     | Yes |     +++
Old way Plus | ++ | Yes |   ++
