title: google chrome Devtools Overview
author: Drake Leung
tags: [google chrome, devtools]
categories: [Tools]
date: 2015-07-16 01:29:29
foreword: 学习google chrome DevTools的４个部分. 分别为Console, Elements, Network以及Sources.
---

官方文档: [Chrome DevTools](https://developer.chrome.com/devtools)
## Console
### Basic Operation
- 打开: `Ctrl + Shift + J`
- `Shift + Enter`可以换行，当你要写多行代码的时候。
- 删除console history: `Ctrl + L`
- drawer: 假设你在其他tab里面，想要看到`Console`tab的东西，就可以可以按`Esc`来显示drawer
    ![](http://ww3.sinaimg.cn/large/7f85b91egw1eu3hckqtijj20rg0c8dj9.jpg)

### Console API
在DevTools里面定义了一个全局对象`console`。他有许多有用的API

- 打印日志: `console.log(arg1, arg2)`。`.log()`可以有多个参数，`console.log('loved?', true)`

- 打印错误日志: `console.error()`以及打印警告日志: `console.warn()`

- 用CSS来style你的日志: `%c`作为指示，第2个参数写CSS。
    ```javascript
    console.log("%cThis will be formatted with large, blue text", "color: blue; font-size: x-large");

    console.log('%cBlue! %cRed!', 'color: blue;', 'color: red;');
    ```
  这样就可以在console里面写一些漂亮的彩蛋了。

- 把DOM元素格式化为JavaScript对象: `console.dir()`, 如`console.dir(document)`

- 测量时间: 传一个`string`作为给`.time()`作为开始，这个string就是time marker。结束
的话就`timeEnd(string)`。string和前面的一样。
    ```javascript
    console.time("Array initialize");
        var array= new Array(1000000);
        for (var i = array.length - 1; i >= 0; i--) {
            array[i] = new Object();
        };
    console.timeEnd("Array initialize");
    ```

### Command Line API
- 自动补全: 比如输入`doc`就会有提示。如果是单个提示时，可以使用`tab`来补全。而多个时，按`↑`
和`↓`进行选择，然后按`→`补全当前。

- 选择元素: `$()`是`querySelector()`的简写，而`$$()`是`querySelectorAll()`

- `$0~$4`保存了你在**Element tab**里面选择过的5个元素。

## Network
![](http://ww2.sinaimg.cn/large/7f85b91egw1eu3ifwyikzj20ov08i77o.jpg)

- 可以检查你的文件路径有没有写对。
- 直播下载网易云音乐的歌曲。

## Elements
对着你想要审查的元素，鼠标右击 -> Inspect Element。或者`Ctrl + Shift + C`.
可以随便修改删除一些标签啊，比如去掉广告浮窗，或者这样啊，
![](http://ww1.sinaimg.cn/large/7f85b91egw1eu3g2gwgaij20dh0a4aaz.jpg)

- color picker: 按`shift` + click可以切换颜色的表示方法。
- adding new CSS rules
- toggle element state
    ![](http://ww4.sinaimg.cn/large/7f85b91egw1eu3gx9r0ppj20dc01r0sp.jpg)

## Sources
Sources tab可以查看你的文件。
![](http://ww3.sinaimg.cn/large/7f85b91egw1eu392veow8j20uk0rm0vv.jpg)

### debugging JavaScript with breakpoints

1. 按`Ctrl + P`就可以搜索我们的文件，此时会调到**Sources tab**。接着`Ctrl + Shift + O`搜索函数名, `Ctrl + G`可以跳到任意一行，或者`Ctrl + Shift + F`在所有文件中搜索文本。

    ![](http://ww2.sinaimg.cn/large/7f85b91egw1eu3fzown0oj20lo08bwgi.jpg)

2. 单击**line gutter**就可以在该行设置一个breakpoint。然后你可以在右边的面板的**BreakPoints**
找到所有设置过的breakpoint

    ![](http://ww2.sinaimg.cn/large/7f85b91egw1eu39fv8s2gj20le0cd400.jpg)

3. Control
    - **Continue**: 继续执行，直到下一个breakpoint
    - **Step over**: 下一行
    - **Step into**: 跳进函数里面去
    - **Step over**: 从函数里面跳出来
    - **Toggle breakpoints**: 激活/不激活breakpoints


4. 查看
然后，我们就可以在**Scope Vraibles**那里查看你想要的变量。如果你有一直想看的变量，
可以把他添加到**Watch Expressions**

### Saving changes with workspaces
把文件夹添加到workspace之后，你在DevTools上面修改的东西就会同步到实际的文件
当中去。
![](http://ww2.sinaimg.cn/large/7f85b91egw1eu3d1b12tsj20ve0bl77g.jpg)

这样一来，DevTools就相当于一个编辑器了。
