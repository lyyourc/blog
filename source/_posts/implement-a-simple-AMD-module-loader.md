---
title: 实现一个简单的 AMD 模块加载器
author: Drake Leung
tags: []
categories: []
date: 2016-02-11 23:32:53
foreword: 讲一下实现过程中遇到的问题。
---

(完整代码请看[GitHub - tiny module loader](https://github.com/DrakeLeung/tiny-module-loader))

## What
不了解JavaScript模块化的请看[「译」JavaScript Modules Part1: A Beginner Guide](http://drakeleung.github.io/blog/2016/02/07/JavaScript-Module-A-Beginner-Guide/)。

简单来说，AMD规范定义了模块加载的方式是异步的而不是同步。

接着，语法是这样子的：`define`函数去请求依赖。其中，第一个参数是依赖的模块数组，第二个参数是函数。当依赖都加载完毕之后，就会作为参数，传进这个函数里面。

## Why
为了探究 AMD 模块加载器的原理，我们不妨尝试着从零开始实现他。

我们只实现一个 `define` 函数。其他后面再慢慢完善。

## How
主要分成3部分：下载依赖，执行依赖并导出，读取依赖并执行回调(递归地)。

### 下载依赖
接受一个依赖模块的URL，然后用Ajax请求。这时会返回包含文件内容的字符串。

这个很简单，只是用*Promise*简便一点而已。

```JavaScript
// getModule.js

export const fetchDeps = name =>
  new Promise((resolve, reject) => {
    let req = new XMLHttpRequest()

    req.addEventListener('load', () => {
      if (req.status < 400) resolve(req.responseText)
      else reject(req.status)
    }, false)

    req.addEventListener('error', () => {
      reject(req.status)
    }, false)

    req.open('GET', name, true)
    req.send(null)
  })
```

### 执行依赖
由于请求依赖返回的是一个字符串。但我们想要的是把这个字符串当作 JavaScript 代码来执行，解决方法有2种，分别是 `eval()` 和 `new Function()`。我们采取后者。

还有一种方法应该可以：动态创建 `<script>` 标签。

```JavaScript
// getModule.js

let currentModule = null

export const getModule = code => {
  let module = {
    exports: null,
    exported: false,
    onExport: []
  }

  currentModule = module
  new Function ('', code)() // work with eval(), as well

  return module
}

export {
  currentModule,
  getModule
}
```

这里有一个我觉得是最难的问题：由于 `new Function()` 执行的时候，是不返回东西的（其实我并不知道 `new Function` 的工作原理)。

所以，这个时候依赖虽然是请求回来并执行了，但是他依然还没有导出(`exports`)。所以，返回的 `module` 对象的 `exports` 是 `null`的。并且，我们还用了一个变量 `currentModule` 还存储当前的变量。


### 导出依赖并执行回调函数

```javascript
// myDefine.js

// import {
//   currentModule,
//   getModule
// } from './getModule'
//
// import {fetchDeps} from './fetchDeps'
// import {whenDepsExported} from './whenDepsExported'

export const define = (deps, callback) => {
  let myModule = currentModule // #0
  const getDeps = deps.map(fetchDeps)

  Promise.all(getDeps)
    .then(codes => {
      const modules = codes.map(getModule)

      // #1
      modules.forEach(m =>
        !m.exported && m.onExport.push(() =>
          whenDepsExported(callback, modules, myModule)
        )
      )

      whenDepsExported(callback, modules, myModule) // #2
    })
}
```

`#0` 我们把 `currentModule` 赋给一个局部变量，这样使得每个 `define` 都有自己的「模块」。这个也是困惑了我好久的一步。我也似懂非懂，因为反正已经 work 起来了= =

这个时候问题就来了。因为我们需要递归地加载依赖，那么，肯定是加载最外面的依赖，然后才到里面。如果没有了 `#1`，那么就会执行 `#2`，这样就会导致和想我们想要的相反，即先执行最里面的依赖的回调，再执行外面的。

因此，我们把最里面的模块先放到一个数组里面，然后当他的依赖执行完之后，再去执行他的回调，这时他的回调的参数才有值。

```JavaScript
// whenDepsExported.js

export const whenDepsExported = (cb, deps, myModule) => {
  if (!deps.every(dep => dep.exported)) return

  // params for 'callback of define'
  let args = deps.map(dep => dep.exports)
  let exports = cb.apply(null, args)

  // #0
  if (myModule) {
    myModule.exports = exports
    myModule.exported = true
    myModule.onExport.forEach(f => f())
  }

  return exports
}
```

`#0` 中，我们导出了依赖，并且执行了 `onExport` 的回调函数。

## Wrap up
原理看起来不是很难，但自己实现一遍还是挺难的。

不过 AMD，CommonJS 这些规范倒是改善了 JavaScript 模块系统，使得 JavaScript 能够在规模较大的项目中更加容易开发，以及维护。

(完整代码请看[GitHub - tiny module loader](https://github.com/DrakeLeung/tiny-module-loader))

## Resources
- [eloquent javascript - modules](http://eloquentjavascript.net/10_modules.html)
