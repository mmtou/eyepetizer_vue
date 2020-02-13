![](http://img.kaiyanapp.com/4-065061ff2459de367f556069bef11154.jpeg)
# 开眼视频 vue 高仿版
> 「开眼」是一款充满设计感的精品短视频应用。汇聚全球优质的短视频内容，推荐创意的短视频作品，从视觉到脑洞，带给用户全方位的惊喜与享受。

[开眼视频 vue 高仿版](https://github.com/mmtou/eyepetizer_vue) 是基于「开眼」非开放 API 、使用 Vue + Vant 框架搭建的 H5 高仿版。（后续会发布 Flutter 版本，敬请期待~）

项目源码: [https://github.com/mmtou/eyepetizer_vue](https://github.com/mmtou/eyepetizer_vue)  
在线访问: [http://47.92.146.72/eyepetizer/](http://47.92.146.72/eyepetizer/)

## 预览
![](https://github.com/mmtou/eyepetizer_vue/raw/master/demo/images/1.png)

![](https://github.com/mmtou/eyepetizer_vue/raw/master/demo/images/2.png)

![](https://github.com/mmtou/eyepetizer_vue/raw/master/demo/images/3.png)

![](https://github.com/mmtou/eyepetizer_vue/raw/master/demo/images/4.png)

![](https://github.com/mmtou/eyepetizer_vue/raw/master/demo/images/5.png)


## 开发目的
1. Vue + Vant 实践采坑
2. 后面开发 Flutter 版本，做个对比
3. 放假在家实在无聊😏

## 技术栈
1. 使用 Vue 作为基础框架
> 渐进式 JavaScript 框架

2. 使用 Vant 作为 UI 框架
> 轻量、可靠的移动端 Vue 组件库

## 采坑
1. 使用 `vue-router` 时，当使用路由参数方式同一个页面跳转时，**组件的生命周期钩子不会再被调用**。
![](https://github.com/mmtou/eyepetizer_vue/raw/master/demo/images/d1.png)

> https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#响应路由参数的变化

2. 当你发布后需要二级目录访问时，需要修改`router-->index.js`；修改`nginx`配置
![](https://github.com/mmtou/eyepetizer_vue/raw/master/demo/images/d2.png)
![](https://github.com/mmtou/eyepetizer_vue/raw/master/demo/images/d3.png)


## 实现功能
- [x] 首页
- [x] 分类查询
- [x] 视频详情
- [x] 相关推荐
- [x] 查询评论
- [ ] 登录
- [ ] 评论

## 感谢
- [感谢「开眼」团队提供这么优秀的视频推荐平台](https://www.kaiyanapp.com/)
- [感谢「YJQ」提供开眼视频API分析](https://github.com/1136535305/Eyepetizer/wiki/开眼-API-接口分析)

## 小工具
1. [carbon](https://carbon.now.sh/) 一款在线 代码生成图片 的工具

## 本地运行
```shell
git clone https://github.com/mmtou/eyepetizer_vue
cd eyepetizer_vue
npm install
npm run serve
```

## 最后
只争朝夕，不负韶华~
