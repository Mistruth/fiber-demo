import { reconcileWork } from './reconciler'

let isScheduling = false
let frameLine
let WIP

export function scheduleWork(rootFiber) {
 
  WIP = rootFiber
  if(!isScheduling) {
    isScheduling = true
    
    wookLoop(rootFiber)
  }
  isScheduling = false
  WIP = null
  // reconcileWork(rootFiber)
}

function wookLoop(){
  const updateQueue = WIP.updateQueue
  // 安排工作
  const update = updateQueue.pop()

  let nextUnitOfWork = update
  while(nextUnitOfWork!== null && !shouldYeild()) {
    nextUnitOfWork = performUnitOfWork(WIP,update)
  }

  if(nextUnitOfWork) {
    setTimeout(wookLoop,0)
  }
}

function performUnitOfWork(fiber,update){
  fiber.children = update.vnode
  fiber.expirationTime = update.expirationTime

  const currentTime = getTime()
  frameLine = currentTime + 5
  const didout = currentTime > fiber.expirationTime

  let nextUpdate = reconcileWork(fiber, didout)
  
  if(nextUpdate === 'NOTCOMPLETE') {
    return update
  }

  nextUpdate = fiber.updateQueue.pop()
  
  if(nextUpdate) {
    return true
  } else {
    return null
  }
}

// 每一帧
export function shouldYeild() {
  return getTime() >= frameLine
}

const getTime = () => performance.now()
