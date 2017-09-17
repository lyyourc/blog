---
title: 喜欢 CSS in JS 的人，我都喜欢！
date: 2017-07-22
---

CSS in JS? 什么意思，不明白。
首先，之前有遇到过 XXX in JS 吗？好像没有。
那从字面上再想想吧，在 JS 里的 CSS ？用 JS 写 CSS 吗？
之前好像听过说用 JS 写 HTML ，也就是 JSX 。那这样是不是可以说 JSX 是 HTML in JS 😂
不管他是不是，姑且认为他是吧。

用 JS 写 CSS 吗？怎么写？如果让我写的话，那只能这样子了：

```js
const el = document.querySelector('div')
el.setAttribute("style", "color: red;")
```

或者这样：

```js
const style = { div: 'color: red;' }

export default function() {
  return <div style={style}></div>
}
```

以上就是所谓的 inline styles 吧，本质上就是给 HTML Element 设置 `style` 属性。

但遗憾的是，inline styles 是无法表示所有的 CSS 选择器的。
比如，伪类，伪元素，media query 之类的。

那怎么办，有人想到了可以用某些 DOM 事件来代替某些 CSS 选择器，
举个例子，`mouseenter` 可以代替 `:hover` 。更多请参考：[How does Radium work?](https://github.com/FormidableLabs/radium#how-does-radium-work) 。

但是这样还是不能表示所有的 CSS 选择器。

既然这样的话，那就把他们都放到 `<style>` 标签里吧。没想到还有这种操作吧。
这里在占个坑，看看 [glamor 是如何实现的](https://github.com/threepointone/glamor/blob/master/docs/implementation.md)。

然而，动态地插入 `<style>` 标签还是会降低性能的，而且还不能利用缓存。i

怎么解决呢？之前的解决办法是创建出一个 CSS 文件。
那我们只需要做到把所有 `<style>` 里的样式都提取到一个 CSS 文件就好啦。
又占个坑，看看 [glam 是如何实现的](https://gist.github.com/threepointone/0ef30b196682a69327c407124f33d69a) 😂
估计借用了 Babel 的力量，完成了构建时的优化。

待填坑。。<tab>。
