import { NoWork } from './WooFiberExpirationTime'
import { NoPriority } from './WooPriority'

export function createFiberRoot(
  containerInfo,
  tag,
  hydrate,
  hydrationCallbacks
) {
  const root = new FiberRootNode(containerInfo, tag, hydrate)

  const uninitializedFiber = createHostRootFiber(tag)

  root.current = uninitializedFiber

  uninitializedFiber.startNode = root
  return root
}

class FiberRootNode {
  constructor(containerInfo, tag, hydrate) {
    this.tag = tag
    this.current = null

    this.containerInfo = containerInfo
    this.pendingChilren = null
    this.pingCache = null

    this.finishedExpirationTime = NoWork
    this.finishedWork = null
    this.timeoutHandle = null // ????

    this.context = null
    this.pendingContext = null

    this.hydrate = hydrate

    this.callbackNode = null

    this.callbackPriority = NoPriority

    this.firstPendingTime = NoWork

    this.firstSuspendedTime = NoWork

    this.lastSuspenedTime = NoWork
    this.nextKnownPendingLevel = NoWork
    this.lastPingedTime = NoWork
    this.lastExpiredTime = NoWork
  }
}
