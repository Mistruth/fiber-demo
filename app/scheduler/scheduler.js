import { pop, push, peek } from './task'

const taskQueue = []
let currentCallback = null
let frameDeadLine
let frameLength = 5
let currentTask

const channel = new MessageChannel()

const port = channel.port2;
channel.port1.onmessage = performWork;

export function scheduleCallback(callback){
  
  const currentTime = getTime()
  const timeout = 5000
  const expirationTime = currentTime + timeout

  const newTask = {
    callback,
    expirationTime,
    startTime: currentTime
  }
  
  push(taskQueue,newTask)
  requestHostCallback(flushWork)
  
  return newTask
}

function getTime(){
  return performance.now()
}

function flushWork(initialTime){
  try {
    return workLoop(initialTime)
  } finally {
    currentTask = null
  }
}

function workLoop(initialTime){
  
  let currentTime = initialTime
  currentTask = peek(taskQueue)

  while(currentTask){
    
    const expirationTime = currentTask.expirationTime
    if(expirationTime > currentTime && shouldYeild()) {
      break
    }

    const callback = currentTask.callback

    if(callback) {
      const didout = expirationTime <= currentTime
      const next = callback(didout)
      
      if(typeof next === 'function') {
  
      } else {
        pop(taskQueue)
      }
    } else {
      pop(taskQueue)
    }

    currentTask = peek(taskQueue)
  }

  if(currentTask) {
    return true
  } else {
    return false
  }

}

function performWork(){
  if(currentCallback) {
    const currentTime = getTime()
    frameDeadLine = currentTime + frameLength
      
    const hasMoreWork = currentCallback(currentTime)

    if(hasMoreWork) {
      port.postMessage(null)
    } else {
      currentCallback = null
    }
  }
}

function requestHostCallback(callback){
  currentCallback = callback
  port.postMessage(null)
}

function shouldYeild(){
  return getTime() > frameDeadLine
}