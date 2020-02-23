import { HOSTROOT } from './share'

export function createUpdate(vnode, priority) {
  const currentTime = performance.now()
  const expirationTime = currentTime + 5000
  return {
    vnode,
    priority,
    expirationTime
  }
}

export function enqueue(current, update) {
  const currentUpdateQueue = current.updateQueue
  if (!currentUpdateQueue) {
    current.updateQueue = [update]
  } else {
    current.updateQueue.push(update)
  }
}

export function processUpdateQueue(fiber) {
  if (fiber.tag !== HOSTROOT) throw new Error('')

  const updateQueue = fiber.updateQueue

  fiber.children = updateQueue[0].vnode
}
