---
title: Sorry，学会 Proxy 真的可以为所欲为
date: '2018-03-29'
draft: false
---

[Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 是 JavaScript 2015 的一个新特性，下面让我们看看他实现哪些有趣的东西。


## 更安全的枚举类型

在 JavaScript 里，我们通常用一个对象来表示枚举值。但这往往是不安全的，我们希望枚举值：

* 如果不存在的话，报错。
* 不允许动态设置，否则报错。
* 不允许删除，否则报错。

我们下面会写一个 `enum` 的函数，不过先让我们来看看他在 redux 的 action types 的应用。

```js
// enum.test.js
test('enum', () => {
  // 我们定义了俩个 action type
  const actionTypes = {
    ADD_TODO: 'add_todo',
    UPDATE_TODO: 'update_todo'
  }

  const safeActionTypes = enum(actionTypes)

  // 当读取一个不存在的枚举值时会报错
  // 因为 'DELETE_TODO' 并没有定义，所以此时会报错
  expect(() => {
    safeActionTypes['DELETE_TODO']
  }).toThrowErrorMatchingSnapshot()

  // 当删除一个枚举值时会报错
  expect(() => {
    delete safeActionTypes['ADD_TODO']
  }).toThrowErrorMatchingSnapshot()
})
```

那么，`enum` 函数怎么写呢？
很简单，只要用 Proxy 的 `get` , `set` 和 `deleteProperty` 钩子就好了。

```js
// enum.js
export default function enum(object) {
  return new Proxy(object, {
    get(target, prop) {
      if (target[prop]) {
        return Reflect.get(target, prop)
      } else {
        throw new ReferenceError(`Unknown enum '${prop}'`)
      }
    },

    set() {
      throw new TypeError('Enum is readonly')
    },

    deleteProperty() {
      throw new TypeError('Enum is readonly')
    }
  })
}
```

拓展一下的话，我们是不是可以写个[类型校验库](https://medium.com/@SylvainPV/type-safety-in-javascript-using-es6-proxies-eee8fbbbd600)，在这里我们就不展开了。

## 测试，Mock

利用 `apply` 钩子，Proxy 可以检测一个函数的调用情况。下面是一个简单的，用于单元测试的 [spy 库](http://sinonjs.org/releases/v4.4.8/spies/)。

他可以获取函数的调用次数，以及调用时的参数等。

```js
// spy.js
export function spy() {
  const spyFn = function() {}
  spyFn.toBeCalledTimes = 0
  spyFn.lastCalledWith = undefined

  return new Proxy(spyFn, {
    apply(target, thisArg, argumentsList) {
      target.toBeCalledTimes += 1
      target.lastCalledWith = argumentsList.join(', ')
    }
  })
}

// spy.test.js
const colors = ['red', 'blue']
const callback = spy()

colors.forEach(color => callback(color))

expect(callback.toBeCalledTimes).toBe(colors.length)
expect(callback.lastCalledWith).toBe(colors[1])
```

另外，用 [Proxy 写一个断言库](https://medium.com/fiverr-engineering/writing-a-js-proxy-based-assertion-function-5a7359df9f9b)也是挺方便的，这里就不展开了。


## Immutable

我们也可以利用 Proxy 在数据结构上做些操作，比如实现一个像 [immer](https://github.com/mweststrate/immer) 的 Immutable 库。

```js
import { shallowCopy } from './utils/index'

export function produce(base, producer) {
  const state = {
    base, // 原来的数据
    copy: null, // 新的，复制的数据
    modified: false, // 是否修改过
  }

  const proxy = new Proxy(state, {
    get(target, prop) {
      // 如果修改过，则返回副本数据，或者返回原来的数据
      return target.modified ? target.copy[prop] : target.base[prop]
    },

    set(target, prop, value) {
      // set 钩子的时候，设置 modified 为 true
      if (!target.modified) {
        target.modified = true
        target.copy = shallowCopy(target.base)
      }

      target.copy[prop] = value
      return true
    }
  })

  producer.call(proxy, proxy)

  return proxy
}
```

实际效果就像下面这个样子：

我们得到了新的不同的 `nextState` ，但是原来的 `baseState` 并没有发生变化。

```js
test('produce', () => {
  const baseState = {
    name: 'foo'
  }
  const nextState = produce(baseState, draft => {
    draft.name = 'bar'
  })

  expect(nextState.name).toBe('bar') // nestState 发生了变化
  expect(baseState.name).toBe('foo') // 而 baseState 保持不变
})
```


### Observe，响应式系统

用 Proxy 来实现一个 pub/sub 模式也是挺简单的。

```js
// observe.js
export function observe(target, onChange) {
  return createProxy(target, onChange)
}

function createProxy(target, onChange) {
  const trap = {
    get(object, prop) {
      const value = object[prop]

      // 这里可以优化一下，不应该每次都创建新的 proxy
      if (typeof value === 'object' && value !== null) {
        return createProxy(object[prop], onChange)
      }

      return value
    },

    set(object, prop, value, ...args) {
      onChange()
      return Reflect.set(object, prop, value, ...args)
    }
  }

  return new Proxy(target, trap)
}

// observe.test.js
test('observe', () => {
  const stub = jest.fn()
  const data = {
    user: {
      name: 'foo',
    },
    colors: ['red'],
  }

  const reactiveData = observe(data, stub)

  // push 会触发两次 set 钩子
  // 第一次把 colors 的 2 属性设置为 'blue'
  // 第二次把 colors 的 length 属性设置为 2
  reactiveData.colors.push('blue')

  reactiveData.user.name = 'baz'

  // 动态增加一个新的属性
  reactiveData.type = 'zzz'

  expect(stub).toHaveBeenCalledTimes(4)
})
```

从上面可以发现，Proxy 不仅可以代理对象，也可以代理数组；还可以代理动态增加属性如 `type` 。
这也是 `Object.defineProperty` 做不到的。

加个依赖追踪的话，我们就可以实现一个类似 Vue 或者 Mobx 的[响应式系统](https://vuejs.org/v2/guide/reactivity.html)了。

## 更多有趣的例子

我们还可以用 Proxy 实现很多东西，比如埋点可以不，性能监控可以不？

* [How to use JavaScript Proxies for Fun and Profit](https://medium.com/dailyjs/how-to-use-javascript-proxies-for-fun-and-profit-365579d4a9f8)
* [ES6 Features - 10 Use Cases for Proxy](http://dealwithjs.io/es6-features-10-use-cases-for-proxy/)
* [proxy-fun](https://github.com/mikaelbr/proxy-fun)

Proxy 的更多玩法，大家好好挖掘挖掘 👏
