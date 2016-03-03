title: Scope(0) - What Is Scope
author: Drake Leung
date: 2015-07-06 14:51:18
tags: scope
categories: JavaScript
foreword:
  scope系列的第1篇, 主题是从编译理论知识来讲解为什么需要scope, scope又是什么, 有什么作用.
---

下面我们会学习JavaScript的scope，也就是作用域．其实很简单~  
在讲什么是scope之前，我们先讲讲为什么会有scope的存在．

## Why
我们都知道，一个程序最基本的功能就是对数据的基本操作，比如增删查改．

这个时候，我们就要用到**变量(variable)**了．那么，我们怎么知道变量是存储在哪里的，我们又是怎样获取他的
值，并且修改呢？

这个时候，我们就需要一个*特殊的地方*来存放变量，然后我们可以在这个地方
找到我们所需要的变量了．这个＊特殊的地方*就是scope．

## What
知道了为什么会有scope的存在，我们就很容易知道什么叫做scope了．个人认为的话，

> scope就是一个地方，用来存放变量的．因此，你可以通过scope来获取变量的值，
从而对这些变量进行基本的操作．

## How It Works
我们先来了解一些编译(compile)理论知识．

首先，**compile**主要分成３个步骤．

1. Lexing(Takenizing): 把一个要编译的语句分成一些有意义的taken.
    比如`var bar = 2;`会被分成`var`, `bar`, `=` `2`．

2. Parsing: 把所有的taken弄成一棵*AST*(abstract syntax tree, 抽象语法树)

3. Code Generation: 生成可执行代码

**我们需要明确的一点是: JavaScript的代码是"从上到下","一句一句"的编译然后就立马执行的.**
(注意我使用了双引号)

接下来,介绍3位好机油.分别是浏览器的Engine, Compiler, Scope.

- Engine: 负责分配任务,以及执行代码.
- Compiler: 接受Engine传递的任务,编译可执行的代码返回给Engine
- Scope: 存放变量,函数声明等.

那么,让我们通过一个例子,来看看他们是如何合作的.

```javascript
// Engine will split this statement into 2 parts:
// `var bar` and `bar = 10`.

var bar = 10;
```
Engine: 先把`var bar`交给Compiler.  
Compiler: 问问Scope有没有声明过`bar`这个变量.没有的话不管他,否则让Scope声明`bar`变量.
Scope: 我这里没有`bar`, 那我就声明吧.  

Engine: 我要开始执行`bar = 10`啦.Scope你好,请问你那里有没有`bar`这个变量?
Scope: 当然!刚才Compiler叫我声明了.
Engine: 既然你`bar`的话,那我就把`10`赋值给他咯.


## Do It
通过Scope来查找变量,函数声明等等的过程叫做`identifier looking up`.

下面，我们通过一个例子，来看看怎么一回事．

```javascript
var bar;
bar = 42;

console.log(bar);
```

在第２行代码中，我们引用了`bar`这个变量，并给他赋值了`２`.
此时，这种引用就叫做**LHS**(left hand side),也就是等号的右边．

在第３行中，我们引用了`bar`这个变量的值．此时，这个引用叫做**RHS**(right hand side)，
也就是等号的右边，准确来说是等号的非左边．

那么，LHS和RHS有什么不同呢？

LHS只是获取变量,不在乎这个变量对应的值是什么.例子中,我们只想把`42`赋值给`bar`.
还有一种情况也是`LHS`: 函数的参数.

RHS是为了获取变量的值!例子中,我们想要的就是把`bar`这个变量对应的值打印出来.

RHS如果在scope中找不到这个变量,那么就会报错: `Reference Error`.而LHS则会给`window`
这个全局变量添加一个属性,如果在没有使用`use strict`的情况下.比如:
```javascript
// 'use strict;'
foo = 10;
console.log(foo);
```
在上面的例子中,很明显在scope中是找不到`foo`这个变量的.
又由于他是LHS,所有就会有`window.foo = 10;`我们可以通过`console.log(window.hasOwnProperty('foo'))`来测试一下.
