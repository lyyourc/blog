---
title: Scope(3)-What Is Closure
author: Drake Leung
tags: [scope, closure]
categories: [JavaScript]
date: 2015-07-19 01:58:31
foreword: 闭包其实很简单，只要你想通了lexical scope就迎刃而解了。
---

## What is Closure
什么是闭包呢？我们来下个定义吧。

> 闭包就是函数可以访问他的lexical scope，即使他是在他的lexical scope外面执行的。

先看个例子压压惊。

```javascript
function foo() {
    var x = 42;

    function bar () {
      console.log(x);
    }
    bar();
}

foo(); // 42
```
很自然而然地，上面例子输出的结果就是`42`。为什么呢？这其实就是作用域链的问题而已。
`bar`函数要引用到`x`这个变量的值。于是就在自己的作用域找，找不到。于是向上找，然后在`foo`函数的作用域就找到了。

很显然，上面的例子是符合我们对闭包定义的前半部分，**但是后半部分是不符合的**。因为`bar`的lexical scope就是`foo`的作用域，而`bar`就是在`foo`的作用域里面被调用的。

## How it Works

既然这样，我们就想办法让`bar`在`foo`的作用域外面执行。比如使用`return`.
```javascript
function foo() {
  var x = 42;

  function bar() {
    console.log(x);
  }

  return bar;
}

var baz = foo();
baz();
```
在上面的例子中，其实`baz`就是`bar`，只是名字换了而已，内容还是没有改变的。那么好，现在，`bar`(也就是`baz`)并不是在他的lexical scope(`foo`'s scope)被调用，而是在global scope。并且，`bar`还可以访问他的lexical scope里面的`x`。所以，你可以说，**这就是闭包**。

我们再来看1个例子:
```javascript
function baz(fn) {
  fn();
}

function foo() {
  var x = 42;
  function bar() {
    console.log(x);
  }

  baz(bar);
}

foo();
```
同样地，上面的例子中，`bar`并没有在他的lexical scope(`foo`'s scope)中执行，而在是`baz`里面执行。并且，`bar`还是可以访问他的lexical scope。因此，这个也是闭包！

## More Examples
其实，闭包到处都是~

比如，一个定时器。
```javascript
function wait(msg) {
  setTimeout(function timer() {
    console.log(msg);
  }, 2 * 1000);
}
wait('I am also a closure example');
```
2秒钟之后，浏览器引擎就会在全局中调用`timer`函数。也就是说，`timer`并没有在他的lexical scope(`wait`'s scope)里面执行，但是他仍然可以访问`msg`。所以，这个也是一个闭包。

再比如，一个Event Handler.
```javascript
function submit() {
  var username = 'Drake',
    submitBtn = document.querySelector('button[type=submit]');

  submitBtn.addEventListener('click', function(event) {
    console.log(username);
  }, false);
}
```
## Loops and Closure
当闭包出现在循环中的时候，就会很容易出现问题。举个例子，

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, 1000);
}
```
上面例子中，很出乎意料地输出了5个`5`。为什么呢？原因在于:

1. 在第一个`timer`函数执行之前，已经有5个`timer`函数定义好了。
2. 当第一个`timer`执行时，他需要引用到`i`。
3. 首先他在自己的作用域找，找不到。
4. 于是向上找，因为JavaScript并没有block scope。所以向上的话就是global scope.
5. 在global scope里面找到了`i`。此时`i`为`5`（因为已经循环了5次)

是不是觉得少了点什么？如果`timer`在自己的作用域就可以找到`i`的话就好咯。或者，在中间加多一层作用域，而不用去到`global scope`里面找（因为他的`i`一定是为`5`的)

### Solution
第一种，`timer`在自己的作用域就可以找到`i`。可以利用`forEach`等循环方法。
```javascript
var aArray = ['a', 'b', 'c', 'd', 'e'];

aArray.forEach(function(item, index, array) {
  setTimeout(function timer() {
    console.log(index);
  });
});
```

第二种，在中间新增一层作用域。常用的pattern就是使用IIFE。
```javascript
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(function timer() {
      console.log(j);
    });
  })(i);
}
```
由于IIFE是立即调用的，所以每次调用的时候都传进了不同的实参。

1. 当`timer`要引用`i`的时候，现在自己的作用域里面找。找不到。
2. 然后向上找，在IIFE里面找到了，也就是形参`j`。


第三种利用`let`来创建block scope.
```javascript
for (let i = 0; i < 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  });
}
```
`let`劫持了`for`的作用域。每次循环，都会初始化一个新的`i`。

`timer`在自己的作用域找不到`i`,向上找，在`for`里面找，哈，找到了。
