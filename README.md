figma: https://www.figma.com/design/YvaX5joHmqZfcFSsHobQ4W/NEW--WLFI-App?node-id=28824-42024&t=6IxeoGDPoZ08pa6k-0




## 思路

### 1. 定义组件 list
描述每个组件的名称，功能，设计稿地址，以及必要的其他细节

比如 登录组件
```
login = {
  title: "Login",
  input: "phone + password",
  output: "login result with token",
  specs: "goolge recpacha, retry limit 5 times",
  design: "figma link, or image uri",
  prd: "prd link",
  devNotes: "how to dev, api details, special parts"
}
```

### 2. 定义路由及组件构成

比如 首页
```
homepage = {
  modules: `
    menu login
    banner
    top3-products
    activities  claim-records
    copyright
    `,
  router: ["/", "homepage"]
  design: "figma link, or image uri",
  prd: "prd link",
  devNotes: "how to dev, api details, special parts"
}
```

### 3. 项目说明

```
框架，语言
开发规范
代码参考
主要结构说明
主要技术要求
产品使用说明
```
