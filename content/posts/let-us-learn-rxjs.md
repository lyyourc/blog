---
title: 学不会 Rxjs 是一件很丢脸的事情
date: '2016-09-21'
draft: false
---

这是一篇 RxJS 初学者教程。


## What Is RxJS

通过**阅读[官方文档](http://reactivex.io/rxjs/manual/overview.html)**，不难得出：RxJS 可以很好**解决异步和事件组合的问题**。

这个时候我就有疑问了，异步问题不是用 Promise ( async/await ) 就好了吗?
至于事件，配合框架 ( React, Vue, Angular2 等 ) 的话不也很容易解决吗？

不管怎样, 让我们先看个 Hello World 吧。( 我要看 [DEMO](http://jsbin.com/suguho/edit?js,output) )

### Rx's Hello World

```javascript
// auto-complete
const Observable = Rx.Observable
const input = document.querySelector('input')

const search$ = Observable.fromEvent(input, 'input')
  .map(e => e.target.value)
  .filter(value => value.length >= 1)
  .throttleTime(100)
  .distinctUntilChanged()
  .switchMap(term => Observable.fromPromise(wikiIt(term)))
  .subscribe(
    x => renderSearchResult(x),
    err => console.error(err)
  )
```

上面的代码做了以下事情：

* 监听 `input` 元素的 `input` 事件
* 一旦发生，把事件对象 `e` 映射成 `input` 元素的值
* 接着过滤掉值长度小于 `1` 的
* 并且还设置了一个 `throttle` ( 节流器 )，两次输入间隔不超过 `100` 毫秒为有效输入
* 如果该值和过去最新的值相等的话，忽略他
* 最后，拿到值便调用 Wikipedia 的一个 API 
* 最后的最后，需要 `subscribe` 才能拿到 API 返回的数据


是不是看起来就觉得很 cool ，好想学！
短短几行代码就完成了一个 auto-complete 组件。


## How It Works

那上面的代码是什么意思？
RxJS 到底是如何工作的？如何解决异步组合问题的？

### Observable

Rx 提供了一种叫 **Observable** 的数据类型，兼容 ECMAScript 的 [Observable Spec Proposal](https://github.com/zenparsing/es-observable) 草案标准。他是 Rx 最核心的数据类型，结合了 [Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern)，[Iterator Pattern](https://en.wikipedia.org/wiki/Iterator_pattern) 。

那到底什么是 Observable ？

> Observable 其实就是一个**异步的数组**。*( ---> [2 minute introduction to rx](https://medium.com/@andrestaltz/2-minute-introduction-to-rx-24c8ca793877#.1q1q2mwgq) )*

不妨想像一下，**数组 + 时间轴 = Observable** 。

数组元素的值是未来某个时间点 *emit* ( 产生 ) 的，但是我们并不关心这个时间点，因为利用了「观察者模式」*subscribe* ( 订阅 ) 了这个数组，只要他 *emit* 了值，就会自动 *push* 给我们。

我们再用图来表示一下的话：

```
--a---b-c--d-----e--|-->  
```

这种图叫做 [marble diagram](http://reactivex.io/rxjs/manual/overview.html#marble-diagrams) 。
我们可以把 ASCII 的 marble 图转成 SVG 的：[ASCII -> SVG](https://jsbin.com/vumepol/1/edit?js,output) 。

`-` 表示时间轴，`a` ~ `e` 表示 emit 的值，`|` 则表示这个 stream 已经结束了。
比方说，`click` 事件用上图来表示：`a` 表示第 1 次点击，`b` 表示第 2 次点击，如此类推。

如果你觉得 Observable 这个名字不够形象不够 cool 的话，你可把他叫做 [stream](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754#reactive-programming-is-programming-with-asynchronous-data-streams) ，因为他的 marble 图就像 steam 一样。所以啊，下面我都会把 *Observable* 称作 *stream* 。


### Operators

那么，我们怎么对 stream 进行操作呢？怎么把多个 stream 组合在一起呢？

我们前面不是说了「 Observable 其实就是*异步数组*」吗？在 JavaScript 里的数组不是有很多内置的方法吗？比如 `map`, `filter`, `reduce` 等等。类似地，Observable 也有自己的方法，也就是所谓的 [operator](http://reactivex.io/rxjs/manual/overview.html#operators) 。比如上面 [Rx's Hello World](#rx-s-hello-world) 例子中的 `map`, `filter`, `throttleTime`, `distinctUntilChanged` 等等很多很有用的 operator 。

面对 RxJS 那么多 operator ，我们要怎么学习呢？很简单：

> [分类别](http://reactivex.io/rxjs/manual/overview.html#categories-of-operators) + [画 marble 图](http://reactivex.io/rxjs/manual/overview.html#marble-diagrams) + [看例子](https://www.learnrxjs.io/operators/) + [选](http://reactivex.io/rxjs/manual/overview.html#choose-an-operator)

现在，就让我们画出上面 Hello World 例子的 marble 图。

```javascript
const search$ = Observable.fromEvent(input, 'input')
  .map(e => e.target.value)
  .filter(value => value.length >= 1)
  .throttleTime(100)
  .distinctUntilChanged()
  .switchMap(term => Observable.fromPromise(wikiIt(term)))
  .subscribe(
    x => renderSearchResult(x),
    err => console.error(err)
  )
```

假设输入了 5 次，每次输入的值一次为：`a`, `ab`, `c`, `d`, `c` ，并且第 3 次输入的 `c` 和第 4 次的 `d` 的时间间隔少于 `100ms` ：

```
---i--i---i-i-----i---|--> (input)
        map

---a--a---c-d-----c---|-->
      b
        filter

---a--a---c-d-----c---|-->
      b
      throttleTime

---a--a---c-------c---|-->
      b
  distinctUntilChanged

---a--a---c----------|-->
      b
    switchMap

---x--y---z----------|-->  
```

如果我告诉你学习 **RxJS 的捷径是「学会看和画 marble 图」**，你信还是不信？ 

## Learn By Doing

现在，就让我们结合上面的知识，来实现一个简单的 canvas 画板。

根据 canvas 的 [API](http://devdocs.io/dom/canvasrenderingcontext2d/moveto) ，我们需要知道两个点的坐标，这样才能画出一条线。

### Step 1
*( 我要看 [DEMO](https://jsfiddle.net/DrakeLeung/a7h4wwcy/) )*

那么，现在我们需要做的是**创建**一个关于鼠标移动的 stream 。于是，我们**去文档找对应的 operator 类别**，也就是 [Creation Operators](http://jsbin.com/gakosun/edit?js,console,output) ，然后得到  [fromEvent](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-fromEvent) 。

```javascript
const canvas = document.querySelector('canvas')

const move$ = Rx.Observable.fromEvent(canvas, 'mousemove')
```

对应的 marble 图：
```
--m1---m1-m2--m3----m4---|-->  (mousemove)
```

接着，我们需要拿到每次鼠标移动时的坐标。也就是说：需要**变换** stream 。
对应类别的 operator 文档：[Transformation Operators](http://reactivex.io/rxjs/manual/overview.html#transformation-operators) ---> [map](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-map) 。

```javascript
const move$ = Rx.Observable.fromEvent(canvas, 'mousemove')
  .map(e => ({ x: e.offsetX, y: e.offsetX }))
```

此时的 marble 图：

```
--m1---m2-m3--m4----m5---|-->  (mousemove)
        map
--x1---x2-x3--x4----x5---|-->  (点坐标)
```

然后，怎么拿到两个点的坐标呢？我们需要再**变换**一下 stream 。
对应类别的 operator 文档：[Transformation Operators](http://reactivex.io/rxjs/manual/overview.html#transformation-operators) ---> [bufferCount](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferCount) 。

```javascript
const move$ = Rx.Observable.fromEvent(canvas, 'mousemove')
  .map(e => ({ x: e.offsetX, y: e.offsetY }))
  .bufferCount(2)
```

marble 图：

```marble
--m1---m2-m3--m4----m5---|-->  (mousemove)
        map

--x1---x2-x3--x4----x5---|-->  (点坐标)
      bufferCount(2)

-------x1-----x3----x5---|---> (两点坐标)
       x2     x4
```

然而你会发现，此时画出来的[线段是不连续的](https://jsfiddle.net/DrakeLeung/a7h4wwcy/)。为什么？我也不知道！！
那就让我们看看别人是怎么写的吧：[canvas paint](https://github.com/Reactive-Extensions/RxJS/blob/master/examples/canvaspaint/canvaspaint.js) 。

### Step 2
*( 先让我要看看 [DEMO](https://jsfiddle.net/DrakeLeung/vj368qy7/1/) )*

换了一种思路，并没有**变换** stream ，而是把两个 stream **组合**在一起。
查看文档  [Combination Operators](http://reactivex.io/rxjs/manual/overview.html#combination-operators) ---> [zip](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-zip) 以及 [Filtering Operators](http://reactivex.io/rxjs/manual/overview.html#filtering-operators) ---> [skip](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-skip)

```javascript
const move$ = Rx.Observable.fromEvent(canvas, 'mousemove')
  .map(e => ({ x: e.offsetX, y: e.offsetY }))

const diff$ = move$
  .zip(move$.skip(1), (first, sec) => ([ first, sec ]))
```

此时的 marble 图：

```marble
--x1---x2-x3--x4----x5---|-->  (move$)
        skip(1)
-------x2-x3--x4----x5---|-->  



--x1---x2-x3--x4----x5---|-->  (move$)
-------x2-x3--x4----x5---|-->  
        zip

-------x1-x2--x3----x4---|-->  (diff$)
       x2 x3  x4    x5
```

这样一来，`diff$` emit 的值就依次为 `(x1, x2)`, `(x2, x3)`，`(x3, x4)` ……
现在，鼠标移动的时候，就可以[画出美丽的线条](https://jsfiddle.net/DrakeLeung/vj368qy7/1/)。

### Step 3
*( 我想看 [DEMO](https://jsfiddle.net/DrakeLeung/vj368qy7/2/) )*

就在此时我恍然大悟，终于知道前面用 `bufferCount` 为什么不行了。我们不妨来比较一下：

```marble
-------x1-----x3----x5---|---> (bufferCount)
       x2     x4

-------x1-x2--x3----x4---|-->  (diff$)
       x2 x3  x4    x5
```

`bufferCount` emit 的值依次为：`(x1, x2)`， `(x3, x4)` …… `x2` 和 `x3` 之间是有间隔的。这就是为什么线段会不连续的原因。

然后看 [bufferCount](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferCount) 文档的话，你会发现**可以使用 `bufferCount(2, 1)` 实现同样的效果**。这样的话，我们就不需要使用 `zip` 来组合两个 stream 了。Cool ~

```javascript
const move$ = Rx.Observable.fromEvent(canvas, 'mousemove')
  .map(e => ({ x: e.offsetX, y: e.offsetX }))
  .bufferCount(2, 1)
```

此时的 marble 图：

```marble
--m1---m2-m3--m4----m5---|-->  (mousemove)
        map

--x1---x2-x3--x4----x5---|-->  (点坐标)
      bufferCount(2, 1)

-------x1-x2--x3----x4---|---> (两点坐标)
       x2 x3  x4    x5
```


## Step 4

*( 我就要看 [DEMO](https://jsfiddle.net/DrakeLeung/vj368qy7/3/) )*

接下来，我们想实现「只有鼠标按下时，才能画画，否则不能」。
首先我们需要**创建**两个关于鼠标动作的 stream 。

```javascript
const down$ = Rx.Observable.fromEvent(canvas, 'mousedown')
const up$ = Rx.Observable.fromEvent(canvas, 'mouseup')
```

当鼠标按下的时候，我们需要把他**变换**成鼠标移动的 stream ，直到鼠标放开。
查看文档  [Transformation Operators](http://reactivex.io/rxjs/manual/overview.html#transformation-operators) ---> [switchMapTo](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMapTo) 。

```javascript
down$.switchMapTo(move$)
```

此时的 marble 图：

```marble
--d---d-d-----d---d--|-->  (mousedown)
      switchMapTo

--m---m-m-----m---m--|--> 
```

此时，鼠标放开了我们还能[继续画画](https://jsfiddle.net/DrakeLeung/vj368qy7/3/)，这显然不是我们想要的。这个时候我们很容易会使用 [takeUntil](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-takeUntil) 这个 operator ，但是这是不对的，因为他会把 *stream* complete 掉。

还是让我们看看别人是怎么写的吧：[canvas paint](https://github.com/Reactive-Extensions/RxJS/blob/master/examples/canvaspaint/canvaspaint.js) 。

### Step 5

*( 我只想看 [DEMO](https://jsfiddle.net/DrakeLeung/vj368qy7/4/) )*

思路是这个样子的：

把 `up$` 和 `down$` **组合**成一个新的 stream ，但为了分辨他们，我们需要先把他们**变换**成新的 stream 。
查看文档 [Combination Operators](http://reactivex.io/rxjs/manual/overview.html#combination-operators) ---> [merge](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-merge) 。
[Transformation Operators](http://reactivex.io/rxjs/manual/overview.html#transformation-operators) ---> [map](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-map) 。

```javascript
const down$ = Rx.Observable.fromEvent(canvas, 'mousedown')
  .map(() => 'down')
const up$ = Rx.Observable.fromEvent(canvas, 'mouseup')
  .map(() => 'up')

const upAndDown$ = up$.merge(down$)
```

再来看看他们的 marble 图：

```marble
--d--d-d----d--d---|-->  (down$)
----u---u-u------u-|-->  (up$)
      merge

--d-ud-du-u-d--d-u-|-->  (upAndDown$)
```

此时，我们再**变换** `upAndDown$` 。如果是 `down` 的话，则变换成 `move$` ，否则变换成一个空的 stream 。
查看文档 [Creation Operators](http://reactivex.io/rxjs/manual/overview.html#categories-of-operators) ---> [empty](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-empty) 。
[Transformation Operators](http://reactivex.io/rxjs/manual/overview.html#transformation-operators) ---> [switchMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap) 。

```javascript
upAndDown$
  .switchMap(action =>
    action === 'down' ? move$ : Rx.Observable.empty()
  )
```

你要的 marble 图：

```marble
--d-ud-du-u-d--d-u-|-->  (upAndDown$)
    switchMap

--m-em-me-e-m--m-e-|-->
```

其实这个 canvas 画板不用 RxJS 实现也不会很难。但是当我们把他扩展成一个「你画我猜」之后，用 RxJS 处理异步就会变得简单起来。比如，添加新的工具栏 ( 调色板，撤销…… ) ，即时通信 ( 同步画板，聊天 ) ……

另外，如果你想边学习 RxJS 边实现一些小东西的话：

* [staltz - rxjs training](https://github.com/staltz/rxjs-training)
* [GitHub - Who to Follow](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
* [RxJS 4.x Example](https://github.com/Reactive-Extensions/RxJS/tree/master/examples)
* [RxJs Playground](https://github.com/JayKan/RxJS-Playground)
* [Yet Another RSS Reader](https://github.com/channikhabra/yarr)
* [rx-ifying a chat room built with reactjs and socket io](https://medium.com/front-end-hacking/rx-ifying-a-chat-room-built-with-reactjs-and-socket-io-459156b7d7ab#.bw55b1xqj)
* [angular2-hacknews](https://github.com/hdjirdeh/angular2-hn)



## Production

怎么把 RxJS 应用到实际生产的 web 应用当中呢？
怎么结合到当前流行的框架当中呢？

### Vue

你可以直接在各种 [Lifecycle Hooks](http://vuejs.org/api/#Options-Lifecycle-Hooks) 中使用 RxJS 。

比如 `created` 的时候初始化一个 Observable ，`beforeDestroy` 时就取消订阅 Observable 。( 查看[ DEMO ](http://jsbin.com/cafodu/edit?html,js,output) )

```javascript
new Vue({
  el: '#app',
  data: {
    time: ''
  },
  
  created () {
    this.timer$ = Rx.Observable.interval(1000)
      .map(() => new Date())
      .map(d => moment(d).format('hh:mm:ss'))
      .subscribe(t => {
        this.time = t
      })
  },
  
  beforeDestroy () {
    this.timer$.unsubscribe()
  }
})
```

其实已经有对应的插件 [vue-rx](https://github.com/vuejs/vue-rx) 帮我们干了上面的 dirty work 。他会分别在 `init` 和 `beforeDestroy` 的时候自动地订阅和取消订阅 Observable ：[Vue.js + RxJS binding mixin in 20 lines](https://github.com/vuejs/vue-rx/blob/master/vue-rx.js#L22-L51) 。

因此，我们可以直接把一个 Observable 写到 `data` 中：[vue-rx/example.html](https://github.com/vuejs/vue-rx/blob/master/example/example.html#L26-L65) 。


### React

类似地，React 也可以在他组件的 [lifecycle hooks](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods) 里调用 RxJS：[fully-reactive-react](https://github.com/belfz/fully-reactive-react-example) 。
也可以使用 [rxjs-react-component](https://github.com/christianalfoni/rxjs-react-component) 把 Observable 绑定到 `state` 。
如果你结合 Redux 的话，可以使用这个 [redux-oservable](https://github.com/redux-observable/redux-observable) 。


### Angular2

 RxJS 已经是 Angular2 的标配，不多说。
 更多可查看对应的文档 [Angular2 - Server Communication](https://angular.io/docs/ts/latest/guide/server-communication.html#!#rxjs) 。

更多关于 RxJS 的集成：[RxJS community](https://github.com/Reactive-Extensions/RxJS/blob/master/examples/community.md) 。

## You Might Not Need RxJS

根据 [When to Use RxJS](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/designguidelines/readme.md#21-use-rxjs-for-orchestrating-asynchronous-and-event-based-computations) ，我们可以知道 RxJS 的适用场景是：

* 多个复杂的异步或者事件组合在一起
* 处理多个数据序列（有一定顺序）

我觉得，如果你没被异步问题困扰的话，那就不要使用 RxJS 吧，因为 Promise 已经能够解决简单的异步问题了。至于 Promise 和 Observable 的区别是什么呢？可以看 [Promise VS Observable](https://www.google.com.hk/search?q=promise+vs+observable) 。

讲真，**RxJS 在实际生产中适用的业务场景有哪些**？哪些场景是需要多个异步组合在一起的？游戏吗？即时通信？还有一些特殊的业务。是我的写的业务太少了吗？还是我平时写业务的时候，为写而写，没有把他们抽象起来。

另外，我倒是对 Teambition 关于 RxJS 的思路有点感兴趣：*[xufei - 数据的关联计算 -> Brooooooklyn 评论](https://github.com/xufei/blog/issues/36#issuecomment-246662343)* & [xufei - 对当前单页应用的技术栈思考](https://github.com/xufei/blog/issues/37)。

## Summary

* RxJS 是用来解决异步和事件组合问题
* Observable = [异步数组](https://medium.com/@andrestaltz/2-minute-introduction-to-rx-24c8ca793877#.1q1q2mwgq) = 数组 + 时间轴 = stream
* Operators =  [分类别](http://reactivex.io/rxjs/manual/overview.html#categories-of-operators) + [画 marble 图](http://reactivex.io/rxjs/manual/overview.html#marble-diagrams) + [看例子](https://www.learnrxjs.io/operators/) + [选](http://reactivex.io/rxjs/manual/overview.html#choose-an-operator) 
* **更多更详细的更准确的请看[文档](http://reactivex.io/rxjs/)！**

让我们一起来学习 RxJS 吧!
