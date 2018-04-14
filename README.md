# 基于React+Swoole前后端分离的Small-Chat项目
>本人已经利用React脚手架搭建了一套适合自己的开发框架，里面包含了react-redux,react-router等，封装了一套ajax请求流程，
具体可以看目录src/core/中的call.js,界面采用react-ant，具体可以参考文档:https://ant.design/docs/react/introduce-cn。

### 注意
此项目是前后分离的，后台采用的swoole实现的，具体的地址请移步:https://github.com/LaravelChen/swoole_chat_framework

### 安装
```
npm install
npm run start
```
**此处需要跑通需要将后台的swoole开启(具体步骤请查看swoole上面的链接)，这样前端运行才能有效果。出现安装问题请提issue**

### 1.项目效果
#### 1.1 畅聊室
![image](https://github.com/LaravelChen/React-Small-Chat/raw/master/screen/image1.gif)
![image](https://github.com/LaravelChen/React-Small-Chat/raw/master/screen/image2.gif)
#### 1.2 私聊室
![image](https://github.com/LaravelChen/React-Small-Chat/raw/master/screen/image3.gif)
![image](https://github.com/LaravelChen/React-Small-Chat/raw/master/screen/image4.gif)

**此外，还有其他的加好友，消息推送等效果不演示了，可以自行下载安装使用，效果很好!**
