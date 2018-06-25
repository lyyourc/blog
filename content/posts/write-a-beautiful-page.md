---
title: '漂亮的页面可以令人心情愉悦'
date: '2018-06-25'
draft: false
---

一直在想，怎么才能写出漂亮的页面呢？

首先，我们要定义「漂亮的页面」是什么？
在我看来，「漂亮的页面」看了之后是可以令人心情愉悦的，其表现就是「一致性」。
一致的字体，一致的间距，一致的色彩等等。

那么，我们怎样才能表现页面的一致性呢？我们来看看 [rebass 设计](http://jxnblk.com/writing/posts/patterns-for-style-composition-in-react/)的背后。

## Stateless Functional UI Components

我们的业务组件不要写任何关于样式的代码，比如下面我们有个 `UserForm` ，

```html
<Form>
  <Input />
  <Button loading={true} />
</Form>
```

`Form` ，`Input` 等子组件都已经写好了样式，不需要在 `UserForm` 里为他们写样式。

但是，我们可以通过传入 props 来控制样式的变化，比如 `Button` 的 `loading` 状态。

并且，我们可以 compose, override 这些组件。

## Consistent UI 

我觉得，之所以我们的 UI 不一致，是因为我们没有很好地维护 UI 的基本元素。

```js
export const colors = {
  white: '#fff',
  black: '#000',
}

export const fonts = {
  text: 'Helvetica Neue',
  code: 'Consolas',
}

export const space = [
  0,
  8,
  16,
  32,
  64
]
```

像上面这样，定义 UI 的基本元素的话，我们用起来就很方便，就不存在 UI 的不一致了。

这些基本元素再抽象起来的话，就是一个「主题」。

## 声明式的响应式系统

通过 `class` 来写样式，其实我觉得是有点命令式的感觉。我们来看看 [grid-styled](https://github.com/jxnblk/grid-styled) 的响应式系统是怎样的。

```html
<Flex>
  <Box width={1/2} px={2}>
    Half width
  </Box>
  <Box width={1/2} px={2}>
    Half width
  </Box>
</Flex>
```

很清晰地，上面的代码定义个一个两列，等宽的响应式布局。

## Design System

综上所述的话，以上其实就是一个设计系统，我们可以基于此实现对应的组件库；可以参考 [styled-system](https://github.com/jxnblk/styled-system) 。

所以，怎样才能写出一个「漂亮的页面」呢？答案就是找一个设计师啦 😂
