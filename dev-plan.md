
## 开发框架

https://openwebf.com/en/docs/learn-webf

npm create vite@latest



css 命令选择：https://openwebf.com/en/docs/developer-guide/css


## 代码风格

参考：https://github.com/tomo-inc/tomo-wallet/tree/main/apps/mydoge-app/src/pages/dapp-btc

变量命名规范：aaBbbCccc

路由、文件以及文件夹，全部小写，-间隔

页面为 mobile 页面，app 中专用

需求文档： [](./tasks/需求说明.md)


## 执行步骤

1.   在 code 中创建 typescript 项目，参考 https://openwebf.com/en/docs/developer-guide/getting-started
2.   创建后增加 axios， taiwind 依赖
3.   增加 2 个路由配置：默认首页，point records
4.   根据接口定义在 api 中生成 mock 接口，并转化为数据服务，要求所有 get 请求通过本地缓存优化性能
5.   根据模块定义生成对应名称的文件
6.   根据模块对应的设计稿实现 UI，并调用 api，渲染数据
7.   code 中的所有代码及注释不得出现中文
