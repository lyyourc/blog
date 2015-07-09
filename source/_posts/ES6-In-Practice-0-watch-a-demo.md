title: ES6 In Practice(0) - watch a demo
author: Drake Leung
date: 2015-06-18 16:02:11
tags: ES6
categories: JavaScript
---

吃完半个西瓜，太饱。于是上yutube，然后搜了`es6 tutorial`，发现了一个30k+ views的[JavaScript In 2015](https://youtu.be/iukBMY4apvI)视频。遂看，**收货良多**。

## live-server
[live-server](https://www.npmjs.com/package/live-server)这个package，可以帮助我们快速建立一个可以**live reload**的静态服务器。

## jspm
[jspm](http://jspm.io/)是一个package manager，可以帮助我们快速建立ES6的使用环境。让我们来看一下官方文档的[getting start](https://github.com/jspm/jspm-cli/wiki/Getting-Started)

```html
 <!doctype html>
  // 需要引入这2个js文件
  <script src="jspm_packages/system.js"></script>
  <script src="config.js"></script>
  
  // 下面是我们自己的js文件
  <script>
    System.import('lib/main');
  </script>
```

## reddit api
这里用了一个[jsonp](https://www.npmjs.com/package/jsonp) package，来发起jsonp请求。我们使用`jspm install npm:jsonp`来安装。

**使用reddit api**: 只要在每个`r`后面加`.json`。比如: `https://www.reddit.com/r/pics.json`。然后还要传`param: 'jsonp'`的参数。

```javascript
class RedditApi {
  constructor() {
    this.redditURL = 'https://www.reddit.com/r/pics.json';
  }

  load() {
    return new Promise((resolve, reject) => {
      jsonp(this.redditURL, {param: 'jsonp'}, (err, data) => {
        err ? reject(err) : resolve(data.data.children);
      });
    });
  }
}
```
说到API，突然想起[codeacademy](http://www.codecademy.com/learn)上面好像又好多教学，赶紧去一下先。

## Extract Pictures
利用`Array.map`和`Array.filter`来获取和过滤图片。以前一直不知道这２个函数怎么用。
```javascript
export default (posts) => {
  return posts
    .map(post => post.data.url)
    .filter(url => /png$/.exec(url));
}
```

## Display Picture
利用了`Array.map`和`Array.json`来生成要插入的HTML string。如果我写的话，可以会用循环 = =　果然看多别人的代码还是好的。

```javascript
export default (urls) => {
  var pics = document.querySelector('.pics');
  pics.innerHTML = urls.map(url => `<img src=${url}>`).join('\n');
}
```
