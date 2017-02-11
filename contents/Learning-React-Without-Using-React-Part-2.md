---
title: 「译」Learning React Without Using React Part2
author: Drake Leung
tags: []
categories: []
date: 2016-03-22 16:12:22
foreword: 用 React 的组件化，单向数据流的思路，来改进一个 jQuery 实现的 todo。
---

*[原文链接](https://medium.com/javascript-inside/learning-react-without-using-react-part-2-703621a89432#.guh60nwi7)*

请阅读 [Part 1](http://drakeleung.github.io/blog/2016/03/20/Learning-React-Without-Using-React-Part-1/) 如果你还没有的话。

让我们继续 Part1 没讲到的东西。
我们这两篇文章主要是专注于如何重构我们的 todo list。现在，我们的实现包含了可以渲染整个应用的函数（组合），还有管理我们状态（state）的 *store*。然而，我们还有很多方法去优化我们的应用。[完整代码请查看这里](http://plnkr.co/edit/fjQbQwZpQlhd5wXoc9J8?p=preview)。

首先，我们还没有正确地处理事件。现在，我们的组件根本就没有绑定任何事件。在 React 里面，数据流是从上往下，而事件流则是从下往上（In React data flows down while events move up）。也就是说，当事件触发的时候，我们应该沿着组件链，从下往上找其对应的回调函数。比如，我们的 `ItemRow` 函数应该调用一个从 `props` 传递下来的函数。

那么，我们怎么实现呢？下面是一个小尝试：

```javascript
function ItemRow (props) {
  var className = props.completed ? 'item completed' : 'item'

  return $('<li>')
    .on('click', props.onUpdate.bind(null, props.id))
    .addClass(className)
    .attr('id', props.id)
    .html(props.text)
}
```

在上面，我们给 `list` 元素绑定了一个事件。当点击他们的时候，`onUpdate` 函数就会被调用。

现在，我们不妨定义一个函数，他可以在创建元素的时候同时为其绑定事件。

```javascript
function createElement (tag, attrs, children) {
  var elem = $('<', + tag + '>')

  for (var key in attrs) {
    var val = attrs[key]

    if (key.indexOf('on') === 0) {
      var event = key.substr(2).toLowerCase()
      elem.on(event, val)
    } else {
      elem.attr(key, val)
    }
  }

  return elem.html(children)
}
```

这样一来，我们的 `ItemRow` 函数可以写成这样：

```javascript
function ItemRow (props) {
  var className = props.completed ? 'item completed' : 'item'

  return createElement('li', {
    id: props.id,
    class: props.className,
    onClick: props.onUpdate.bind(null, props.id)
  }, props.text)
}
```

需要注意的是 React 中的 `createElement` 函数是创建了一个 JavaScript 对象来表示 DOM 元素。还有一点，让我们来看看 React 中的 JSX 语法到底是怎样子的。

下面就是一个 JSX 例子：

```JavaScript
return ( <div id='el' className='entry'> Hello </div>)
```

接着会转换成：

```javascript
var SomeElement = React.createElement('div', {
  id: 'el',
  className: 'entry'
}, 'Hello')
```

然后调用 `SomeElement` 函数会返回一个像下面差不多的 JavaScript 对象：

```javascript
{
  // ...
  type: 'div',
  key: null,
  ref: null,
  props: {
    children: 'Hello',
    className: 'entry',
    id: 'el'
  }
}
```

想要了解更多的话，请阅读 [React Components, Elements, and Instances](https://medium.com/@dan_abramov/react-components-elements-and-instances-90800811f8ca#.x2b1qra2o)

回到我们的例子中，`onUpdate` 函数是从哪里来的？

现在来看看我们的 `render` 函数。他定义了一个 `updateState` 函数，然后通过 `props` 把这个函数传给 `ItemList` 组件。

```javascript
function render (props, node) {
  function updateState (toggleId) {
    state.items.forEach(function (el) {
      if (el.id === toggleId) {
        el.completed = !el.completed
      }
    })
    store.setState(state)
  }

  node.empty().append([ItemList({
    items: props.items,
    onUpdate: updateState
  })])
}
```

然后，`ItemList` 函数会把 `onUpdate` 传到每个 `ItemRow` 。

```javascript
functions extending(base, item) {
  return $.extend({}, item, base)
}

function ItemsList (props) {
  return createElement('ul', {}, props.items
    .map(extending.bind(null, {onUpdate: props.onUpdate}))
  )
    .map(ItemRow)
}
```
通过以上我们实现了：数据流是从下往下的，而事件流是从下往上。这就意味着我们可以把定义在全局的监听器移除掉（用来监听点击 item 的时候，改变他的状态）。我们把这个函数移到了 `render` 函数里面，也就是前面所讲的 `updateState`。

** 我们还可以重构。 **

现在我们把 `input` 和 `button` 从 HTML 标签变成函数。因此，我们整个 HTML 文件就只剩下一个 `div` 。

```HTML
<div id="app"></app>
```

我们的 `input` 元素很容易创建，就这样：

```javascript
var input = createElement('input', {id: 'input'})
```

同样地，我们也可以把监听搜索框按钮点击的全局函数放在我们的 `SearchBar` 函数里面。`SearchBar` 函数会返回一个 `input` 和一个 `button` 元素，他会通过 `props` 传进来的回调函数来处理点击事件。

```javascript
functions SearchBar(props) {
  function onButtonClick (e) {
    var val = $('#input').val()
    $('#input').val('')
    props.update(val)
    e.preventDefault()
  }

  var input = createElement('input', {id: 'input'})
  var button = createElement('button', {
    id: 'add',
    onClick: onButtonClick.bind(null)
  }, 'Add')

  return createElement('div', {}, {input, button})
}
```

我们的 `render` 函数调用 `SearchBar` 的同时传递正确的 `props` 参数。在我们更新 `update` 函数之前，让我们想想 *re-render* 应该在哪里调用才是正确的。首先，忽略我们的 `store`，把注意力集中在如何在一个 high level component 中处理 *state*。

目前为止，所有的函数都是 *stateless* 的。接下来我们会创建一个函数，他会处理 *state* ，以及在适当的时候更新子组件（children）。

**Container Component**

让我们来创建一个 high level container 吧。与此同时，为了更好理解，你可以阅读 [Presentational and Container Component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.iy4tfncwt)。

首先，我们给这个 container component 取名为 `App`。他所做的事情就是调用 `SearchBar` 和 `ItemList` 函数。现在，我们继续重构 `render` 函数。其实就是把代码移到 `App` 里面去而已。

我们不妨先来看看 `render` 现在是怎样子的：

```javascript
function render (component, node) {
  node.empty().append(component)
}

render(App(state), $('#app'))
```

我们的 `render` 函数只是简单地把整个应用渲染到指定的节点中。但是，React 的实现会比这个复杂一点，而我们仅仅把一棵 element tree 添加到指定的根节点中而已。但是抽象起来理解的话，这个已经足够了。

现在，我们的 `App` 函数其实就是我们旧的 `render` 函数，除了 DOM 操作被删掉。

```javascript
function App (props) {
  function updateSearchBar (value) {
    state.items.push({
      id: state.id++,
      text: value,
      completed: false
    })
  }

  function updateState (toggleId) {
    state.items.forEach(function (el) {
      if (el.id === toggleId) {
        el.completed = !el.completed
      }
    })
    store.setState(state)
  }

  return [
    SearchBar({update: updateSearchBar}),
    ItemsList({items: props.items, onUpdate: updateState})
  ]
}
```

我们还需要改进一样东西：我们访问的 `store` 是全局的，并且重新渲染的话需要调用 `setState` 函数。

我们现在来重构 `App` 函数，使得他的子组件重新渲染的是不需要调用 `store` 。那么应该要怎么实现呢？

首先我们要忽略 `store`，并且想想怎么调用 `setState` 函数，从而使得组件和他的子组件重新渲染。

我们需要跟踪这个 high level component 当前的状态，并且只要 `setState` 一调用，就立马重新渲染。下面是一个简单的实现：

```javascript
function App (props) {
  function getInitialState (props) {
    return {
      items: [],
      id: 0
    }
  }

  var _state = getInitialState(),
    _node = null

  function setState (state) {
    _state = state
    render()
  }

  // ..
}
```

我们通过调用 `getInitialState` 来初始化我们的 `state` ，然后每当使用 `setState` 来更新状态的时候，我们会调用 `render` 函数。

而 `render` 函数要么创建一个 node，要么简单地更新 node，只要 `state` 发生改变。

```javascript
// naive implement of render

function render () {
  var children = [
    SearchBar({update: updateSearchState}),
    ItemList({
      items: _state.items,
      onUpdate: updateState
    })
  ]

  if (!_node) {
    return _node = createElement('div', {class: 'top'}, children)
  } else {
    return _node.html(children)
  }
}
```

很显然，这对性能来说是不好的。需要知道的是，React 中的 `setState` 不会渲染整个应用，而是组件和他的子组件。

下面是 `render` 函数的最新代码，我们调用 `App` 时不需要带任何参数，只是需要简单地调用 `getInitialState`返回初始的状态。

```javascript
function render(component, node) {
  node.empty().append(component);
}
render(App(), $('#app'));
```

[查看的所有的代码请点击这里](http://plnkr.co/edit/ISi8AiVuYSfFIfMy9z6t?p=preview)

**继续改进**

如果有一个函数，他会返回一个对象。这个对象包含了 `setState` 函数，还能够区分传进来 `props` 和 组件本身自己的 `state`。


差不多就像下面这样：

```javascript
var App = createClass({
  updateSearchState: function (string) { /*...*/ },

  updateState: function (obj) { /*... */ },

  render: function () {
    var children = [
      SearchBar({
        updateSearchState: this.updateSearchState
      }),
      ItemsList({
        items: this.state.items,
        onUpdate: this.updateState
      })
    ]

    return createElement('div', {class: 'top'}, children)
  }
})
```

很幸运的是，在 React 中，你可以通过调用 `React.createClass` 来创建组件。他提供了很多选择，比如 ES6 Class ，stateless function 等，[更多请查看文档](https://facebook.github.io/react/docs/reusable-components.html)。

综上，我们讲解了数据流如何从上往下，而事件从下往上。我们也看到了如何处理一个组件的状态。关于 React 的东西，还有很多要学习。下面的链接也许可以帮助到你。

**扩展阅读**

- [Thnking in React](https://facebook.github.io/react/docs/thinking-in-react.html)
- [Getting Start React](https://facebook.github.io/react/docs/getting-started.html)
- [JSX](https://medium.com/javascript-scene/jsx-looks-like-an-abomination-1c1ec351a918#.59q26eqe0)
- [React How to](https://github.com/petehunt/react-howto)
- [Removing User Interface Complexity, or Why React is Awesome](http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome)
- [Presentational and Container Component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.kcyewm6ab)
- [React Component, Elements, and Instances](https://medium.com/@dan_abramov/react-components-elements-and-instances-90800811f8ca#.xis6z3p1z)

**结尾语**

本来打算在这篇文章讲解如何创建一个 *advanced state container* ，实现 *undo/redo* 以及更多 feature ，但是我认为已经超出了这篇文章的范围。

如果大家有兴趣的话，我也许会写 Part 2.1。

*[原文链接](https://medium.com/javascript-inside/learning-react-without-using-react-part-2-703621a89432#.guh60nwi7)*
