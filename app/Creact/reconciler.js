let WIP = null
const [HOST, HOOKCOMPONENT] = [0, 1]
const [DELETE] = [2]
let commitQueue = []
const DEFAULTKEY = 'DEFAULTKEY'

export function reconcileWork(RootFiber) {
  // TODO 构建fiber树
  WIP = createWorkInProgress(RootFiber)

  WIP = reconcile(WIP)
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
}

function updateHOST(fiber) {
  reconcileChildren(fiber, fiber.payload.elements)
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

  for (const k in newFibers) {
  }
}

function updateHooks() {}

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
