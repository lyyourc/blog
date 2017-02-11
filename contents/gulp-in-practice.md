---
title: gulp in practice
author: Drake Leung
date: 2015-06-11 01:47:58

tags: gulp
categories: FrontEnd
foreword:
  通过研究generator-gulp-webapp这个例子, 来实践一下gulp的各种用途.
---

我们研究的例子是[generator-gulp-webapp](https://github.com/yeoman/generator-gulp-webapp/blob/master/app%2Ftemplates%2Fgulpfile.js)的gulp recipe.

## Getting Start
假设我正在开发一个项目。首先，我要用`jade`来写一个页面。那么，我们就需要[gulp-jade](https://www.npmjs.com/package/gulp-jade)来帮助把`jade`解析为`HTML`。
```javascript
var gulp = require('gulp'),
 $ = require('gulp-load-plugins')();

gulp.task('views', function() {
  gulp.src('app/views/index.jade')
    .pipe($.plumber())
    .pipe($.jade({
        pretty: true
    }))
    .pipe(gulp.dest('.tmp'));
});
```
 `require`是什么？他可以外部的一个模块，类似`java`的import。[详情请看]()

因为我们使用了[gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins)，他会读取`package.json`里面的`devDependencies`或者`dependencies`的内容来加载plugins。比如，这是我的`package.json`:
```json
{
  "devDependencies": {
    "gulp-jade": "^1.0.1"
  }
}
```
所以，我可以通过这样来加载`gulp-jade`模块
```javascript
 $ = require('gulp-load-plugins')();
 $.jade();
```
否则的话，我就需要这样：
```javascript
var jade = require('gulp-jade');
```
上面这种方法，如果插件多起来的话，就要写很多变量名。
```javascript
var jade = require('..'),
  sass = require('..'),
  // ....
  //...
```

然后，关于`gulp-jade`可以传哪些参数，可以看[docs](https://www.npmjs.com/package/gulp-jade#options)。

最后，`$.plumber`是用来捕捉并处理错误的。

## Next
现在我想把bower_components里面的东西都inject到我的`index.jade`里面来，这样就不需要我手动写了。这个时候，我们需要用到[wiredep](https://github.com/taptapship/wiredep#gulpjs)
```javascript
gulp.task('wiredep', function() {
  gulp.src('app/views/index.jade')
    pipe(wiredep({
        // options
    }))
    .pipe(gulp.dest('app/views/index.jade'));
});
```
如果像上面那样式不够的，因为wiredep根本不知道要把bower_compoents里面的东西插到`index.jade`的什么位置，因此我们要指定placeholder.
```jade
doctype html
  head
    meta(charset='utf-8')

    // bower:css
    // endbower

  body
    p Goodbye world

    // bower:js
    // endbower
```
`wiredep`会默认会读取`bower.json`默认的`bower_compponets`路径，接着找到每个component里面的`bower.json`里的`main`property。

如果`main`里面没有指定相关的文件，`wiredep`是无法自动添加依赖到placeholder的。[docs - what can go wrong](https://github.com/taptapship/wiredep#what-can-go-wrong)

举个例子：`semantic-ui`下的`bower.json`里的`main`没有指定他的CSS文件。
```json
{
  "main": [
    "src/semantic.less",
    "dist/semantic.js"
  ]
}
```
所以你如果按照前面写的placeholder，你可以加载到`semantic,js`，但是无法添加`semantic.css`。因为我们上面的代码写的placeholder是要求css：
```jade
doctype html
html
  head
    meta(charset='utf-8')
    title(My blog)

    // bower:css
    // endbower

  body
    p Goodbye world

    // bower:js
    script(src='../../bower_components/jquery/dist/jquery.js')
    script(src='../../bower_components/semantic-ui/dist/semantic.js')
    // endbower
```
也就是说，我们要手动添加我们想要的文件到`main`property里面去，比如`dist/semantic.css`
```
{
  "main": [
    "src/semantic.less",
    "dist/semantic.js",
    "dist/semantic.css"
  ]
}
```
### Issue
假设我们已经执行了`wiredep`任务，相关的依赖已经添加到了`index.jade`。接下来就要执行`views`任务，把jade解析成`HTML`到`.tmp`目录下。
```html
<!-- .tmp/index.html -->

<!-- omit some tag here -->
<body>
  <script src="../../bower_components/semantic-ui/dist/semantic.js"></script>
</body>
```
如果你足够细心的话，你会发现引入的semantic的**路径是不对的**。因为`.tmp`是在根目录下面的，而本来`index.jade`实在`app/views`下面的。
正确的应该是这样：
```html
<body>
  <script src="/bower_components/semantic-ui/dist/semantic.js"></script>
</body>
```
所以我们要在`wiredep`的时候就要忽略掉`../..`这个字符串。
```javascript
gulp.task('wiredep', function() {
  gulp.src('app/views/index.jade')
    pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./  // 去掉../..
    }))
    .pipe(gulp.dest('app/views/index.jade'));
});
```

## More
话说，你不觉得这样引入多外部文件会不好吗？这样HTTP请求就变多了。所以，我们应该要把这些依赖都concatenate在同一个文件里面去。

[gulp-assets](https://www.npmjs.com/package/gulp-useref)会把HTML的build block的引用的文件concatenate在一起。

```javascript
gulp.task('html', ['views'], function() {
  var assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  gulp.src(['.tmp/*.html'])
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('dist'));
});
```

## End
利用[gulp-subtree](https://github.com/Snugug/gulp-subtree)，把指定的目录提交奥到指定分支上面去。默认的分支是: `gh-page`。

所以，我们只需要把`dist`目录发布到`gh-page`分支上，我们就可以通过`username.github.io/repo-name`来访问了。

```javascript
gulp.task('deploy', ['build'], function() {
  eturn gulp.src('dist')
    .pipe($.subtree())
    .pipe($.clean());
});
```

## Append: gulpfile.js
https://gist.github.com/DrakeLeung/bd9132aa68b45c3c6794
