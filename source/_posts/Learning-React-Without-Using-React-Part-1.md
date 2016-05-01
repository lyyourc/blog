---
title: 「译」Learning React Without Using React Part 1
author: Drake Leung
tags: []
categories: []
date: 2016-03-20 13:05:34
foreword: 用 React 的组件化，单向数据流的思路，来改进一个 jQuery 实现的 todo。
---

*原文链接：[Learning React Without Using React Part 1](https://medium.com/javascript-inside/learn-the-concepts-part-1-418952d968cb#.femmquo5d)*

当我们谈起 React 的时候总是有很多疑惑。下面简单地介绍了 React 以及他的一些底层原理。

当你完成 Part1 和 Part2 之后，你会学到什么呢？你也许就会知道你为什么需要 React 以及 Redux 类似的 state container （状态管理器）。

然而，**你并不需要学习**: JSX，ES6/ES*，Webpack，Hot Reloading，也不需要理解 Virtual DOM，甚至不需要 React 本身。

那么，我们首先要做的是：

阅读 [Jquery 实现的 TodoMVC](https://github.com/tastejs/todomvc/blob/gh-pages/examples/jquery/js/app.js) 的代码。

也许你会注意到有一个叫 `render` 的方法，他会在某个事件触发或者数据更新的时候被调用。现在，我们从头来实现一个例子：当 `input` 的值改变时，调用 `render` 函数，并且更新 DOM 元素。（[点击这里可查看完整的代码](http://plnkr.co/edit/fjQbQwZpQlhd5wXoc9J8?p=preview)）

```javascript
var state = {value: null}

$('#input').on('keyup', function () {
  state.value = $(this).val().trim()
  render()
})

function render () {
  $('#output').html(state.value)
}

render()
```

我们使用一个全局变量 `state` 来同步所有的东西。也就是说，当 *input* 的值改变时会更新两样东西：

1. 更新整个应用的 `state`
2. 更新 DOM（根据应用当前的 `state` 来调用 `render` 函数）

先记住这些，我们等一下就会返回来。

现在，我们有了一个新想法：

```javascript
function output(text) {
  return '<div>' + text + '</div>'
}
```

显然，调用 `output(foo)` 就会返回 `'<div>foo</div>'`。

那么接下来：

```javascript
function h2 (text) {
  return '<h2>' + text + '</h2>'
}

function div (text) {
  return '<div>' + text + '</div>'
}

function header (text) {
  return div(h2(text))
}

console.log(header('foo') === '<div><h2>foo</h2></div>') // true
```

上面的函数都是基于一个 *text(input)* 然后返回一个 *string(text)* 。调用 `header` 的时候传入相同的参数（*input*），都会得到相同的字符串（*output*）。如果你在想思考 React 中的 **stateless functions** 的话，那么这个其实就是一个简化版。只是 Stateless functions 会返回一个 React Element 而不是一个简单的 string ，但是思路是一样的。

既然这样，我们就把这个想法应用到我们之前的例子中。我们添加了一个 `button`，用来添加 todo item 。

```javascript
var state = {items: [], id: 0}

$('#add').on('click', function (e) {
  var value = $('#input').val().trim()
  $('#input').val('')

  state.items.push({
    id: state.id++,
    text: value,
    completed: false
  })

  render()
})

$('#list').on('click', function () {
  var toggleId = parseInt($(this).attr('id'))

  state.items.forEach(function (el) {
    el.id === toggleId && (el.completed = !el.completed)
  })

  render()
})

function render () {
  var items = state.items.map(function (item) {
    var completed = item.completed ? 'completed' : ''

    return '<li class="item + ' + completed + '" id="' + item.id + '">(' +
      item.id + ') ' + item.text + '</li>'
  }).join('')

  var html = '<ul>' + items = '</ul>'

  $('#list').html(html)
}

render()
```

效果图如下。我们的应用现在可以显示所有的 todo，也可以改变每个 todo 的状态（进行中或者完成）。

![simple todo lsit](https://cdn-images-1.medium.com/max/800/1*ouOYh6bI3q_8y1XLCoVD-A.png)

在上面，我们定义了两个 `click` 事件，当他们触发时就会更新我们的 `state` 以及调用 `render` 函数。而 `render` 函数会创建一个 todo list 。 `state` 作为中间媒介，简化了事件和 DOM 元素之间的交互，而不是** 通过事件来直接操作 DOM ** （不需要定义每个 DOM 元素和每个事件以及他们之间的关系）。当某个 *action*（如 click 事件） 触发之后，`state` 就会更新，接着调用 `render` 函数，最后我们的应用就会更新。这样一来，就简化了好多复杂的交互。

上面的例子是很好的，我们不妨再来重构他。

可以看到，`render` 函数有一点乱。我们不妨创建一个函数，他接收一个参数（input），然后基于这个参数返回一个字符串（output）。

```javascript
function ItemRow (props) {
  var className = props.completed ? ' item completed' : 'item'
  return '<li className="' + className +' ">' + props.text + '</li>'
}
```

```javascript
function ItemsList (props) {
  return '<ul>' + props.items.map(ItemRow).join('') + '</ul>'
}
```

看，现在我们的 `render` 函数优美多了：

```javascript
function render () {
  $('#list').html(ItemsList({
    items: state.items
  }))
}
```

如果 `render` 函数并不知道 `state` 是什么，而是期望一个 *input* 作为参数呢？好吧，现在我们可以重构一下 `render` 函数，他期望接收一个 `props` 对象（这其实就是 React Component 所期望的。

```javascript
function render (props) {
  $('#list').html(ItemsList({
    items: props.items
  }))
}
```

现在，`render` 函数并不依赖外部的状态（state），这使得我们在调用 `render` 时可以随便传入一个 *input* ，也就意味着我们的应用重新渲染时，相同的 *input* 会有相同的 *output* 。需要注意的是，DOM 操作其实是一个 side effect，但是现在我们暂时忽略他。

把 `state` 从 `render` 函数中分离出来，可以使得我们很容易实现 `Undo/Redo`。这也意味着每当 * 当前的 state * 改变时，我们能够创建一个 history ，保存这个当前的 state 。

另外一个优化就是传一个 root node 作为参数，而不是写死在 `render` 函数里面：

```javascript
function render (props, node) {
  node.html(ItemsList({
    items: props.items
  }))
}
```

因此，我们可以这样调用 `render` 函数：

```javascript
render(state, $('#list'))
```

我们会很容易想到：当 `state` 改变的时候，能不能自动地更新应用？也就是，不用手动地调用 `render` 函数。

现在，我们来创建一个 *store* ，他的作用是当 `state` 改变之后，就立马调用 `render` 函数。下面的实现虽然简单，但也是一个 advanced state container 的雏形。

```javascript
function createStore (initialState) {
  var _state = initialState || {},
    _listeners = []

  function updateListeners (state) {
    _listeners.forEach(function (listener) {
      listener.cb(state)
    })
  }

  return {
    setState: function (state) {
      _state = state
      updateListeners(state)
    },

    getState: function () {
      return _state
    },

    onUpdate: function (name, cb) {
      _listeners.push({name: name, cb: cb})
    }
  }
}
```

现在，我们更新 `state` 只需要简单地调用 `setState` 方法。只要 `state` 一改变，我们的 `render` 函数就会被调用：

```javascript
var store = createStore(store)

store.onUpdate('rootRender', function (state) {
  render(state, $('#list'))
})
```

[点击这里可查看完整的代码](http://plnkr.co/edit/fjQbQwZpQlhd5wXoc9J8?p=preview)

** 现在我们学会了什么？ ** 我们知道了简单的单向数据流（one-way data flow）的原则。我们给 `render` 函数传了一个 `state` 参数，然后 `state` 就会像流水一样，流到 `render` 函数的每个层次中。比如，`ItemRow` 函数需要 `ItemsList` 给他传进正确的参数。

我们已经创建了多个组件（component），并且我们把这些组件组合（compose）在一起。回想一下前面的 `header` 例子，我们把 `div` 和 `h2` 函数组合成了一个 `header` 函数。并且，这些函数都是 *pure function* ，这使得所有更新都是可预测的。

并且，我们使用了 *store* 来管理我们的 `state`。

而，React 会用更好更优美的方法来实现上面这些东西。组件（组合），使用 Virtual DOM 优化渲染，单向数据流等等。

> …we can focus on examining React’s true strengths: composition, unidirectional data flow, freedom from DSLs, explicit mutation and static mental model.

From [Dan Abramov - you're missing the point of react](https://medium.com/@dan_abramov/youre-missing-the-point-of-react-a20e34a51e1a)

我们可以优化的东西还有很多，比如继续优化 state container，重构我们的 listeners，实现 undo/redo，以及更多更好的 feature。**这些东西我们都会在 Part 2 呈现**。

*原文链接：[Learning React Without Using React Part 1](https://medium.com/javascript-inside/learn-the-concepts-part-1-418952d968cb#.femmquo5d)*
