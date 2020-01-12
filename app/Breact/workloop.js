const [RENDER, HIGH, LOW] = [0, 1, 2]

let WIP = null
let isScheduling = false
// let interruptFiber = null
// let renderExpirationTime = 0 // 开始render的时间
let initTimeTag = 0
let currentFlushWorkCb = null

// expirationTime 超过这个时刻后必须执行
const SYNC_EXPIRETIME_FRAME = 0
const HIGH_ASYNC_EXPIRETIME_FRAME = 250
const LOW_ASYNC_EXPIRETIME_FRAME = 350
let CLIP_DEADLINE = 0

export function getCurrentTime() {
  return performance.now()
}

export function getExipreTime(current, initTime) {
  if (current.tag === RENDER) {
    return initTime + SYNC_EXPIRETIME_FRAME
  } else if (current.tag === HIGH) {
    return initTime + HIGH_ASYNC_EXPIRETIME_FRAME
  } else if (current.tag === LOW) {
    return initTime + LOW_ASYNC_EXPIRETIME_FRAME
  }
}

export function scheduleWork(fiber, expireTime) {
  isScheduling = true

  if (!isScheduling) {
    return
  }
  // TODO 检查无限循环的state变更

  // 遍历更新rootFiber的子节点的过期时间
  const root = markUpdateTimeFromFiberToRoot(fiber, expireTime)
  if (root === null) {
    return
  }
  // TODO 判断是否有高优先级的任务，打断当前任务
  // checkForInterruption(fiber, expireTime)
  // 说明是同步任务，没有优先级之分, 不能调整
  // if (initTimeTag === expireTime) {
  //   performSyncWorkOnRoot(root) // 开始工作
  // }

  // 如果是同步任务 // 表明本次更新不能被打断
  if (initTimeTag === root.current.expireTime) {
    currentFlushWorkCb = flushWork
    performSyncWorkOnRoot(root) // 开始工作
  }
}

function markUpdateTimeFromFiberToRoot(fiber, expirationTime) {
  if (fiber.expirationTime < expirationTime) {
    fiber.expirationTime = expirationTime
  }
  let alternate = fiber.alternate

  let node = fiber.return
  let root = null
  if (node === null) {
    // 说明是rootFiber
    root = fiber.startNode
  }
  return root
}

// function checkForInterruption(fiber, expirationTime) {
//   if (WIP !== null && renderExpirationTime < expirationTime) {
//     interruptFiber = fiber
//   }
// }

function performSyncWorkOnRoot(root) {
  setTimeout(performWork, 0, root)
}

// 每一次update都只做一个时间片的事情 设置一个时间片为5ms
function performWork(root) {
  if (currentFlushWorkCb) {
    const currentTime = getCurrentTime()
    CLIP_DEADLINE = currentTime + 5
    root.currentTime = currentTime
    const next = currentFlushWorkCb(root)
    if (next) {
      performSyncWorkOnRoot(root)
    } else {
      isScheduling = false
      currentFlushWorkCb = null
    }
  }
}

function flushWork(root) {
  try {
    return workLoop(root)
  } catch {}
}

function workLoop(root) {}
