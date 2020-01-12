import { getCurrentTime, getExipreTime, scheduleWork } from './workloop'

const [RENDER] = [0]

export function render(vnode, container, callback) {
  // react 还判断了root是否存在 挂在到了container上面
  const FiberRoot = {
    container,
    callback
  }
  //TODO unbatchedUpdates 用于集成setState的
  updateContainer(FiberRoot, vnode, null, RENDER)
}

function updateContainer(FiberRoot, vnode, callback, tag) {
  // TODO suspense
  // 生成第一个fiberRoot对象（payload上app）
  const current = (FiberRoot.current = createContainer(FiberRoot, tag))

  // 获取当前时间
  const currentTime = getCurrentTime()

  // 获取过期时间  (是指这一次更新的过期)
  const expireTime = getExipreTime(current, currentTime)

  const update = createUpdate(expireTime, callback, vnode, tag)

  update.payload = { element: vnode }
  // 传入rootFiber
  enqueueUpdate(current, update)
  scheduleWork(current, expireTime)
}

function createContainer(FiberRoot, tag) {
  const RootFiber = new createFiber(tag)
  RootFiber.startNode = FiberRoot
  return RootFiber
}

function createFiber(tag) {
  this.type = null

  this.tag = tag // 表明优先级 是那种类型的fiber
  // this.props = vnode || null
  this.child = null
  this.return = null

  this.updateQueue = null

  this.expireTime = 0
  this.alternate = null

  this.memoizedState = null
}

function createUpdate(expireTime, callback, vnode, tag) {
  return {
    expireTime,
    type: tag,
    callback,
    payload: {
      element: vnode
    },
    next: null,
    nextEffect: null
  }
}

function enqueueUpdate(fiber, update) {
  // 获取current的alternate
  const alternate = fiber.alternate // 一开始获取不到

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
