# hash 在网页中的作用以及如何通过 hash 实现页面导航与返回的功能

## 前言

::: info 背景
在某万家焕乡 h5 项目中，在 a 页面中点击打开 b 页面后，客户希望通过安卓手机自带的右滑操作返回 a 页面，在安卓设备中，是通过屏幕滑动返回，而 iOS 中是通过网页底部导航栏返回，
讨论采用监听 hash 改变的方式来实现页面导航与返回的功能。
:::

## hash

### 1. `#` 的含义

代表网页中的一个位置。其右侧的字符，就是该位置的标识符。

比如 `http://www.example.com/index.html#print` 就代表网页 index.html 中 `print` 锚点位置。 
浏览器读取这个 `url` 后，会自动将视口滚动至 `print` 位置。  

为网页位置指定标识符， 有两个方法： 
- **使用锚点**：比如 `<a name='print'></a>`
- **使用 id 属性**：比如 `<div id='print'></div>`



### 2. http 请求不包括 `#`

`#` 是用来指导浏览器动作的，对于服务器端完全无用。所以在设计时，`hash` 不会被 `http` 请求发送到服务器。

比如访问 `http://www.example.com/index.html#print` ， 浏览器实际发出的请求是这样的：
```
GET / index.html HTTP / 1.1
Host: www.example.com
```



### 3. `#` 后的字符 

在第一个 `#` 后面出现的任何字符，都会被浏览器解读为**位置标识符**。
	
这意味着，这些字符都不会被发送到服务器，比如这段 `url` 的原意是指定一个颜色值：`http://www.example.com/?color=#fff` ，但是浏览器实际发出的请求是：
```
GET / ?color =  HTTP / 1.1
Host: www.example.com
```
可以看到，"#fff" 被省略了，只有将 `#` 转码为 `%23`，浏览器才会将其作为实义字符处理，也就是说，上面的网址应该被写成：`http://example.com/?color=%23fff`  



### 4. 改变 `#` 不触发网页重载

单单改变 `#` 后的部分，浏览器**只会滚动到相应位置，不会重新加载网页**。

比如：从 `http://xxx/a.html#location1` =>	`http://xxx/a.html#location2` ，浏览器不会重新向服务器请求 `a.html` 。



### 5. 改变 `#` 会改变浏览器的访问历史

每一次改变 `#` 后的部分，都会在浏览器的访问历史中增加一个记录 ( `ie6` 和 `ie7` 不成立)，使用"后退"按钮，就可以回到上一个位置。	



### 6. `window.location.hash` 可以读取到 `#` 值

window.location.hash 这个属性可读写
- **读取时**：可以用来判断网页状态是否改变
- **写入时**：则会在不重载网页的前提下，创造一条访问历史记录 ( `ie6` 和 `ie7` 不成立)



### 7. `onhashchange` 事件

`HTML5` 新增的事件，当 `#` 值发生变化时，就会触发这个事件。
使用方式有三种：
- `window.onhashchange = func`
- `<body onhashchange='func'></body>`
- `window.addEventListener('onhashchange', func, false)`
	
对于不支持 `onhashchange` 的浏览器，可以用 `setInterval` 监控 `location.hash` 的变化。



## 解决方案

所以我们在点击打开 b 页面时，先通过 `window.location.hash = '#pageId'`， 给浏览器增加一条历史记录，再在 b 页面 初始化时，绑定监听器，
`window.addEventListenetr('hashchange', this.hashChange)` 当用户在 b 页面右滑返回操作时，会触发 `hashChange` 事件，
这时关闭 b 页面，打开 a 页面，即可。
