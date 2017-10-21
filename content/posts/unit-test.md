---
title: 敢写单元测试也是成为真正男人的变态条件
date: '2017-05-16'
draft: false
---

写过测试的人才会知道测试是多么的有用。

## Jest
[Jest](http://facebook.github.io/jest/docs/en/getting-started.html) 是一个零配置的测试工具。

如果使用了 [Babel](http://facebook.github.io/jest/docs/en/getting-started.html#using-babel) ，记得不要加 `{ module: false }` 。

```json
{
  "presets": [
    ["env", { "modules": false }
  ]
  "env": {
    "test": {
      "presets": ["env"] // remove '{ module: false }'
    }
  }
}
```

## 如何测试 fetch api

使用 [fetch-mock](https://github.com/wheresrhys/fetch-mock) 包。

```js
import 'isomorphic-fetch' // if runtime doesn't support 'fetch'
import fetchMock from 'fetch-mock'

fetchMock
  .mock('/api/hero/1', { name: 'foo' })

test('Hijack 200 fetch()', async () => {
  const res = await fetch('/api/hero').then(res => res.json())
  expect(res).toBe({ name: 'foo' })
})
```

## Snapshot Testing

🚧
