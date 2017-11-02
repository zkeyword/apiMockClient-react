# dynamax-react-scaffold #

基于reactjs、reudx、redux-thunk和react-router的轻量级前端框架，基于create-react-app创建。

## 目录结构 ##

    /
    ├── /config/         # 配置目录
    ├── /public/         # 静态资源目录
    ├── /scripts/        # 运行脚本目录
    ├── /src/            # 项目源码目录
    │ ├── /asset/        # 项目公共静态文件
    │ ├── /components/   # 项目组件
    │ ├── /routes/       # 路由组件（页面维度）
    │ ├── /models/       # 数据模型
    │ ├── /services/     # 数据接口
    │ ├── /utils/        # 工具函数
    │ ├── route.js       # 路由配置
    │ └── index.js       # 入口文件
    └── package.json     # 项目信息
    
## 规范 ##

- 组件文件及文件夹命名大写开头，使用驼峰式（index.js除外）
- 非组件的js文件命名为小写开头，两个单词之间用-隔开

## 入门 ##

- ReactJs官网：https://facebook.github.io/react/（中文：https://discountry.github.io/react/）
- Redux 中文文档：http://cn.redux.js.org/
- 阮一峰的React 入门实例教程：http://www.ruanyifeng.com/blog/2015/03/react.html
- 【资料汇总】React (中文)：https://github.com/dingyiming/example-react/issues/1
- React技术栈一览：https://segmentfault.com/a/1190000009879742

## dva 入门

- https://github.com/pigcan/blog/issues/2
- https://github.com/sorrycc/blog/issues/8
- https://github.com/dvajs/dva-docs/blob/master/v1/zh-cn/tutorial/01-%E6%A6%82%E8%A6%81.md

## 代码处理流程

index.js => router => model => effect => reducers => state

## stylus书写约定

- 使用一些基本前缀: .fn、.page、.lt、.ui
- css熟悉紧跟选择器，每块选择器代码间隔空一行
- css命名不用太长直接根据当前页面结构、模块结构、功能命名即可
- 页面样式尽量不用fn-left、fn-right、fn-clear布局，可以直接写入css，也可以直接用flex
- 每个页面有自己的class名，以.page前缀开头，页面的class可以互相继承

### 以下是约定的标准书写

    .page-index

        .lt-header
            height: 100px
            clear: both

            /* 这个是一个logo */    
            .logo
                height: 57px // logo实际高度是50px

            .nav
                float: left
            
        .lt-main
            height: 100px

            .lt-left

                .fn-left
                    font-size: 20px

                .ui-btn
                    border: 0 none

        .lt-footer
            height: 212px