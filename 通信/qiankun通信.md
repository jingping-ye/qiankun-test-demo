# 通信

通信方式分为：

- `qiankun`官方提供的`Actions`通信。
- 基于`redux`实现的`Shared`通信。

## Actions通信

使用发布-订阅模式。

- `initGlobalState`：注册`MicroAppStateActions`实例用于通信。

`MicroAppStateActions`的实例方法：

- `setGlobalState`：设置全局状态。当设置新的值时，内部将执行浅检查(应该是检查值是否发生变化)，如果发生变化，则通知到所有观察者函数。
- `onGlobalStateChange`：注册观察者函数，响应全局状态变化。全局状态变化时出触发该观察者函数。
- `offGlobalStateChange`：注销观察者函数。

### 实例

在主应用注册实例`MicroAppStateActions`用于通信。

```js
/src/shared/action.js
import {initGlobalState} from 'qiankun';
const initState = {};
const actions = initGlobalState(initState);

// 监听变化
actions.onGlobalStateChange((newV, oldV)=>{
    console.log("newV",newV);
    console.log("oldV",oldV);
});

// 设置状态
actions.setGlobalState(state);
actions.offGlobalStateChange();
```

## 微应用

```js
// 从生命周期 mount 中获取通信方法，使用方式和 master 一致
export function mount(props) {
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });
  props.setGlobalState(state);
}
```

