---
title: 'Scope(2)-Lexical Scope & Dynamical Scope'
author: Drake Leung
tags: [scope]
categories: [JavaScript]
date: 2015-07-18 23:52:57
foreword: 通过Lexical scope(静态作用域)以及Dynamical socpe(动态)做比较，了解JavaScript的作用域。
---

我们先来看一个例子:

```javascript
function foo() {
  var x = 42;

  function bar() {
     console.log(x);
  }
  bar();
}

foo(); // 42
```
结果并没有出乎我们的意料，就是`42`。为什么呢？`bar`函数执行的时候，要引用到`baz`的值，那么去哪里找？首先在自己的作用域里面找。噢，一下就找到了，原来是`42`。

上面这种就是**lexical scope**(或者**static scope**)。

## What is Lexical Scope
**lexical scope取决于函数是在哪里被定义的**.

在上面的例子中，`bar`被定义在`foo`里面，所以`foo`的作用域就是`bar`的lexical scope. 然后，`foo`是被定义在global里面的，所以他的lexical scope就是*global scope*.

所以在lexical scope中，查找`x`的过程如下，

1. 我们要执行`bar`函数，他要引用`x`的值。
2. 那么去哪里找`x`呢？肯定是先去自己(`bar`)的作用域找。但找不到:(
3. 接着去他的lexical scope找（也就是`foo`的作用域), 找到了，`x`是42.

是不是有点是懂非懂的样子，我们再来看看dynamical scope，做一下比较就知道了。

## What is Dynamical Scope
**dynamical Scope是取决于函数是在哪里被调用的**。

看一个例子:

```javascript
var x = 0;

function bar() {
  console.log(x);
}

function foo() {
  var x = 42;
  bar();
}

foo(); // 42
```

在上面的例子中，由于`bar`是在`foo`里面被调用的，所以`bar`的dynamical socpe就是`foo`的作用域。而`foo`是在global socpe里面被调用的，所以global scope是`foo`的dynamical scope.

所以在dynamical scope中，`x`的查找过程是:

1. `bar`被调用，他要引用`x`的值。
2. 那么去哪里找`x`呢？首先，肯定是在自己的作用域里面找，但是找不到:(
3. 看看是谁调用`bar`的，就去那里找。OK, 是`foo`。那么，我们就去`foo`的作用域找。
4. 噢，找到了。`x`是`42`.

## Summary
总的来说，lexical scope是取决于函数是在哪里被定义的。而dynamical scope是取决于函数是哪里被调用的。

而JavaScript的**name resolution**(查找变量或者函数的过程)是采用lexical scope的。但是JavaScript的`this`的值却跟dynamical scope很像。我们以后会再讲`this`。

## Resources
- [Dynamical Scope](http://c2.com/cgi/wiki?DynamicScoping)前面的解释部分。
