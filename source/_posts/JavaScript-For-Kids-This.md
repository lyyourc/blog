title: JavaScript For Kids - This
date: 2015-06-09 15:09:05

author: Drake Leung

tags: This

categories: JavaScript

---

## Reference
[You dont know JavaScript - This](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes) chapter

## 2 Misconception
### Itself
第一个普遍错误就是认为`this`是指向这个`function`本身。举个例子:
```javascript
function foo() {
  this.count++;
}

foo.count = 0;
for (var i = 0; i < 5; i++) {
  foo();
}

console.log(foo.count); // not 5 but 0
```

这样的话，有没有其他办法可以解决呢？如果不用`this`的话，我们可以新创建一个对象。
```javascript
function foo() {
  data.count++;
}
var data = {
  count: 0;
};

// same to the example above
```
还有一个解决方法,直接用`foo`他本身。
```javascript
function foo() {
  foo.count++;
}
```
虽然上面２种方法都解决了问题，但是他们都逃避了`this`。这不是我们想要的。　　
再来看下面的解决方法: 使用`call`。
```javascript
for (var i = 0; i < 5; i++) {
  foo.call(foo);
}
```

### Its Scope
还有一个误解就是认为`this`指向这个函数的作用域。
```javascript
function foo() {
  var loved = true;
  bar();
}

function bar() {
  console.log(this.loved);
}

foo(); // ReferenceError: loved is not defined
```

## What is this
事实上`this`并不是在函数定义的就绑定好的(**author-time binding**)，而是在函数调用的时候才绑定好(**runtime binding**)

也就是说，`this`的值跟函数的定义一毛钱的关系都没有，而是取决于函数是在哪里被调用的(**call-site**)
```javascript
function foo() {
  bar() // call-site for bar
}

foo()  // call-site for 'foo'
```

## 4 Rules
上面说了`this`的值取决与函数的call-site。因此，我们总结了４种**invoke pattern**(not define pattern)

### Default Binding
```javascript
function foo() {
  console.log(this.loved);
}

var loved = true;

foo(); // true
```
从上面的例子可以看出，`this`是指向`global object`(or `window`)。也就是说，当一个函数以**函数名加括号**(`foo()`)的这个形式被调用的话，他的`this`就指向`globol object`。

P.S.如果在严格模式下, `this`的值会是`undefined`而不是`global object`。

### Implicit Binding
```javascript
function foo() {
  console.log(this.loved);
}

var ex = {
  loved: true,
  foo: foo
};

ex.foo();  // true
```
如果是调用一个对象的方法的话，`this`就隐式地指向这个对象本身。所以上面的`this`指向`ex`对象。并且是指向离他最近的对象，就近原则。所以下面的例子`this`是指向`next`而不是`ex`。
```javascript
var ex = {
  loved: true,
  next: {
    loved: false,
    foo: foo
  }
};

ex.next.foo(); // not true but false
```
**但，这个隐式绑定有可能会出现意外**。尤其是传给一个callback function的时候。
```javascript
function foo() {
  console.log(this.loved);
}

var ex = {
  loved: true,
  foo: foo
};

window.loved = false;
setTimeout(ex.foo, 100); // false
```
其实`setTiemout`的函数是这样的:
```javascript
function setTimeout(fn, delay) {
  // something
  fn();  // call-site !!!
}
```
由于`fn()`这种invoke pattern属于第一种，所以他是绑定到`global object`。

虽然`this`的值是符合我们所讲的，但是这并不是我想要的东西，因为我想打印出就是`ex.loved`这个field，而不是`global object`。

### Explicit Binding
我们将会使用到`call`, `apply`和`bind`。

```javascript
function foo() {
  console.log(this.loved);
}

var ex = {
  loved: true
}

foo.call(ex); // true
```

那么，我们要怎样解决上面那个问题呢？我们需要**hard binding**。  
我们需要用另外一个函数来作为wrapper，
```javascript
function bar() {
  foo.call(ex);
}

bar(); // true
setTimeout(bar, 100); // true
bar.call(window); // true
```

因为*hard binding*经常用，所以ES5提供了一个方法: `bind()`。因此，我们可以这样:
```javascript
var bar = foo.bind(ex);
setTimeout(bar, 100); // true
```
### New Binding
当一个函数在调用的时候前面有个`new` keyword，`this`就被绑定到这个constructed object。
```javascript
function Ex() {
  this.loved = true;
}
var ex = new Ex();
console.log(ex.loved);
```
既然`this`怎么麻烦，为什么就不能简单一点啊？

## Arrow function
在`=>`中，`this`是绑定在**lexical scope**，也就是`this`取决于函数在哪里定义，而不是函数在哪里调用。并且，`this`一旦决定是不会改变的，也就是说`call`, `bind`这些方法都不起作用了。
```javascript
var ex = {
  loved: true,
  
  foo() {
    setTimeout(() => {
      console.log(this.loved);
    }, 10.24);
  }
}

ex.foo(); // true
```
