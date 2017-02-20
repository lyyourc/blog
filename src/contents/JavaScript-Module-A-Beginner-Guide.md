---
title: '「译」JavaScript Modules Part1: A Beginner Guide'
author: Drake Leung
tags: []
categories: [翻译]
date: 2016-02-07 21:50:52
foreword: 超级详细地介绍了 JavaScript 模块化的进化历史。
---

**(原文：[JavaScript Modules: A Beginner's Guide - Preethi Kasireddy](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.4ufizwkud))**


如果你是刚接触 JavaScript 的话，像「module bundler vs. module loaders」， 「Webpack vs. Browserify」 以及「AMD vs. CommonJS」这些术语可以一下子把你搞晕。

JavaScript的模块系统(module system)也许是很吓人的，但是对于web开发者来说，理解他是很重要的。

在本文，我会使用通俗易懂的话(以及一些代码)来解释这些术语。我希望能帮助到你。

注意：为了简单起见，我会分成2部分来说：Part 1 会解释什么是 *module* 以及为什么要使用他们。Part 2 (在下周发表)会接着解释什么是 *bundle modules* 以及其实现方法。


## Part 1: 有谁可以再解释解释什么是 module 吗？

好的作者会把他们的书籍分成多个章节；好的程序员也会把他们的程序分成多个模块。

就像书的章节一样，module 只是单词(在这里，即是 code )的集合。

但是，好的模块是高度包含自己独立的功能。这让他们可以根据需求更改，删除，增加，而不扰乱整个系统。

## 为什么使用 module ？

使用modules对于大型，相互依赖的代码库来说是很多好处的。在我看来，最重要的是：

**1) 可维护性：**根据定义，module 是独立的。一个设计良好的 module 是尽可能多地减少代码的耦合，从而他能够独立地开发和改进。当一个 module 的耦合度低的时候，更新他是很容易一件事情。

回到我们书籍的例子，当你因为更新了一个章节，从而需要调整剩余章节的话，这简直是噩耗。相反，你更愿意编写章节的时候，不影响其他章节。

**2) 命名空间(namespacing)：**在 JavaScript 中，在 top-level 函数的作用域的外面的变量就是 *global* (全局)变量，全局变量即是每个人都可以 access 他们。因为这样，就很容易造成"命名空间污染”，也就是无相关的代码共享全局变量。

在毫无相关的代码中共享全局变量在开发中 [is a big no no](http://c2.com/cgi/wiki?GlobalVariablesAreBad)。

在本文的下面，我们会解释 module 可以让我们避免命名空间污染，通过为我们的变量创建私有空间。

**3) 可重用性：**我们不妨老实承认，我们过去是把一个项目的代码copy到另一个项目中。比方说，你copy了你之前项目的一些util方法到当前的项目中。

这是很浪费时间的。但是慢着，如果使用 module ，一个我们可以不断复用的 module ，这不是很好吗？

## 你是如何合并模块(incorporate modules)?

有很多方法可以在你的程序中合并模块。我们现在就来讲解他们的其中一些：

### Module Pattern

*Module pattern* 其实就是模仿 *class* 的概念(因为 JavaScript 并不真正地支持 class )，因此我们可以把公有方法，私有方法以及变量都保存在一个对象里面——这个就有点类似于 class 在其他编程语言(如 Java 或者 Python )中的使用。这可以让我们给公有方法创建 API ，然后暴露出去；并且同时可以把私有的变量和方法都封装在一个闭包作用域(closure scope)中。

有几个方法可以实现 module pattern。在第一个例子中。我会使用 *anonymous closure*。他会把我们所有的代码都放进一个匿名函数里面。(记住：在 JavaScript 中，`function` 是创建作用域的唯一方法？)

**例子一：Anonymous closure**

``` javascript
(function () {
  // We keep these variables private inside this closure scope

  var myGrades = [93, 95, 88, 0, 55, 91];

  var average = function() {
    var total = myGrades.reduce(function(accumulator, item) {
      return accumulator + item}, 0);

      return 'Your average grade is ' + total / myGrades.length + '.';
  }

  var failing = function(){
    var failingGrades = myGrades.filter(function(item) {
      return item < 70;});

    return 'You failed ' + failingGrades.length + ' times.';
  }

  console.log(failing());

}());

// ‘You failed 2 times.’
```

有了这个，我们的匿名函数就有了它自己的求值环境(evaluation environment)或者"closure"，并且我们可以立马对他求值(evaluate)。这可以让我们从 parent namespace(global) 中隐藏变量。

这种方法的好处就是，你可以在匿名函数中使用局部变量而不会 overwrite(覆盖) 已经存在的全局变量，但与此同时，你还可以 access 全局变量，就像这样：

``` javascript
var global = 'Hello, I am a global variable :)';

(function () {
  // We keep these variables private inside this closure scope

  var myGrades = [93, 95, 88, 0, 55, 91];

  var average = function() {
    var total = myGrades.reduce(function(accumulator, item) {
      return accumulator + item}, 0);

    return 'Your average grade is ' + total / myGrades.length + '.';
  }

  var failing = function(){
    var failingGrades = myGrades.filter(function(item) {
      return item < 70;});

    return 'You failed ' + failingGrades.length + ' times.';
  }

  console.log(failing());
  console.log(global);
}());

// 'You failed 2 times.'
// 'Hello, I am a global variable :)'
```

注意到在匿名函数2旁的括号是必须的，因为以关键字`function`开头的语句会被认为是 *function declaration* (记住，在 JavaScript 中，你是不能定义没有名字的function declaration。) 因此，这对括号就创建一个 *function expression*。如果不明白的话，你可以[阅读这里](http://stackoverflow.com/questions/1634268/explain-javascripts-encapsulated-anonymous-function-syntax)。

**例子二：Global import**

另一个较流行的方法是 *global import* ，就像 jQuery 一样。他有点类似于上面的　*anonymous closure*，只是现在我们把全局变量作为参数传进了匿名函数中。

``` javascript
(function (globalVariable) {

  // Keep this variables private inside this closure scope
  var privateFunction = function() {
    console.log('Shhhh, this is private!');
  }

  // Expose the below methods via the globalVariable interface while
  // hiding the implementation of the method within the
  // function() block

  globalVariable.each = function(collection, iterator) {
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

  globalVariable.filter = function(collection, test) {
    var filtered = [];
    globalVariable.each(collection, function(item) {
      if (test(item)) {
        filtered.push(item);
      }
    });
    return filtered;
  };

  globalVariable.map = function(collection, iterator) {
    var mapped = [];
    globalUtils.each(collection, function(value, key, collection) {
      mapped.push(iterator(value));
    });
    return mapped;
  };

  globalVariable.reduce = function(collection, iterator, accumulator) {
    var startingValueMissing = accumulator === undefined;

    globalVariable.each(collection, function(item) {
      if(startingValueMissing) {
        accumulator = item;
        startingValueMissing = false;
      } else {
        accumulator = iterator(accumulator, item);
      }
    });

    return accumulator;

  };

 }(globalVariable));
```

在这个例子中，`globalVariable` 在全局中唯一的一个变量。这个方法比前一个方法好的地方在于：你可以在前面就定义全局变量，这样就方便别人阅读你的代码。

**例子三：Object interface**

创建 module 的例子还有一个就是使用独立的 *object interface*，就像这样：

``` javascript
var myGradesCalculate = (function () {

  // Keep this variable private inside this closure scope
  var myGrades = [93, 95, 88, 0, 55, 91];

  // Expose these functions via an interface while hiding
  // the implementation of the module within the function() block

  return {
    average: function() {
      var total = myGrades.reduce(function(accumulator, item) {
        return accumulator + item;
        }, 0);

      return'Your average grade is ' + total / myGrades.length + '.';
    },

    failing: function() {
      var failingGrades = myGrades.filter(function(item) {
          return item < 70;
        });

      return 'You failed ' + failingGrades.length + ' times.';
    }
  }
})();

myGradesCalculate.failing(); // 'You failed 2 times.'
myGradesCalculate.average(); // 'Your average grade is 70.33333333333333.'
```

显而易见，这种方法可以让我们自己定义哪些变量/方法是私有的(例如，`myGrads`)，以及哪些变量/方法是我们想要暴露给他们的，通过 `return` 语句(比如，`average` & `failing`)。

**例子四：Revealing module pattern**

这个跟上面的方法是很相似的，除了他保证所有的变量和方法都是私有的，直到我们显式地暴露出去：

``` javascript
var myGradesCalculate = (function () {

  // Keep this variable private inside this closure scope
  var myGrades = [93, 95, 88, 0, 55, 91];

  var average = function() {
    var total = myGrades.reduce(function(accumulator, item) {
      return accumulator + item;
      }, 0);

    return'Your average grade is ' + total / myGrades.length + '.';
  };

  var failing = function() {
    var failingGrades = myGrades.filter(function(item) {
        return item < 70;
      });

    return 'You failed ' + failingGrades.length + ' times.';
  };

  // Explicitly reveal public pointers to the private functions
  // that we want to reveal publicly

  return {
    average: average,
    failing: failing
  }
})();

myGradesCalculate.failing(); // 'You failed 2 times.'
myGradesCalculate.average(); // 'Your average grade is 70.33333333333333.'
```

上面好像讲了好多东西，其实对于 module pattern 来说，只是冰山一角。下面是一些我认为比较有用的资源：

- [Learn JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript) - by *Addy Osmani*
- [Adequately Good by Ben Cherry](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html) - 通过例子讲述module pattern的高级使用
- [Blog of Carl Danley](https://carldanley.com/js-module-pattern/) - module pattern的概述以及其他 JavaScript pattern 的资源

## CommonJS and AMD

上面讲到的所有方法都有一个共同点：使用全局变量将其所有代码都封装在一个函数里面，从而使用 *closure scope* 为他自己创建出了一个私有的命名空间。

他们各自有各自的优点，但是他们也有他们的弊端。

其中一个，作为一名开发者，为了加载你的文件，你需要知道正确的依赖顺序。比如，你要在项目中使用 `Backbone`，那么你需要通过 `script` 标签来加载他的源文件。

但是，因为 `Backbone` 是依赖 `Underscore.js`，那么加载 `Backbone` 的 `script` 标签就不能在 `Underscore` 的前面。

作为一名开发者，维护依赖以及让他们的顺序都正确的话，有时是一件很头疼的事情。

另一个弊端就是他们仍然会产生命名空间冲突。比如，你的两个 module 具有相同的名字。又或者，你的一个模块有两个版本，并且你同时需要他们。

因此，你也会这样想到：能不能设计一种方法，既可以访问 module 的接口，但同时又不污染全局作用域。

其实有两种已经实现好的方法：即是 CommonJS 和 AMD 。

### CommonJS

CommonJS是一个自愿的工作小组，设计和实现 JavaScript 模块系统的 API。

一个 CommonJS 模块其实就是 `exports` 了具体对象的 JavaScript 代码块，使得他们能够被程序中的其他模块 `require` 。如果你写过 `Node.js` 的话，你应该对他很熟悉。

有了 CommonJS，每个 JavaScript 文件在他们各自唯一的 module context (就像封装在一个闭包中)保存了模块。在这个作用域里面，我们使用 `module.exports` 对象来暴露模块，使用`require`来加载他们。

当你定义了一个 CommonJS 文件，也许他就长这样子的：

``` javascript
function myModule() {
  this.hello = function() {
    return 'hello!';
  }

  this.goodbye = function() {
    return 'goodbye!';
  }
}

module.exports = myModule;
```

我们使用特殊的对象`module`，然后把我们函数的引用赋给`module.exports`。这个让CommonJS的模块系统知道我们想要暴露哪些，从而让别的文件引用。

然后，如果别人想使用我的`myModule`，他们可以引用它到文件中，像这样：

``` javascript
var myModule = require('myModule');

var myModuleInstance = new myModule();
myModuleInstance.hello(); // 'hello!'
myModuleInstance.goodbye(); // 'goodbye!'
```

这个方法比前面所讲的 *module pattern* 有2个明显的优点：

1. 避免全局命名空间的污染
2. 让我们的依赖更加清晰

而且，语法很简洁，我很喜欢。

还有一个注意的是，CommonJS是针对server实现的，并且**同步加载modules**。这是很重要的，因为如果我们有3个module需要引入，那么他会一个接着一个加载。

现在，CommonJS对于server端很极好的。但是不幸的是，他不适用于浏览器。因为在web读取一个module比在磁盘中读取慢得多。如果开始加载module，就会阻塞浏览器直到modules全部加载完毕。(我会在 Part 2 讲述解决方法)。

### AMD

CommonJS是很好，但是如果我们想要异步加载modules呢？答案就是*Asynchronous Module Definition*，即*AMD*。

使用AMD加载module就像这样：

``` javascript
define(['myModule', 'myOtherModule'], function(myModule, myOtherModule) {
  console.log(myModule.hello());
});
```

`define`函数的第一个参数是一个数组，他包含了所需的依赖。这些依赖会在背后加载(不会阻塞)，而且一旦加载完毕，`define`就会调用传给他的callback函数。

接着，callback函数就会把加载好的依赖作为他的参数——在上面例子中，即是`myModule`和`myOtherModule`。最后，这些依赖他们自己必须通过关键字`define`来定义。

比如，`myModule`也许是这样子的：

``` javascript
define([], function() {

  return {
    hello: function() {
      console.log('hello');
    },
    goodbye: function() {
      console.log('goodbye');
    }
  };
});
```

不像CommonJS，AMD是以浏览器为核心来实现异步加载module的。(注意到，有很多人强烈地认为动态加载文件是不好的，这个我们在Part 2会讲到)。

除了异步之外，AMD的另一个优点是，你的module可以是对象，函数，构造函数，字符串，JSON以及其他类型。而CommonJS只支持对象作为module。

总的来说，AMD并不兼容io，文件系统，以及其他面向server的feature，并且，封装的语法比`require`较复杂一点。

### UMD

对于需要你同时支持AMD和CommonJS的项目，你可以选择*Universal Module Definition (UMD)*。

UMD本质上创建了一个方式，支持他们其中的一种，也支持全局变量的定义。因此，UMD module可以同时在client和server端使用。

让我们来看看UMD是怎样子的：

``` javascript
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD
    define(['myModule', 'myOtherModule'], factory);
  } else if (typeof exports === 'object') {
      // CommonJS
    module.exports = factory(require('myModule'), require('myOtherModule'));
  } else {
    // Browser globals (Note: root is window)
    root.returnExports = factory(root.myModule, root.myOtherModule);
  }
}(this, function (myModule, myOtherModule) {
  // Methods
  function notHelloOrGoodbye(){}; // A private method
  function hello(){}; // A public method because it's returned (see below)
  function goodbye(){}; // A public method because it's returned (see below)

  // Exposed public methods
  return {
      hello: hello,
      goodbye: goodbye
  }
}));
```

更多关于UMD的例子，请查看 [enlightening repo](https://github.com/umdjs/umd)。

## Native JS

哈！你居然能看到这里，看来我没有搞晕你。太棒了。因为在结束之前，我们还有一个定义module的方法。

如你所见，上面的方法没有一种是原生JavaScript支持的。相反，我们使用了各种各样的方式去模拟一个模块系统。

幸运的是，在TC39工作的人(设计ECMAScript的语法和语义)在ES6实现了内置的模块系统。

下面的资源很好地讲解了ES6的模块系统：

- [jsmodules.io](http://jsmodules.io/cjs.html)
- [exploringjs.com](http://exploringjs.com/es6/ch_modules.html)

ES6的module结合了CommonJS和AMD的优点，比如简洁的语法和异步加载。还有优点是，比如支持循环依赖。

我最喜欢的ES6 modules的feature是，*imports*是*exports*的**live read-only views**(而CommonJS的import只是exports的一份copy而已，并且不是即时)。

下面例子会讲述live read-only view是怎样子的：

``` javascript
// lib/counter.js

var counter = 1;

function increment() {
  counter++;
}

function decrement() {
  counter--;
}

module.exports = {
  counter: counter,
  increment: increment,
  decrement: decrement
};


// src/main.js

var counter = require('../../lib/counter');

counter.increment();
console.log(counter.counter); // 1
```

在这个例子中，我们创建了module的**2份copy**：一个是当我们`export`他，另一个是当我们`require`他。

并且，在`main.js`的那份copy已经和原本的失去连接了。这就是为什么当我们给`counter`增加时他还是`1`——因为我们`import`的`counter`已经和原来的失去联系。

因为，增加`counter`会在原来的module可以实现，但是在你copy的那份就实现不了。如果想要后者实现的话，只能手动地操作了：

``` javascript
counter.counter++;
console.log(counter.counter); // 2
```

在另一个方面，ES6对于我们`import`的module创建了一个**live read-only view**。

``` javascript
// lib/counter.js
export let counter = 1;

export function increment() {
  counter++;
}

export function decrement() {
  counter--;
}


// src/main.js
import * as counter from '../../counter';

console.log(counter.counter); // 1
counter.increment();
console.log(counter.counter); // 2
```

很cool，对吧。

## 向前看：bunding modules

哇。时间过得真快。我真的希望能够帮助你更好地理解JavaScript的modules。

在下一部分，我会讲**module bundling**，涉及到几个核心的主题：

- 为什么我们需要*module bundling*
- 不同方法实现*bundling*
- ECMAScript的模块加载器API
- ...更多...

注意：为了简单起见，我跳过了许多细节(比如，循环依赖)。如果我留下了很重要或者很棒的东西，请留言让我知道！


**(原文：[JavaScript Modules: A Beginner’s Guide - Preethi Kasireddy](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.4ufizwkud))**
