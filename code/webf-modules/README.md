# webf 与 flutter 原生通讯

## 安装 flutter 包

比如 ./webf-point

或者正式发布安装

或者本地编译后安装

```
pnpm add file:./webf-modules/webf-point
```

## 引用
```
import { WebFPoint } from '@wlfi/webf-point';
```

## 主动调用
funcName 及 res 由 flutter 定义并实现
```
const res = await WebFPoint.[funcName]();
```

## 监听 flutter 调用
Check if webf is available (WebF environment)
```
const methodChannel = window?.webf?.methodChannel;

if (methodChannel) {
  methodChannel.addMethodCallHandler('funcName', async (res) => {
    console.log('funcName', res);
  });
}
```
