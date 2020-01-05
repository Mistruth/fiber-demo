const [HOST] = [0]

export function render(vnode, container, callback) {
  // react 还判断了root是否存在 挂在到了container上面
  const FiberRoot = {
    container,
    callback,
    children: {
      props: vnode
    },
    tag: HOST
  }

  updateContainer(FiberRoot)
  //TODO unbatchedUpdates 用于集成setState的
}

function updateContainer(FiberRoot) {
  // TODO suspense
}
