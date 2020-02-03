import { performWork} from './reconciler'
import { push,pop,peek } from './task'

const taskQueue = []
let WIP = null
let currentCallback = null
let currentTask = null
let isPerformingWork = null


const getTime = () => performance.now()

export function scheduleWork(fiber){

  WIP = fiber
  scheduleCallback(performWork)
}

function scheduleCallback(callback){

  const startTime = getTime()
  let timeout = 5000
  const expirationTime = startTime + timeout


  const newTask = {
    expirationTime,
    startTime,
    callback
  }

  push(taskQueue,newTask)
  currentCallback = flushWork

  return newTask
}

function flushWork(hasTimeRemaining,initialTime){
  isPerformingWork = true
  try {
    return workLoop(hasTimeRemaining,initialTime)
  } finally {
    currentTask = null
    isPerformingWork = false
  }
}

function workLoop(hasTimeRemaining,initialTime){
  let currentTime = initialTime

  currentTask = taskQueue[0]
  while(currentTask){

    if(!hasTimeRemaining || shouldYeild()) {
      break
    }

    const callback = currentTask.callback

    if(currentTask !== null) {

      currentTask.callback = null
      const didout = currentTask.expirationTime <= currentTime
      const continuationCallback = callback(didout)
  
      if(typeof continuationCallback === 'function'){
        currentTask.callback = continuationCallback;
      }
      pop(taskQueue)
    } else {
      pop(taskQueue)
    }
    currentTask = peek(taskQueue)
  }

  if(currentTask !== null) {
    return true
  } else {
    return false
  }
}

export function shouldYeild() {
  return false
}


