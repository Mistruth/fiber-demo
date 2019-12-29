import { push, pop, peek } from './heapify'

const [HOST] = [0]
let WIP = null
let scheduling = false
let currentTask = null
let currenfn = null
let frameDeadline = 0
let frameLength = 5
const TaskQueue = []

export function render(vnode, node, callback) {
  const fiberRoot = {
    tag: HOST,
    node,
    props: {
      children: vnode
    },
    callback
  }

  scheduleWork(fiberRoot)
}

function scheduleWork(root) {
  WIP = root
  scheduleCallBack(callback)
}

function scheduleCallBack(callback) {
  const currentTime = getTime()
  let startTime = currentTime

  let newTask = {
    startTime,
    dueTime: startTime + 5000,
    callback
  }

  push(taskQueue, newTask)

  currenfn = flushWork

  if (!scheduling) {
    planWork()
    scheduling = true
  }
}

function performWork() {
  if (currenfn) {
    let currentTime = getTime()
    frameDeadline = currentTime + frameLength // 每一帧5ms后不能再进行
    let moreWork = currenfn(currentTime)

    // 是否继续执行
    if (moreWork) {
      planWork()
    } else {
      scheduling = false
      currentCallback = null
    }
  }
}

// 如果有其他的工作，那么下一次Task再执行
function planWork() {
  setTimeout(() => {
    performWork()
  }, 0)
}

function flushWork(iniTime) {
  try {
    return workLoop(iniTime)
  } finally {
    currentTask = null
  }
}

function workLoop(iniTime) {
  let currentTime = iniTime
  currentTask = peek(taskQueue)

  while (currentTask) {
    if (currentTask.dueTime > currentTime && shouldYeild()) {
      break
    }
    let callback = currentTask.callback
    if (callback) {
      currentTask.callback = null
      const didout = currentTask.dueTime <= currentTime

      let next = callback(didout) // reconcile
      if (next) {
        currentTask.callback = next
      } else {
        pop(taskQueue)
      }
    } else pop(taskQueue)

    currentTask = peek(taskQueue)
    currentTime = getTime()
  }

  if (currentTask) {
    return true
  } else {
    return false
  }
}
export function shouldYeild() {
  return getTime() >= frameDeadline
}

function getTime() {
  return performance.now()
}
