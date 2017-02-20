---
title: 有趣的 Nginx
author: Drake Leung
tags: []
categories: []
date: 2016-08-11 00:53:50
foreword: 如何使用 nginx 来协助前端开发
---

由于在开发项目的时候用到了 `nginx` ，觉得挺不错的，所以了解了一下。

一个项目的开发环境一般都会分为4个阶段。

- test(local): 本地
- alpha
- beta
- production

每个环境下，前端的域名是不同的，并且调用后台接口的 `url` 也是不同的。假设我们的项目名字叫做 `toon`，并且 root domain 是 `lyyourc.com`，那么就有：

```bash
# 前端4个环境下的域名
-  test: toon.test.lyyourc.net
- alpha: toon.alpha.lyyourc.net
-  beta: toon.alpha.lyyourc.net
-  prod: toon.lyyourc.com

# 后台接口
-  alpha: toon-api.alpha.lyyourc.net
-   beta: toon-api..beta.lyyourc.net
-   prod: toon-api.lyyourc.com
```

那么，在这种情况下，我们应该如何：

> 不同环境下，前端使用不同的域名，访问对应的后台接口呢？

首先，我们要解决**前端怎么使用域名来访问我们的 web 应用**。

最简单的办法当然是**改 hosts** 。应该还有其他办法，比如 [hotel - get local domain in seconds](https://github.com/typicode/hotel) 。

```bash
# my project - toon
127.0.0.1 toon.test.lyyourc.net
```

接下来，我们需要用到 nginx 作为一个 **proxy server** ，把接收到请求转发到对应的后台接口。

如果你还没接触过 nginx 的话，现在就是一个好机会啦。打开 [nginx 的官网](http://nginx.org/en/docs/)，安装，看 [Beginner’s Guide](http://nginx.org/en/docs/beginners_guide.html) 。

下面，修改我们的 `nginx.conf`(OSX: `/usr/local/etc/nginx/`)

```bash
worker_processes  7;
events { worker_connections 256; }

http {
  server {
    # 监听 80 端口
    listen 80; 
    
    # 域名符合：toon.*.lyyourc.net 等
    server_name ~^toon\.(.*\.)?(lyyourc)\.net$;

    location / {
      root "/Users/drake/Projects/demo/fun/nginx";
    }

    # 只要含有 `/api/` 请求，都转发
    location /api/ {
      proxy_pass http://toon-api.alpha.lyyourc.net;
    }
  }
}
```

然后运行：`sudo nginx -s reload`，重新读取 nginx 的配置文件。如果失败的话，会有相关的提示信息。比如下面少写了 `event` 这个指令：

```bash
nginx: [emerg] no "events" section in configuration
```

在上面的 `nginx.conf` 中，我们定义了：

> 只要请求是来自 80 端口，域名符合，URL中包含了 `/api/` 的，我们都转发到 `http://toon-api.alpha.lyyourc.net` ，如果为 `/` 的话，直接读取 `/Users/drake/Projects/demo/fun/nginx` 目录下的 `index.html` 。

然后，我们前端需要做的是：**根据当前的域名，请求对应的后台接口。**

- 写一个配置文件

```javascript
// host.js
export const apiHost = () => {
  const items = window.location.hostname.split('.')
  const env = items[1]

  switch (env) {
    case 'test': // 本地开发环境 => nginx
      return ''

    case 'alpha':
      return '//toon-api.alpha.lyyourc.net'

    case 'beta':
      return '//toon-api.beta.lyyourc.net'

    default:
      return '//toon-api.lyyourc.com'
  }
}
```

- 每次请求的时候都带上这个 host :

```javascript
import { apiHost } from 'host.js'

fetch(`${apiHot()}/api/heros/`)
  .then(res => res.json())
```

这时就有：

- 前端域名为 `toon.test.lyyourc.net` 的时候
- `apiHost` 返回空字符串 `''` 
- 访问后台接口的 URL 为 `toon.test.lyyourc.net/api/xx`
- 在 `/etc/hosts` 匹配了这个 URL ，转到 `127.0.0.1`
- Nginx 接收，转发到 `http://toon-api.alpha.lyyourc.net` 


为什么不直接在 `host.js` 里面返回 `http://toon-api.alpha.lyyourc.net` 呢？原因有2个我认为：1个是浏览器的同源策略而产生的**跨域问题**，另1个是当我们想要测试任何环境下的后台接口，我们只需要改 `nginx.conf` 里面的 `proxy_pass` 就好了。

综上，**不知道是否还有更好的解决办法呢？**

其实 nginx 还可以做很多事情啦。比如一个服务器上轻松地跑多个 App ，还有反代 google ，配置 HTTPS 等等。

Oh~ My Nginx!!