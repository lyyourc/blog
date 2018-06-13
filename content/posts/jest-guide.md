---
title: '2017 不写单元测试，2018 还是要写的！'
date: '2017-12-29'
author: lyyourc
draft: true
---

# 2017 不写单元测试，2018 还是要写的！

## 写测试之前先

准备用 [Jest](https://facebook.github.io/jest/) 写单元测试，所以想封装起来，然后就可以说是「零配置单元测试」啦 😂 ，顺便加到 [fin-scripts](https://github.elenet.me/fe/fin-scripts) 上。

实现就很简单。

首先，Jest 有暴露出 [run](https://github.com/facebook/jest/blob/v20.0.4/packages/jest-cli/src/jest.js) 这个 API ，所以直接调用就好了。

```js
import Jest from 'jest'
import jestConfig from 'path/to/jestConfig'

// 如果你在 require 之后需要修改 jestConfig 的话
// 可以 JSON.stringify 一下 jest 的配置
const config = ['--config', JSON.stringify(jestConfig)]
const options = process.argv.slice(3)

Jest.run([...config, ...options])
```

接着，我们写好一些常用的 jest 配置就好。

```js
// jest.config.js

const { resolveUs } = require('../scripts/utils')

module.exports = {
  moduleFileExtensions: ['js', 'vue'],
  transform: {
    // 对于 .vue 文件，我们直接使用 `vue-jest` 来转换
    '.*\\.(vue)$': require.resolve('vue-jest'),

    // 对于 .js 文件，我们需要使用一个自定义的 transformer
    '^.+\\.js$': resolveUs('config/transform/babel-transform.js'),
  },
  mapCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,vue}'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
```

对于 `.js` 文件，我们需要自定义一个 transform ，因为我们打算支持 JS 现代特性，如果用户没有自定义的 `.babelrc` 的话。

很简单，直接调用 `babelJest` 的 `createTransformer` 接口就好。

```js
// babel-transform
const babelJest = require('babel-jest')
const babelConfig = require('../babelrc')

module.exports = babelJest.createTransformer(babelConfig)
```

搞定，具体代码可以查看 [feat: add 'test' script 4 unit test](https://github.elenet.me/fe/fin-scripts/pull/7/files) 👻

## 但有个问题是

[vue-jest 依赖 Babel 6](https://github.com/eddyerburgh/vue-jest/blob/master/package.json#L52)，如果我项目使用了 Babel 7 的话，就会有冲突，求解决 😭
