---
title: 这次是对 Presentational and Container component 的思考
date: '2018-06-11'
draft: false
---

如果你看过 [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) 这篇文章，并且实战过的话，你很容易会发现一些问题的。

## Prop Drilling

首先，Presentational 的数据只[通过 props 传入](https://redux.js.org/basics/usage-with-react#presentational-and-container-components) ，但是大多数时候我们的组件都会嵌套很多层，这个时候 props 就要一层一层地传下去，这个问题怎么解决呢？（通常遇到这个问题的话，我们会使用 Provider Pattern 来解决，但这里先不讲）

## 该不该嵌套

但实际上，造成这个问题的原因是「我们默认 Presentational Component 只能嵌套 Presentational ，不能嵌套 Container 」，但实际上，我们是允许 Presentational Component 嵌套 Container Component 的。
（看 [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) 的 footnote ）

但是这样的话会[造成另外一些问题](https://medium.com/@lars.jagare/pure-components-ftw-63e6e6c733f0)，比如 Presentational Component 的名字还有什么意义，并且在测试这种 Mixed Component（Presentational 嵌套 Container）会变得难一些。我们是不是应该保持 Presentational Component 的 Pure 呢？


## 也就是我们要

其实这是一种 trade-off 。

总的来说，当我们发现[父组件需要重复地传 props 给子组件](https://redux.js.org/faq/react-redux#should-i-only-connect-my-top-component-or-can-i-connect-multiple-components-in-my-tree)的时候（看 redux 文档还是可以学到很多东西，即使你不使用 redux ），就可以提取新的 Container 了。

这其实很容易联想到 redux 的使用。是不是整个 App 都应该全部都使用 redux ，还是需要跨组件共享状态的时候才使用。

这是不是可以说，对于某种 Pattern ，我们应该在真正需要他的时候才使用他？
