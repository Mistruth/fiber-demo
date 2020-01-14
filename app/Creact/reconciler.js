import { Fiber } from './Fiber'

let WIP = null // 当前正在工作的WIP
const [HOST, HOOKCOMPONENT, CLASSCOMPONENT] = [0, 1, 2]
const [DELETE, UPDATE, PLACEMENT] = [2, 3, 4]
let commitQueue = []
const DEFAULTKEY = 'DEFAULTKEY'

let n = 0

export function reconcileWork(RootFiber) {
  // TODO 构建fiber树
  WIP = createWorkInProgress(RootFiber)

  while (WIP && n <= 4) {
    console.log(WIP)
    WIP = reconcile(WIP)
    n++
  }
}

function reconcile(fiber) {
  switch (fiber.tag) {
    case HOST:
      updateHOST(fiber)
      break
    case HOOKCOMPONENT:
      updateHooks(fiber)
      break
    case CLASSCOMPONENT:
      updateClass(fiber)
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
  if (fiber.type) {
    fiber.startNode = document.createElement(fiber.type)
  }

  reconcileChildren(fiber, fiber.children)
}

function updateHooks(fiber) {
  const children = fiber.type(fiber.children.props || {})

  reconcileChildren(fiber, children)
}

function updateClass(fiber) {}

function reconcileChildren(fiber, children) {
  let oldFibers = fiber.prevFibers
  let newFibers = (fiber.prevFibers = [new Fiber(null, children)])

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
      oldFiber.effectTag = DELETE
      commitQueue.push(oldFiber)
    }
  }

  let prevFiber = null

  for (const k in newFibers) {
    let newFiber = newFibers[k]
    let oldFiber = store[k]
    // newFiber.type

    if (typeof children.type === 'function') {
      newFiber.tag = HOOKCOMPONENT
    } else {
      newFiber.tag = HOST
    }

    if (oldFiber) {
      // 更新旧fiber
      newFiber.effectTag = UPDATE
      commitQueue.push(newFiber)
    } else if (newFiber) {
      newFiber.effectTag = PLACEMENT
      commitQueue.push(newFiber)
    }

    if (prevFiber) {
      prevFiber.sibling = newFiber
    } else {
      fiber.child = newFiber
    }
    newFiber.return = fiber

    prevFiber = newFiber
  }

  if (prevFiber) prevFiber.sibling = null
}

function createWorkInProgress(fiber) {
  const obj = {
    expirationTime: fiber.expirationTime,
    type: fiber.type,
    tag: fiber.tag,
    startNode: fiber.startNode,
    return: fiber.return,
    child: fiber.child,
    children: fiber.children,
    updateQueue: fiber.updateQueue
  }
  obj.current = fiber
  fiber.alternate = obj
  return obj
}
