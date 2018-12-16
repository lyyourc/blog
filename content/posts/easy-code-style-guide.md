---
title: 码似主人形
date: 2017-12-01
draft: false
excerpt: 快速建立代码规范与流程
---

## 事出必有因

最近，大佬需要我整理团队的代码规范和工作流程。

其实无非就两部分：代码风格 和 Git 的使用。<br />
然而，整理不是问题，问题是整理之后有没有人愿意遵守。

首先是成本问题。旧项目旧代码是否值得投入时间去迁移，性价比高不高。<br />
接着是人的问题。人都是有惰性的，代码这样写比较方便，按照规范很麻烦。

## 用户不愿意用的软件不是好软件

先不考虑成本问题，我们来解决人的惰性问题。

其实很容易解决，只要用各种 Linter 就好。Linter 没通过，不让提交代码就好。

所以我们用到了 [ESLint](eslint.org) 来约束 JavaScript 的风格，[StyleLint](stylelint.io) 来限制样式代码的风格，[commitlint](marionebl.github.io/commitlint) 来管理 git 提交信息的风格。另外，[Prettier](prettier.io) 也是必不可少的，可以处理一些 ESLint 涉及不到的代码风格。

然后弄好各种配置文件就行了。

不过，我们还要加上 git hooks ，在提交之前限制所有 lint 必须通过，否则拒绝提交。<br />
这样就可以保证提交的代码是符合规范的了，也可以减少 review PR 的工作量。

## 没有人喜欢按照教程一步步安装以及配置

接下来，我们要解决成本问题。

试想一下，每个新项目都要根据教程，安装，配置，那简直太麻烦了。
所以，我们可以把东西都封装起来，弄成一个命令就好。

```js
eleme-scripts eslint [filename..]   Lint JavaScript
eleme-scripts stylelint [filename]  Lint CSS, SCSS things
eleme-scripts pretty [filename]     Pretty JavaScript file
```

比如，使用了 `eleme-script eslint` ，用户不需要安装和配置 ESLint ，也能 lint JavaScript 代码。

另外，旧项目迁移的话，那修改的文件可能会有点多，怎么办？答案是使用 [lint-staged](https://github.com/okonet/lint-staged) ，只对 git staged files 进行 lint 。这样一来，只有需要提交的文件才对跑 lint 。

## 代码规范就是这么简单

为了更好地跑 linter ，支持编辑器插件的 lint ，以及方便用户覆盖规范好的配置 ，我们需要为用户在项目的根目录初始化上述工具的配置文件。比如，我们可以提供一个 `init` 的命令，生成各种配置文件。

搞掂 👻
