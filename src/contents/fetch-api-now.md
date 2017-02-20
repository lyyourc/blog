---
title: fetch api 用起来！
author: Drake Leung
tags: []
categories: []
date: 2016-08-15 00:16:49
foreword: 超级简单的 fetch 。
---

今天把 vue-resource 砍掉，换成了 [fetch](http://devdocs.io/dom/globalfetch/fetch) 。
然而，代码体积在 build 之后只是少了 2K =。=

为了兼容旧浏览器，我们将使用这个的 polyfill : [whatwg-fetch](https://github.com/github/fetch) ；如果还想兼容 node 的话：[isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) 。安装请看对应的文档。

## fetch api

最简单的 `fetch` 接口是下面这样子的：

```javascript
/**
 * fetch
 *
 * @param {string} url 
 * @param {object} config
 * @return {promise}
*/
fetch('/api/heros/, {
  method: 'GET',
})
```
更详情的请看文档啦：[globalfetch.fetch](http://devdocs.io/dom/globalfetch/fetch) 。


## 常用例子
看这个：[fetch - usage](https://github.com/github/fetch#usage) 。

## 可能遇到的坑
- 不发送 cookie
- 不 catch 404 或者 500 等 HTTP 错误状态码。

解决办法可以查看 [fetch - caveats](https://github.com/github/fetch#caveats) 。

## 拦截器

如果我们想在每个请求之前或者之后进行某些操作的话，就需要用到拦截器啦。
下面我们用到的是拦截器是 [fetch-intercept](https://github.com/werk85/fetch-intercept) 。可以去看看源码，只有 80 行不到，超级优美的代码。

如果我们想每个请求都发送 cookie 的话，就必须要设置 [credentials](https://github.com/github/fetch#sending-cookies) 。但是我不想每个请求都设置一遍，这时我们就可以用到拦截器啦。

```javascript
import fetchIntercept

fetchIntercept.register({
  request(url, config = {}) {
    const myConf = {
      credentials: 'include', // send cookie
    }

    return [
      url,
      defaults(config, myConf), // merge 2 objects
    ]
  },
})
```

同样地，我们可以简化请求的 URL 。比如说，

- `/rootHost/api/heros/`
- `/rootHost/api/coolBoys/`

这个时候我们就可以把 `/rootHost/api/` 提取出来。

```javascript
fetchIntercept.register({
  request(url, config = {}) {
    return [
     `${apiHost()}/api/${url},
     config,
    ]
  },
})

fetch('heros/')
fetch('coolBoys/')
```

类似地，我们也可以用在 GET 请求时带的 query string 。

另外，因为 fetch 不会 catch 404 等错误，所以需要我们手动设置。

```javascript
fetchIntercept.register({
  response(res) {
    if (res.status >= 200 && res.status < 300) return res
    return Promise.reject(res.statusText)
  },
})
```

可以看到使用了拦截器之后，我们的代码就变得优美多了 :)


## See Also
- [whatwg-fetch](https://github.com/github/fetch)
- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
- [fetch-intercept](https://github.com/werk85/fetch-intercept)

