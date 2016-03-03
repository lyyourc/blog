---
title: 迷之前端轮子 - 实现 ES2015 Promise
author: Drake Leung
tags: []
categories: []
date: 2016-02-06 17:59:59
foreword: 为了更好地学习ES2015的Promise，我们不妨来从零开始实现它。
---

(所有代码请查看[GitHub tiny-promise](https://github.com/DrakeLeung/tiny-promise))

## Why
在此之前，我一直不明白 *promise* 的workflow是怎样子的。所以在使用的时候，一直很迷惑。比如，

```javascript
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('success'), 1000)
})

p1.then(msg => console.log(msg))
```

对于上面的代码，之前的我只知道`resolve`的参数`success`会传给`then`的`msg`。但是为什么呢？而且，我更没想过到底是`then`先执行呢还是`resolve`先执行？这有什么影响？

## How
那么，就让我们从零开始实现一个promise吧。


### Promise Constructor
根据[docs](http://devdocs.io/javascript/global_objects/promise)，`Promise`这个构造函数只接受一个参数，且这个参数是一个`function`。他有2个参数，分别是`resolve`和`reject`。
我们要在构造函数里面执行`executor`函数，并且传2个参数给他。

并且，我们构造函数还有一些property，比如他的状态，数据等

```javascript
function TinyPromise (executor) {
  this.state = promiseState.PENDING
  this.msg = void 0
  this.chains = [] // 在`then()`时再讲

  executor(resolve, reject)
}
```

接着，定义`resolve`和`reject`这2个传给`executor`的参数

```javascript
const resolve = function (value) {
  let self = this

  if (self.state !== promiseState.FULLFILLED) { // #0
    self.state = promiseState.FULLFILLED
    self.msg = value
  }

  notify(self) // 下面再讲
}
```

`#0`为什么要加上`if`判断呢？因为有可能`resolve`并不是异步执行的，所以在调用`then()`的时候，promise的状态已经为`fullfilled`了，所以这个时候`value`是`undefined`的。你可以自己试试。

到底`chains`是什么呢？

### Then
当调用`then`的时候，他会返回一个promise。重复之，便形成了链(chain)。因此，我们每次都把这个promise放进`this.chains`里面。

```javascript
this['then'] = (onFullfilled, onRejected) => {
  let o = {
    onFullfilled,
    onRejected
  }

  o.promise = new this.constructor((resolve, reject) => {
    o = Object.assign(o, {resolve, reject})
  })

  this.chains = [...this.chains, o]

  // doesn't call resolve or reject in executor async-ly
  if (this.state === promiseState.FULLFILLED) // #0
    resolve.call(this)
  else if (this.state === promiseState.REJECTED)
    reject.call(this)

  return o.promise
}
```
在`#0`，我们为什么需要做这个判断呢？因为在调用`then`时，promise的状态已经不是`pending`了。为什么？看看文本前面的*Why*部分。

注意到，我们把`then`的2个参数，以及`executor`的2个参数都放进了`this.chains`里面。

### Notify
`notify`函数的作用就是把`then`返回的结果传递到下一个`then`里面去。

```javascript
const handleFullfill = (chain, self) => {
  // 上一个then()的success handler的返回值
  const result = chain.onFullfilled(self.msg)
  // 传给下一个then()
  chain.resolve(result)
}

export const notify = self => {
  self.chains.forEach(chain => {
    switch (self.state) {
      case promiseState.FULLFILLED:
        handleFullfill(chain, self)
        break

      case promiseState.REJECTED:
        handleReject(chain, self)
        break
    }
  })
}
```

### Promise.resolve
这个方法`resolve`其实就是`Promise`构造函数的一个property。

```javascript
defineProp(TinyPromise, 'resolve', msg =>
  new TinyPromise((resolve, reject) => {
    resolve(msg)
  })
)

const defineProp = (
  obj = {},
  prop,
  value
) => {
  try {
    return Object.defineProperties(obj, prop, {
      value,
      writable: true,
      configurable: true,
      enumerate: true
    })
  } catch (e) {
    obj[prop] = value
    return obj
  }
}
```

## Wrap up
实现完以上，你就可以解决本文前面部分*Why*的问题了。

`then`首先会执行，因为`resolve`是异步的(`setTimeout`里面)。这时，我们把`then`的参数放在一个对象数组里面。等到`resolve`调用的时候，我们再去遍历这个数组，调用`then`的参数，并且把返回值传给下一个promise。

如果`resolve`不是异步的话，那么`resolve`比`then`先执行。在`then`执行的时候，状态已经为`fullfilled`了。因此只需要直接调用`notify`函数。

Cool~
