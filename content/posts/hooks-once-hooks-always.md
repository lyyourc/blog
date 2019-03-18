---
title: Hooks 一时爽，一直 Hooks 一直爽
date: '2019-03-20'
draft: false
---

React hooks 给我带来最大的感受是「开发体验」提高了许多。

## 更加纯粹的组件

有了 hooks ，Function Component 就用上 Class Component 的特性，比如 state 。
因为，可以简单地认为：「组件」就是一个函数：

```tsx
function Foo() {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <Modal visible={modalVisible} />
  )
}
```

## Props 的传递

如果 props 需要在多层组件（大于 2 层）中传递的话，那写起来就会很麻烦。
虽然 context API 可以解决这个问题，但是每次都要通过 `<SomeContext.Provider>` 来注入，写起来也很麻烦。
有了 `useContext` 的话，那写来就方便多了：

```tsx
function UserMenu() {
  const { user } = userContext(UserContext)

  return (
    <div>{user.name}</div>
  )
}
```

## 状态管理

用了 [easy-peasy](https://github.com/ctrlplusb/easy-peasy) 之后，store 的注入就简单很多了，
不像 redux 那么罗嗦的接口，什么 `mapPropsToState` 之类的。

```tsx
function User() {
  const { user } = useStore(state => state.user)
}
```

## 遇到的问题

但我用 Hooks 遇到了一个问题：props 变了，但是引入 props 的 `useState` 没跟着变。
原因是 `useState` 的初始值是 [Lazy initial state](https://reactjs.org/docs/hooks-reference.html#lazy-initial-state) ，他会无视后面的 re-render 。

如果我们想 `useState` 的初始值随着 props 变化的话，我们可以用 `useEffect` 手动更新：

```tsx
function Counter({ defaultIndex }) {
  const [index, setIndex] = useState(defaultIndex)

  useEffect(() => {
    setIndex(defaultIndex)
  }, [defaultIndex])
}
```
