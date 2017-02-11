---
title: Scope(1) - Nested Scope
author: Drake Leung
date: 2015-07-09 18:24:19
tags: [scope, 作用域]
categories: JavaScript
foreword:
  scope系列的第2篇, 主题是嵌套作用域, 有block scope, function scope等等.
thumbnail: images/js.png
---

## What
*nested scope*就是所谓的嵌套作用域, 顾名思义就是作用域之间具有嵌套的关系.  
那么, 为什么我们需要的nested scope呢?

## Why
我们做出一下的假设:

> 从头到尾只有一个socpe, 没有什么多个, 也没有什么嵌套关系.

这样的话, 我们所有的变量声明, 函数声明都会放到这个**唯一的scope**里面去. 那么, 当数量变大的时候, 程序的性能就会降低. 比如我们要在茫茫变量中找出一个小小的变量, 这性能不就降低了吗?

为了改进他, 我们又做出了以下的假设:

> 其实不止一个socpe, 可以有多个scope. 但是scope之间美柚嵌套关系.

很容易看出, 这次的假设比第一次的好多了. 但是问题又来了, 如果2个scope所存放的变量有很多是相同的, 既然是相同的, 那么我们很容易就想到要**复用**他们. 怎么复用呢? 这个时候, 我们就给这些需要复用的scope加上一次嵌套关系:

> 外部的scope嵌套着内部的scope, 内部的scope可以使用外部的scope的变量, 但反之不行!

这样以来, 我们就可以不同scope之间就可以共用相同的变量. 这是极好的~  
但是, 我们要怎样才可以创建出多个scope呢?

## How
在JavaScript中, 有3种不同的scope. 分别是**global scope**, **block scope**以及**function scope**.

### Global Scope
global scope(全局作用域)是不需要创建的, 只要你执行JavaScript文件的话, 他就被自动创建.

他是最外层的scope. 也就是说, 他可以嵌套其他作用域, 不可以被其他scope嵌套.

在浏览器环境下, global scope可以看做为`window`这个对象.

### Block Scope
block scope(块级作用域)指的是用`{}`(大括号)创建一个scope. 也就是说, `{}`内的变量定义和声明都是属于这个`{}`所创建的scope.

在ES6中, 我们可以使用`let`这个keyword来实现

```javascript
{
  let foo = 2;
  console.log(foo); // 2
}
console.log(foo); // Reference Error
```

但是, 在ES6之前呢? 我们要怎样才能创建一个block scope呢? 一个trick就是使用`try-catch`.
```javascript
try {
  throw 2;
} catch (foo) {
  console.log(foo); // 2
}
console.log(foo);  // Error
```
在上面的例子中, `foo`这个keyword只能在`catch`块里面使用. 但是, 这种写法也太丑了. 因此, 在ES6之前可以说是没有block scope的.

## Function Scope
当执行一个函数的时候, 就会创建一个属于这个函数的作用域. 当执行完这个函数之后, 理论上这个作用域是会被垃圾回收器回收的.

```javascript
function foo () {
  var a = 42;

  function bar () {
    console.log(a);
  }
}
```
在上面的例子中, 一个有3个scope. 分别是global scope > foo > bar(`>`表示嵌套关系).  
Engine和各个scope之间的对话.

Engine: 你好`bar scope`, 我想要一个`a`的RHS, 请问你有吗?  
bar scope: 不好意思, 我没有. 你可以去问问我的外层作用域foo scope.  
Engine: 你好`foo scope`, 请问你有见过`a`吗?  
foo scope: 当然! 这就给你.
Engine: 那太好了. 既然找到的话, 我就不需要再向上层的作用域找了.  

从上面的对话中, 我们可以很容易知道: 当要查找一个变量的时候, 首先会在当前所在的作用域寻找, 如果没有找到的话, 就向上找, 直到global scope. 这个过程其实就叫做**identifier resolution**(或者identifier look-up).

接下来, 我们再来优化一下上面的例子. 例子中的`bar`函数只是为了打印一个`a`, 我们以后再也不会引用到`bar`这个变量名. 但这个变量却污染了foo scope. 有没有办法既可以打印`a`又可以不创建一个变量名呢? 答案就是利用**IIFE**(Immediately invoked function express).
```javascript
function foo () {
  var a = 42;

  (function () {
    console.log(a);
  })();
}
```
首先, 用`()`包住整个function body就表明了这个是一个expression, 接着用`()`来调用这个function expression.
对于IIFE还有其他写法, 你可以选择自己喜欢的口味~

IIFE是很常见的, 因为他在调用一个函数的同时也**避免了作用域的污染**. 这是非常值得我们学习的.

## Summary
总的来说, nested scope是为了可以共用作用域而产生的, 也就是说内部的scope可以访问外部scope. 而JavaScript有3种作用域global scope, block scope以及function scope. 其中, function scope是最主要的, 并且要懂得其中的IIFE.
