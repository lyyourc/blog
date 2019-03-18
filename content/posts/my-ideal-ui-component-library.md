---
title: 我理想中的 UI 组件库
date: '2019-02-08'
draft: true
---

## 自定义样式

对于公司的项目来说，一般都有自己的设计风格。所以直接采用 UI 自带的样式可能不适合。
因此，一般的大公司都有自己的 UI 库。

而我理想中的 UI 库可以说是一个基础 UI 库，只有逻辑，没有样式，因此你可以很简单的自定义样式。

举个例子：[downshift](https://github.com/downshift-js/downshift) 可以让你很简单就构建一个 autocomplete ，dropdown 等等。

## 接口定义

声明式的接口：[reakit](https://github.com/reakit/reakit) 是我目前看来最舒服的组件接口定义。

## 基础组件

受到 [@rebass/grid](https://github.com/rebassjs/grid) 的启发，我希望有一个 `Box` 组件，他可以接受任何的 CSS Properties，以及 HTML Attribute ，因为有时候我们组件样式只有1，2个，内联样式的写法是最舒服的了。

```jsx
<Box marginBottom="10px" onClick={() => {}}>
  Hello world
</Box>
```

目前最接近的是 [emotion](https://emotion.sh/docs/css-prop) 的 css props 。
写起来是差不多的，但是他会换行，可读性差了一点。

```jsx
<div css={css`
  marginBottom: 10px;
`}>
  Hello world
</div>
```

有人最近也写了一个类似的组件 [ui-box](https://github.com/segmentio/ui-box)。

然后还一个就是 `Flex` 组件了，其实就是声明式的 flexbox 。
大多数情况下 `alignItem` 应该都为 `center` ，所以把他设为默认值。

```tsx
<Flex alignItem="center">
</Flex>
```

## 主题

参考 [styled-system](https://github.com/styled-system/styled-system) 。


## 打包

充分利用 tree shaking ，做到自动按需加载。

rollup 1.0 也支持了 [code splitting](https://levelup.gitconnected.com/code-splitting-for-libraries-bundling-for-npm-with-rollup-1-0-2522c7437697) 。