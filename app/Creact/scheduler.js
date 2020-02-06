import { performWorkOnRoot } from './reconciler'
import { push,pop,peek } from './task'

const taskQueue = []
let currentCallback = null
let currentTask = null
let frameLength = 16.6
let frameDeadline = 0
let isPerformingWork = false

export const rootFiber = []

const channel = new MessageChannel();
const port = channel.port2;
channel.port1.onmessage = performWork;


const getTime = () => performance.now()

export function scheduleWork(fiber){
  rootFiber[0] = fiber
  scheduleCallback(performWorkOnRoot)
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
  requestHostCallback(flushWork)

  return newTask
}

function performWork(){
  if (currentCallback !== null) {
    const currentTime = getTime();

    frameDeadline = currentTime + frameLength;

    let hasMoreWork = currentCallback(currentTime)

    if(hasMoreWork) {
      port.postMessage(null)
    } else {
      currentCallback = null
    }
  }
}

function flushWork(initialTime){
  isPerformingWork = true
  try {
    return workLoop(initialTime)
  } finally {
    currentTask = null
    isPerformingWork = false
  }
}

function workLoop(initialTime){
  let currentTime = initialTime

  currentTask = taskQueue[0]

  while(currentTask){
    if(currentTask.expirationTime > currentTime && shouldYeild()) {
      break
    }

    const callback = currentTask.callback

    if(currentTask !== null) {

      currentTask.callback = null
      const didout = currentTask.expirationTime <= currentTime
      const continuationCallback = callback(didout)
  
      if(typeof continuationCallback === 'function'){
        currentTask.callback = continuationCallback;
      } else {
        pop(taskQueue)
      }
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
  let res = getTime() >= frameDeadline
  return res
}

function requestHostCallback(cb){
  currentCallback = cb
  port.postMessage(null);
}


