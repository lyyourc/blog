---
title: "let's-learn-RxJS"
author: Drake Leung
tags: []
categories: []
date: 2016-04-23 22:08:44
foreword:
---

## Observable 和 Generator 的区别

我们先来看一下 Generator 的例子：

```javascript
// Producer
function* baz () {
  console.log('Hello')
  yield 42
  yield 100
  yield 200
}

// Consumer
const interator = baz()
cosole.log(interator.next().value)
cosole.log(interator.next().value)
cosole.log(interator.next().value)
```

可以发现，**Consumer 决定了什么时候返回值**。这种风格叫做 *PULL* 。

在回头看看我们的 Observable ：
**Producer 决定了什么时候返回值**。这种风格叫做 *PUSH* 。

```javascript
// Producer
const bar = Rx.Observable.create(observer => {
  console.log('Hello')
  observer.next(42)
  observer.next(100)
  observer.next(200)
  setTimeout(() => {
    observer.next(3000)
  }, 1000)
})

// Comsumer
bar.subscribe(x => console.log(x))
```

## Observable 也可以抛出错误

为了提高代码的健壮性，我们通常需要 `try-catch` 我们代码可能发生的错误。

```javascript
function foo () {
  console.log('Hello')
  throw new Error('invalid something')
  return 42
}

try {
  console.log(foo.call())
} catch (err) {
  console.log(`Something wrong happened: ${err}`)
}

console.log('This here still runs')
```

那么我们怎么在 Observable 里面抛出以及捕捉错误呢？
很简单。

```javascript
const bar = Rx.Observable.create(observer => {
  try {
    console.log('Hello')
    observer.next(42)
    observer.next(100)
    observer.next(200)
    setTimeout(() => {
      observer.next(3000)
    }, 1000)
  } catch (err) {
    observer.error(new Error('bad')) // 抛出错误
  }
})

// Comsumer
bar.subscribe(
  x => console.log(x),
  err => console.log(`Something went wrong ${err}`) // 捕捉错误
)
```

## Observable can complete

我们知道，Observable 可以返回一个值，也可以抛出捕捉错误。
现在我告诉你，我们还可以指定 Observable 什么时候 complete(结束)。complete 之后，就不能再返回任何值了。

```javascript
const bar = Rx.Observable.create(observer => {
  try {
    console.log('Hello')
    observer.next(42)
    observer.complete() // complete observable
    
    // the following will not emit, 
    // because the Observable has complete
    setTimeout(() => {
      observer.next(3000)
    }, 1000)
  } catch (err) {
    observer.error(new Error('bad')) 
  }
})

bar.subscribe(
  x => console.log(x),
  err => console.log(`Something went wrong ${err}`),
  () => console.log('done') // complete callback
)

// 'Hello'
// 42
// 'done'
```

上面的例子中，并没有在 log `3000` ，因为在此之间我们的 Observable 已经 complete 了。

