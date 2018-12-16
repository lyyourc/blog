---
title: 我看 Vue Patterns 去，你就在此地，不要走动
date: 2017-11-24
draft: false
excerpt: React Patterns in Vue
---

由于项目需要组件的复用，所以想把 React 的某些 Pattern 应用到 Vue 上。

## Mixed Pattern

这个最简单，也是我们每天都用到的：业务逻辑（ logic ）和视图（ view ）放在一个独立的组件里面。

这种方法虽然简单，但是不易于测试，因为要模拟接口请求等。而且也不利于维护。

所以我们需要把 logic 和 view 分开。


## Container/View Pattern

我们可以把 logic 都放到 Container 组件里面，然后 View 只是一个简单的 dump 组件。

这个 Vue 是可以做到的。但是他的 template 语法并不支持 spread 对象到组件里面。要做到的话，需要用到 [render 函数和 JSX 语法](https://vuejs.org/v2/guide/render-function.html#ad)。

虽然 Vue 的 JSX 和 React 的又有点不一样，不过还是可行的。

```js
// UserContainer.js

import User from '../components/User'

export default {
  data() {
    return {
      isLoading: true,
      isError: false,
      user: null,
    }
  },

  render(h) {
    if (this.isError) {
      return <div> Error </div>
    } else if (this.isLoading) {
      return <div> Loading </div>
    } else {
      return <User {...{ props: this.user }}>
    }
  },
}
```

其实上 Container/View 并没有解决组件复用的问题。<br />
如果我们想要复用 container 里面的 logic 的话，就需要把 Container 里面的 View 解耦出来。


## Render Props Pattern

Vue 里面组件复用只有两种方法，[mixin](https://vuejs.org/v2/guide/mixins.html#ad) 或者 [slot](https://vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots) 。<br />
想要模仿 render props pattern 的话，需要用到 [slot-scope](https://vuejs.org/v2/guide/components.html#Scoped-Slots) 。写起来的话，就像这样：

```js
// UserContainer.js

export default {
  data() {
    return {
      isLoading: true,
      isError: false,
      user: null,
    }
  },

  render(h) {
    if (this.isError) {
      return <div> Error </div>
    } else if (this.isLoading) {
      return <div> Loading </div>
    } else {
      return this.$scopedSlots.default(this.user)
    }
  },
}
```

```html
<script>
import UserContainer from '../containers/UserContainer'
import User from '../components/User'

export default {
  render(h) {
    return (
      <UserContainer scopedSlots={
        {
          default: function(props) {
            return <User { ...{ props } }></User>
          }
        }
      } />
    )
  }
}
</script>
```

写起来虽然有点别扭，但是还是能接受的 = =


## Summary

另外，我还要 `template` 和 `JSX` 语法混用，因为 scoped CSS 需要 `.vue` 文件的写法。虽然 CSS in JS 可以解决这个问题，但是 Vue 的支持并不好。

所以，我为什么不直接写 React ？


## Must Read

* [simple react patterns](http://lucasmreis.github.io/blog/simple-react-patterns/)
