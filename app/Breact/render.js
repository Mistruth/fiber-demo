import { getCurrentTime, getExipreTime, scheduleWork } from './workloop'

const [HOST] = [0]

export function render(vnode, container, callback) {
  // react 还判断了root是否存在 挂在到了container上面
  const FiberRoot = {
    container,
    callback
  }
  //TODO unbatchedUpdates 用于集成setState的
  updateContainer(FiberRoot, vnode, null)
}

function updateContainer(FiberRoot, vnode, callback) {
  // TODO suspense
  const current = (FiberRoot.current = createContainer(FiberRoot, vnode, true))
  const currentTime = getCurrentTime()

  const expireTime = getExipreTime(currentTime)
  current.expireTime = expireTime

  const update = createUpdate(expireTime)

  update.payload = { element: vnode }

  if (callback) {
    update.callback = callback
  }

  // 传入rootFiber
  enqueueUpdate(current, update)
  scheduleWork(current, expireTime)
}

function createContainer(FiberRoot, vnode, isHost = false) {
  const RootFiber = new createFiber(vnode, isHost)
  RootFiber.startNode = FiberRoot
  return RootFiber
}

function createFiber(vnode, isHost) {
  if (isHost) {
    this.type = HOST
  } else {
    this.type = vnode.type || null
  }
  this.props = vnode || null
  this.child = null
  this.return = null

  this.updateQueue = null

  this.expireTime = null

  this.alternate = null

  this.memoizedState = null
}

function createUpdate(expireTime) {
  return {
    expireTime,
    type: 0,
    callback: null,
    payload: null,
    next: null,
    nextEffect: null
  }
}

function enqueueUpdate(fiber, update) {
  // 获取current的alternate
  const alternate = fiber.alternate

  let queue1
  let queue2
  if (alternate === null) {
    // 拿出updateQueue
    queue1 = fiber.updateQueue
    queue2 = null
    // 还没有把update放进去
    if (queue1 === null) {
      queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState)
    }
  }

  if (queue2 === null) {
    if (queue1.lastUpdate === null) {
      queue1.firstUpdate = queue1.lastUpdate = update
    }
  }
}

function createUpdateQueue(state) {
  return {
    baseState: state,
    firstUpdate: null,
    lastUpdate: null
  }
}
