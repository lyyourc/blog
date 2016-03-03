---
title: '「译」JavaScript Modules Part2: Module Bundling'
author: Drake Leung
tags: []
categories: [翻译]
date: 2016-02-08 15:57:07
foreword: JavaScript 模块化 Part2 - 主要讲述 module bundling。
---

**(原文：[JavaScript Modules Part 2: Module Bundling](https://medium.freecodecamp.com/javascript-modules-part-2-module-bundling-5020383cf306#.m5o3ar7dt))**



在Part 1，我讲解了什么是 *module* ，为什么要使用他们，以及合并 module 的各种方法。在Part 2，我会讲解什么是 *bundle modules* : 为什么要，不同方法的实现，以及 module 在今后web开发的情况。



## 什么是 module bundling?

简单来说，*module bundling* 其实就是把一组 module (以及他们的依赖)，按照正确的顺序，打包(bundle)到一个单独的文件(或者一组文件)里面。但是对于web开发来说，细节才是魔鬼 :)



## 为什么把所有的 module 都打包在一起？

当你把程序分成多个 module 的时候，你很可能会把他们组织在不同的文件和文件夹中。偶尔你会有第三方 module ，比如`Underscore`或者`React`。



那么，当用户浏览你的页面时，这些文件都会通过 `<script>` 标签引入到你的 HTML 文件。每个文件就需要一个 `<script>` 标签，就意味着，浏览器需要单独地加载每个文件，一个...接着...一个。



...然而这对于页面的加载时间是很不友好的。



为了解决这个问题，我们 *bundle*，或者 *concatenate* 所有的文件到一个大文件里面(或者一组文件，根据情况)，这样就可以减少请求的数量。这个就是你听别的开发人员所说的「build step」或者「build process」。



另一个加速 bundling 操作的的方法是「minify」(压缩)代码。*minification* 就是从源代码中去除不必要的字符(比如，空格，注释，换行符等)。这样一来，不仅减少了代码的大小，而且不影响其本身的功能。



更少的数据就意味着浏览器处理的时间更少，因为减少了下载文件的时间。如果你曾经见过文件名有后缀`min`，比如`underscore.min.js`，其实就是相对于完整版的一个不具可读性，压缩过的版本。



像 *gulp* 或者 *Grunt* 这样的 Task runners，对开发者来说，是很容易进行`concatenations`和`minification`。这样一来，保证了代码对开发者的可读性的同时，也保证了对浏览器的优化。



## 实现bundle module的各种方法

当你使用标准的 module pattern (前面讲解的)的其中一种来定义 module 的时候，*concatenating* 和 *minifying* 你的文件是极好的，你所需要做的就是把你的一堆JavaScript代码打包在一起。



但是，当你使用浏览器不能解析的非原生模块系统时，比如 CommonJS，AMD。你需要一种特殊的工具来把你的代码转换成浏览器可以解析的。这就是为什么 *Browserify*，*RequireJS*，*Webpack*，和其他「module bundlers」又或者「module loaders」会出现。



为了 bundling 或者 loading 你的代码，module bundlers 提供了好多额外的 feature。比如当你修改代码时自动重编译，还有提供调试时所需要的 source maps。



现在让我们来看看 module bundling 的几种方法:



### Bundling CommonJS

从 Part1 可知，CommonJS 是同步加载 module 的，这是很好的除了对浏览器不适用之外。我提到过有解决方法——其中一种就是使用 *Browserify* 。Browserify 可以给浏览器编译 CommonJS 的 module。



举个例子，我们有一个 `main.js` 文件，他 *import* 了一个可以计算数组平均值的 module:



``` javascript
var myDependency = require(‘myDependency’);
var myGrades = [93, 95, 88, 0, 91];
var myAverageGrade = myDependency.average(myGrades);
```



在这个例子中，我们有一个依赖(`myDependency`)。使用下面的命令，*Browserify* 会递归地把`main.js`前面所有需要的module打包到一个单独的文件里(`bundle.js`)：



``` javascript
	browserify main.js -o bundle.js
```



*Browserify* 的实现方法：为了遍历你整个项目的依赖，他会把每个 `require` 解析成 [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)。当他计算出你项目的依赖关系时，他就会按照正确的顺序把他们都打包在一个单独的文件里面。因此，你只需要把一个单独的，带上`bundle.js`的`<script>`标签放在你的 HTML 文件里面。这样一来，只要一个 HTTP 请求，就可以加载所有的modules。豪爽~



相似地，如果你有多个文件且有多个依赖，你只需要简单地告诉 *Browserify* 你的 `entry file`，然后坐下，*Browserify* 就会开始施魔法。



最后：准备好你打包好的文件，然后使用像 *Minify-JS* 这样的工具来压缩的你的代码。



### Bundling AMD

如果你使用AMD，也许你会使用一个像`RequireJS`或者`Curl`这样的AMD加载器。一个module loader(vs. a bundler)会动态地加载module，当你程序需要的时候。



提醒一下，AMD与CommonJS不同的地方之一是，前者是动态加载模块的。也就是说，有了AMD，你实际上不需要*build step*(打包你所有的module到一个单独文件)，因为你是动态加载module——也就是只有当你需要module的时候才去下载文件，而不是当用户第一次浏览的时候，就把所有的module都下载。



但在实际生产中，用户每次行为就需要请求下载对应的module是没有意义的。因此很多web开发者为了额外的性能，都会使用工具去打包和压缩他们的AMD modules，比如*RequireJS optimizer*，*r.js*。



总的来说，AMD和CommonJS关于bundling的区别是：前者可以不需要build step。除非，你想*push the code live*，这时你可以使用像`r.js`这样的优化器。



更多关于CommonJS和AMD的讨论，请查看这篇文章[Tom Dale’s blog](http://tomdale.net/2012/01/amd-is-not-the-answer/) :)



### Webpack

就目前的bundlers来说，*Webpack*是锋芒初现的。他可以识别任意一种模块系统，比如CommonJS，AMD或者ES6。



你也许会这样想到：既然我们已经有了Browserify和RequireJS这样的工具，为什么还需要Webpack。其实，Webpack提供了很有用的feature像**code splitting**—把你的代码拆分成动态加载的「chuncks」。



比如说，如果你的web应用有一块代码是在特定情况下才加载的，那么把所有的代码打包在一个单独的很大的文件里面就不是很适合了。在这种情况下，你可以使用*code splitting*提取代码到按需加载的*chunks*里面，这样就避免了用户首次访问时需要加载体积很大的`bundle.js`。



*Code splitting*是Webpack提供的feature之一。网上有很多讨论Webpack和Browserify的文章，不妨看下面的链接：



- [https://gist.github.com/substack/68f8d502be42d5cd4942](https://gist.github.com/substack/68f8d502be42d5cd4942)
- [http://mattdesl.svbtle.com/browserify-vs-webpack](http://mattdesl.svbtle.com/browserify-vs-webpack)
- [http://blog.namangoel.com/browserify-vs-webpack-js-drama](http://blog.namangoel.com/browserify-vs-webpack-js-drama)



## ES6 Modules

接下来我会讨论ES6 modules，他也许在未来让以上的bundlers的使用变少(等一下你就会明白我在讲什么)。首先，让我们来理解ES6 modules是如何加载的。



ES6 modules与AMD，CMD最大的不同之处在于，前者设计时考虑到了静态分析(static analysis)。这就意味着，当你`import` 模块时，这个`import`动作在编译的时候就完成了。也就是，在执行脚本之前，可以让我们移除掉不需要的`exports`。移除掉不必要的`exports`不但可以减少空间，还能减轻浏览器的压力。



那么问题来了：这个和*dead code elimination*(如使用UglifyJS去压缩代码)有什么不同？答案是：**看情况**。



(注意：*Dead code elimination*其实是移除掉不必要的代码和变量。不妨这样想：他是把你**打包后**的程序的多余的代码和变量移除掉。



有时候，*dead code elimination*在ES6 module和UglifyJS中是一样的，但有时候又不是。如果你想了解更多你可以查看在[Rollup’s wiki](https://github.com/rollup/rollup)的一个很棒的例子。



ES6不同的地方在于实现dead code elimination的方法，叫**tree shaking**。Tree shaking实际上与dead code elimination的理念是相反的。他只打包了你所必需的代码，而不是把不需要的代码移除掉。让我们来看一下tree shaking的一个例子：



假设我们有一个`util.js`文件 ，他有多个函数，我们用ES6的语法来导出他们。



``` javascript
export function each(collection, iterator) {
  if (Array.isArray(collection)) {
    for (var i = 0; i < collection.length; i++) {
      iterator(collection[i], i, collection);
    }
  } else {
    for (var key in collection) {
      iterator(collection[key], key, collection);
    }
  }
}

export function filter(collection, test) {
  var filtered = [];
  each(collection, function(item) {
    if (test(item)) {
      filtered.push(item);
    }
  });
  return filtered;
}

export function map(collection, iterator) {
  var mapped = [];
  each(collection, function(value, key, collection) {
    mapped.push(iterator(value));
  });
  return mapped;
}

export function reduce(collection, iterator, accumulator) {
  var startingValueMissing = accumulator === undefined;
  each(collection, function(item) {
    if (startingValueMissing) {
      accumulator = item;
      startingValueMissing = false;
    } else {
      accumulator = iterator(accumulator, item);
    }
  });
  return accumulator;
}
```



接下来，我们假设我们并不知道我们需要`util.js`的哪一个函数，所以，在`main.js`中我们这样引入他：



``` javascript
import * as Utils from ‘./utils.js’;
```



然后，我们开始使用其中的一个函数：



``` javascript
import * as Utils from ‘./utils.js’;

Utils.each([1, 2, 3], function(x) { console.log(x) });
```



而，`main.js`被*tree shaking*编译之后，是长这样的：



``` javascript
function each(collection, iterator) {
  if (Array.isArray(collection)) {
    for (var i = 0; i < collection.length; i++) {
      iterator(collection[i], i, collection);
    }
  } else {
    for (var key in collection) {
      iterator(collection[key], key, collection);
    }
  }
};

each([1, 2, 3], function(x) {
  console.log(x)
});
```



注意到，只有我们使用的`each`被引入了，而不是`util.js`里所有的函数。



那么，如果我们使用`filter`函数而不是`each`的话，我们的`main.js`:



``` javascript
import * as Utils from ‘./utils.js’;
Utils.filter([1, 2, 3], function(x) { return x === 2 });
```



tree shaking 编译后，`main.js`变成了这样：



``` javascript
function each(collection, iterator) {
  if (Array.isArray(collection)) {
    for (var i = 0; i < collection.length; i++) {
      iterator(collection[i], i, collection);
    }
  } else {
    for (var key in collection) {
      iterator(collection[key], key, collection);
    }
  }
};

function filter(collection, test) {
  var filtered = [];
  each(collection, function(item) {
    if (test(item)) {
      filtered.push(item);
    }
  });
  return filtered;
};

filter([1, 2, 3], function(x) {
  return x === 2
});
```



注意到这个时候,`each`和`filter`都被引入了，这是因为`filter`函数是依赖于`each`的。



很cool，对不对？



我建议你通过*Rollup.js*的 [live demo and editor](http://rollupjs.org/) ，去玩玩和了解一下tree shaking。		



## 构建ES6 modules

好的，现在我们知道了ES6 modules的加载很其他module format是不同的，但是我们还没讲怎么构建ES6 modules。



不幸的是，ES6 modules 还需要额外的工作，因为浏览器还没有实现原生的ES6 module加载。



下面有两种方法来构建/转换 ES6 modules，使得在浏览器中可以使用。其中，第一种是当前最常见的：



1. 使用转换器(比如，Babel或者Traceur)，把你ES6代码转换成CommonJS，AMD或者UMD格式的ES5代码。然后把转换好的代码送到一个module bundler里去，比如Browserify或者Webpack，这样就创建了一个或多个打包好的文件。
2. 使用[Rollup.js](http://rollupjs.org/)：这种方法和前面的很相似，除了在打包之前会使用ES6 module的静态分析。他利用**tree shaking**把最少的代码量打包。总体来说，Rollup.js比Webpack或者Browserify最大的好处是，当你使用ES6 module时，可以使你的代码的体积更小。需要注意的是，Rollup提供了多种格式来打包你的代码，包括ES6，CommonJS，AMD，CMD，UMD或者IIFE。IIFE和UMD可以适用于你的浏览器，但如果你选择了AMD，CommonJS或者ES6的话，你需要找其他方法把你的代码转成浏览器可以识别的，比如使用Browserify，Webpack，RequireJS等等。



## Jumping through hoops

作为web开发者，我们需要跳过这些繁文缛节。因为把ES6 modules代码转换成浏览器可以解释的ES5不是一件易事。



问题就是：我们可以直接在浏览器使用ES6 module，且不用弄上面说到的两种方法吗？



答案是：很快。



ECMAScript现在已经有解决方案的规范了，叫做[ECMAScript 6 module loader API](https://github.com/ModuleLoader/es6-module-loader)。简单介绍，他是一种可编程的，基于Promise的API，可以动态加载你的modules，并且cache他们，使得随后的`import`不需要加载另外一份新版本的module。



他大概是这样子的：



``` javascript
// myModule.js

export class myModule {
  constructor() {
    console.log('Hello, I am a module');
  }
  hello() {
    console.log('hello!');
  }
  goodbye() {
    console.log('goodbye!');
  }
}
```



``` javascript
// main.js

System.import(‘myModule’).then(function(myModule) {
  new myModule.hello();
});
// ‘hello!’
```



另外一种方法是，你可以直接在`script`标签里，直接注明`type=module`来定义modules。



``` javascript
< script type = "module" >
  // loads the 'myModule' export from 'mymodule.js'
  import {
    hello
  } from 'mymodule';
new Hello(); // 'Hello, I am a module!'
< /script>
```



如果你还没有看过module loader API的polyfill，我强烈建议你至少去[看一看](https://github.com/ModuleLoader/es6-module-loader)。



如果你想要测试一下这种方法的话，你可以试试[SystemJS](https://github.com/systemjs/systemjs)。他是基于[ES6 Module Loader polyfill](https://github.com/ModuleLoader/es6-module-loader)创建的。他可以在浏览器和Node环境中，动态地加载任何格式的modules(ES6 modules，AMD，CommonJS以及全局的scripts)。他会跟踪所有已经加载到「module registry」的modules，避免了重新加载已经加载过的modules。值得提醒的是，他也可以自动地转换ES6 modules(如果你开启这个option的话)，还可以从任何一种模块格式中加载任何一种格式的模块。太棒了。



## 既然我们已经有了ES6 modules，还需要bundlers吗？

ES6 modules的逐渐流行，产生了一些有趣的问题：



### HTTP/2会使module bundlers过时吗？

对于HTTP/1，我们的每个TCP连接只允许一个请求。这就是为什么加载多个资源需要多个请求。有了HTTP/2，一切都变了。HTTP/2是*fully multiplexed*，这就意味着多个请求和多个响应可以并行。这样一来，我们可以在一个TCP连接中，进行多个请求。



既然每个HTTP/2请求的开销已经比HTTP/1小得多，那么长远来看，加载一堆的modules并不会降低很多的性能。于是有些人就认为，module bundling已经不需要了。这其实是有可能的，但是我们还要视情况而定。



比如说，module bundling提供了HTTP/2没有提供的优点，像移除掉不需要的`exports`从而减少空间。如果你搭建的网页是每个微小的`bit`都会影响性能的话，那么bundling就给了你巨大的好处。另一方面，如果你对性能要求不是很高的话，你可以跳过构建过程，从而节省了一些时间。



总起来说，我们现在离享受HTTP/2带来的好处还很远。我个人猜测build process还会持续一段时间。



### CommonJS，AMD和UMD还过时吗？

一旦ES6变成了标准，那么我们真的还需要非原生的module feature吗？



我表示怀疑。



如果只遵循单一的语法去加载和引入module，并且不需要中间步骤，这对于web开发者来说很棒的。但到达这一步还需要多久呢？



机会是有的，但需要一段时间。



并且，每个人都可以根据自己的口味去选择，因此「one truthful approach」并不会成为现实。



## 结论

当开发者讨论modules和module bundling的时候，我希望这两篇文章可以帮助他们厘清这些术语。如果你有疑问的话，你回头看看[part I](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.y8hs0nsne) 。



同样地，可以在评论中和我讨论，同时随时欢迎你提问题。



Happy bundling :)


**(原文：[JavaScript Modules Part 2: Module Bundling](https://medium.freecodecamp.com/javascript-modules-part-2-module-bundling-5020383cf306#.m5o3ar7dt))**
