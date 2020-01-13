import { Fiber } from './Fiber'
import { createText } from './createElement'

let WIP = null
const [HOST, HOOKCOMPONENT] = [0, 1]
const [DELETE, UPDATE, PLACE] = [2, 3, 4]
let commitQueue = []
const DEFAULTKEY = 'DEFAULTKEY'

let n = 0

export function reconcileWork(RootFiber) {
  // TODO 构建fiber树
  WIP = createWorkInProgress(RootFiber)

  while (WIP && n <= 4) {
    WIP = reconcile(WIP)
    n++
  }
}

function reconcile(fiber) {
  switch (fiber.type) {
    case HOST:
      updateHOST(fiber)
      break
    case HOOKCOMPONENT:
      updateHooks(fiber)
      break
  }

  if (fiber.child) return fiber.child
  while (fiber) {
    if (fiber.sibling) {
      return fiber.sibling
    }
    fiber = fiber.return
  }
}

function updateHOST(fiber) {
  reconcileChildren(fiber, fiber.payload.elements)
}

function updateHooks(fiber) {
  const vnode = fiber.payload.elements
  let children = vnode.type(vnode.props)

  // if (!children.type) {
  //   children = createText(children)
  // }
  // reconcileChildren(fiber, children)
}

function reconcileChildren(WIP, children) {
  let oldFibers = WIP.prevFibers
  let newFibers = (WIP.prevFibers = [children])

  let store = {}

  for (const k in oldFibers) {
    let newFiber = newFibers[k]
    let oldFiber = oldFibers[k]

    const newKey = newFiber.key || DEFAULTKEY
    const oldKey = oldFiber.key || DEFAULTKEY
    const newType = newFiber.type
    const oldType = oldFiber.type

    // 标签没有改变
    if (newType === oldType && newKey === oldKey) {
      // 复用
      store[k] = newFiber
    } else {
      oldFiber.op = DELETE
      commitQueue.push(oldFiber)
    }
  }

  let prevFiber = null

  for (const k in newFibers) {
    let newFiber = newFibers[k]
    let oldFiber = store[k]

    if (oldFiber) {
      // 更新旧fiber
    }
  }
}

function createWorkInProgress(fiber) {
  const obj = {
    expirationTime: fiber.expirationTime,
    type: fiber.type,
    startNode: fiber.startNode,
    return: fiber.return,
    child: fiber.child,
    payload: fiber.payload,
    updateQueue: fiber.updateQueue
  }
  obj.current = fiber
  fiber.alternate = obj
  return obj
}
