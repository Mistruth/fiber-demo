import { requestCurrentTimeForUpdate, scheduleWork } from './WooFiberWorkLoop'
import { createUpdate } from './WooUpdateQueue'

export function createContainer(
  containerInfo,
  tag,
  hydrate,
  hydrationCallbacks
) {
  return createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks)
}

export function updateContainer(element, container, parentComponent, callback) {
  // container 是fiber对象
  const current = contianer.current
  const currentTime = requestCurrentTimeForUpdate()

  const suspenseConfig = {}
  const expirationTime = computeExpirationForFiber(
    currentTime,
    current,
    suspenseConfig
  )

  const update = createUpdate(expirationTime, suspenseConfig)

  update.payload = { element }

  enqueueUpdate(current, update)
  scheduleWork(current, expirationTime)

  return expirationTime
}
