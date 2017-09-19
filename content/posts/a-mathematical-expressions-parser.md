---
title: 不必害羞，写一个数学表达式 parser 就是了
date: '2016-07-14'
draft: false
---

更多信息可查看 [SLIDE](http://drakeleung.github.io/demo/slides/calc) 。

## 问题
我们的问题是这样子的：

> 写一个 `calculate` 函数，他的参数是一个四则运算表达式字符串，返回结果则是该参数的求值。

```javascript
calculate('1+2*3') // 7
calculate('1*(2+3)*4)') // 20

/*
 * 规则：
 * 1. 禁止 eval 及其类似物
 * 2. 禁止第三方库
 */
```

## 最简单的思路
假设字符串就是简单的 `1+2`，那么最简单的想法当然是：

> 遍历该字符串，然后根据不同的操作符，计算其结果，重复之。

然而，当字符串为 `1+2*3` 时，得到的结果是 `9` 而不是 `7` 。这是因为我们并没有考虑到**操作符的优先级**。并且，如果加上括号（`()`）的话，那么优先级就变得更加复杂。

所以啊，我们就想：

> 能不能没有优先级，按顺序就好啦，这样就简单多了。

## 逆波兰
只要努力 google 一下，我们就可以找到解决方法：

> 使用「逆波兰表达式」。

像我们平时使用的 `1 + 1` 就叫 *中缀表达式* 。而 *逆波兰*（*后缀表达式* ）则形如 `1 1 +`。

现在，我们的问题就变成了:

> 怎样把「中缀表达式」转换成「逆波兰表达式」？

## Tokenizer
第一步，我们需要做的是：

```bash
// 假设我们的字符串形如：`1+2*3-4`
// 那么就要把他转换成这样的一个数组：

[
  { type: 'number', value: 1 },
  { type: 'operator', value: '+' },
  { type: 'number', value: 2 },
  ....
]
```

*查看代码请点击 [tokenizer](https://github.com/DrakeLeung/calc/blob/master/src/tokenizer.js) 。*

## toRPN
第二步，我们要把得到的 tokens 转换成 *逆波兰* 形式。这个时候需要用到 [shunting-yard]() 算法。

*查看代码请点击 [toRPN](https://github.com/DrakeLeung/calc/blob/master/src/toRPN.js) 。*

## Calculator
第三步，也是我们最后一步。

我们需要把创建一个 **操作数栈** ，如果是操作数的话，push 到栈里去；如果是操作符的话，把栈里的前两个操作数 pop 出来，计算他们和该操作符的结果。然后把结果 push 到栈里。重复之，直到遍历完所有的 tokens 。

*查看代码请点击 [calculator](https://github.com/DrakeLeung/calc/blob/master/src/index.js) 。*

## 抽象语法树
其实，我们还能做些更有趣的事情。比如，构建一棵 AST 。做法其实和第三步差不多。

1. 创建一个 **操作数栈**
2. 遍历 tokens
3. 如果 token 为操作数，则 push 到栈里。
4. 如果 token 为操作符，则把 栈里的两个操作数 pop 出来，与该操作符形成 AST 的一个节点，接着把该节点 push 到栈里去
5. 重复之，直到遍历完 tokens

有了 AST 之后，如果我们对其分别进行前序，中序，后序遍历的话，就可以得到 **前缀表达式** ，**中缀表达式** ，以及 **后缀表达式** 。

*查看代码请点击 [parser](https://github.com/DrakeLeung/calc/blob/master/src/parser.js) 。*

## 项目源码
所有代码可查看：https://github.com/DrakeLeung/calc
