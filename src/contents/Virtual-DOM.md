---
title: 迷之前端轮子 - 实现一个简单的 Virtual DOM
author: Drake Leung
tags: []
categories: []
date: 2016-01-31 13:30:49
foreword: 然而我并没有实现React Diff算法，因为不会= =
---

最近实现了一个简单版的[Virtual DOM](https://github.com/DrakeLeung/little-virtual-DOM)。
之所以简单，是因为并没有实现React的diff算法，不过我们还是可以了解一下Virtual DOM。

## What
*Virtual DOM* 其实就是用JS对象去表示DOM元素。
![](https://ws1.sinaimg.cn/large/7f85b91egy1fcyigca4qoj20bj04ywed)

## Why

比如，我们要添加5个`<li>`：
```javascript
const appendElement =
  type =>
    () =>
      document.body.appendChild(document.createElement(type))

Array.from(Array(5)).forEach(appendElement('li'))
```
上面每次生成一个`li`就插入，这样是很慢的。正确的做法应该是先生成5个`li`，然后再一次性把这个5个`li`插入。这个过程，我们就可以使用Virtual DOM来实现。

## How
总共分4个步骤，如下图所示：
![](https://ws1.sinaimg.cn/large/7f85b91egy1fcyigc53sij20b3041gli)

### VNode
`VNode`这个函数是用JavaScript对象来表示DOM元素，比如：

```html
<li id="item1">Call Me Item 1</li>
```

可以表示为:

```javascript
{
  type: 'li',
  props: {
    id: 'item1'
  },
  children: ['item1']
}
```

当然，`props`可以是数组，`children` 也可以放在`props`里面。

### toHTML
这个就是把`VNode`转化成真正的DOM元素。

```javascript
//
// 大体分3步
//

// Step 1: createElement
const node = document.createElement(type)

// Step 2: set props
Object.keys(props).forEach(prop => {
  node.setAttribute(prop, props[prop])
})

// Step 3: set children
children.forEach(VChild => {
  let childNode

  // if text
  if (typeof VChild === 'string') {  // #0
    childNode = document.createTextNode(VChild)
  } else {
    childNode = createNode(VChild)
  }

  node.appendChild(childNode)
})

return node
```
在`#0`中，如果当前node是`string`的话，就表明是`text`。否则进行递归。

### Diff
`diff`需要把新的Virtual DOM和旧的进行比较，从而得到变化的地方。
这个过程最难的了。我没用实现React的diff算法，只是对同级元素进行了比较而已。

![diff](https://ws1.sinaimg.cn/large/7f85b91egy1fcyigcblnij20ea06xgm1)

主要有不同的4种情况:
```javascript
export const TEXT = 'TEXT'
export const PROPS = 'PROPS'
export const REPLACE = 'REPLACE'
export const ADD_CHILD = 'ADD_CHILD'
```

- `TEXT`: 替换旧的`text`
- `PROPS`: 表明`props`可能是增加，删除或修改
- `REPLACE`: 替换旧的节点，包括删除的
- `ADD_CHILD`: 表示需要增加child

实现过程不讲述，详细看源代码([diff](https://github.com/DrakeLeung/little-virtual-DOM/blob/master/src%2Fdiff.js))

### Patch
这个过程把上个步骤得到的`diff`来给当前的DOM节点进行操作。这个过程就是我们优化DOM操作的地方。

```javascript
const applyPatch = (node, currentPatch) => {
  switch (currentPatch.type) {
    case patchType.TEXT:
      node.nodeValue = currentPatch.content
      break

    case patchType.PROPS:
      setProps(node, currentPatch.props)
      break

    case patchType.REPLACE:
      if (isExist(currentPatch.node)) {
        node.parentNode.replaceChild(toHTML(currentPatch.node), node)
      } else {
        node.parentNode.removeChild(node)
      }
      break

    case patchType.ADD_CHILD:
      node.appendChild(toHTML(currentPatch.node))
      break

    default:
  }
}
```

## Wrap up
从实现这个简单的Virtual DOM，思路确实是打开了不少。

- 用JavaScript对象来表示DOM元素。之前只会直接操作DOM，没有想到可以这样玩。
- 怎么比较2棵树的不同？只需要比较同级的元素。虽然还是不会比较children
- 复习了DOM的一些知识。

所以**多尝试**不同的东西，思路会扩展不少~

## Resource
- [React (Virtual) DOM Terminology](https://gist.github.com/sebmarkbage/fcb1b6ab493b0c77d589)
- [Understanding-react-and-reimplementing-it-from-scratch-part-1](https://gcanti.github.io/2014/10/29/understanding-react-and-reimplementing-it-from-scratch-part-1.html)
- [怎么更好地理解虚拟DOM](https://www.zhihu.com/question/29504639)
- [如何实现一个Virtual DOM算法](https://github.com/livoras/blog/issues/13)
