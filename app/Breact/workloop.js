const EXPIRETIMEDUELINE = 5000

export function getCurrentTime() {
  return performance.now()
}

export function getExipreTime(initTime) {
  return initTime + EXPIRETIMEDUELINE
}

export function scheduleWork(fiber, expireTime) {
  console.log(fiber)
}
