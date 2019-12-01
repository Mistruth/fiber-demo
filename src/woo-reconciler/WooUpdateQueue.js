export const UpdateState = 0
export const ReplaceState = 1
export const ForceUpdate = 2
export const CaptureUpdate = 3

export function createUpdate(expirationTime, suspenseConfig) {
  let update = {
    expirationTime,
    suspenseConfig,
    tag: UpdateStat,
    payload: null,
    callback: null,

    next: null,
    nextEffect: null
  }
  return update
}

export function enqueueUpdate(fiber, update) {
  const alternate = fiber.alternate

  let queue1
  let queue2

  if (alternate === null) {
    queue1 = fiber.updateQueue
    queue2 = null
    if (queue1 === null) {
      queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState)
    }
  } else {
    queue1 = fiber.updateQueue
    queue2 = alternate.updateQueue

    if (queue1 === null) {
      if (queue2 === null) {
        queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState)
        queue2 = alternate.updateQueue = createUpdateQueue(
          alternate.memoizedState
        )
      } else {
        queue1 = fiber.updateQueue = cloneUpdateQueue(queue2)
      }
    } else {
      if (queue2 === null) {
        queue2 = alternate.updateQueue = cloneUpdateQueue(queue1)
      }
    }
  }

  if (queue2 === null || queue1 === queue2) {
    appendUpdateToQueue(queue1, update)
  } else {
    if (queue1.lastUpdate === null || queue2.lastUpdate === null) {
      appendUpdateToQueue(queue1, update)
      appendUpdateToQueue(queue2, update)
    } else {
      appendUpdateToQueue(queue1, update)
      queue2.lastUpdate = update
    }
  }
}

export function createUpdateQueue(baseState) {
  const queue = {
    baseState,
    firstUpdate: null,
    lastUpdate: null,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  }
  return queue
}

export function cloneUpdateQueue(currentQueue) {
  const queue = {
    baseState: currentQueue.baseState,
    firstUpdate: currentQueue.firstUpdate,
    lastUpdate: currentQueue.lastUpdate,

    // TODO: With resuming, if we bail out and resuse the child tree, we should
    // keep these effects.
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,

    firstEffect: null,
    lastEffect: null,

    firstCapturedEffect: null,
    lastCapturedEffect: null
  }
  return queue
}

function appendUpdateToQueue(queue, update) {
  if (queue.lastUpdate === null) {
    queue.firstUpdate = queue.lastUpdate = update
  } else {
    queue.lastUpdate.next = update
    queue.lastUpdate = update
  }
}
