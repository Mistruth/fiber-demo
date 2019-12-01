import { createFiberRoot } from './WooFiberRoot'
import { NoWork, NoEffect } from './WooFiberExpirationTime'

export function createHostRootFiber(tag) {
  return createFiberRoot('HOSTROOT', null, null, '0b0000')
}

export function createFiber(tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode)
}

class FiberNode {
  constructor(tag, pendingProps, key, mode) {
    this.tag = tag
    this.key = key
    this.elementType = null
    this.startNode = null

    // Fiber
    this.return = null
    this.child = null
    this.sibiling = null
    this.index = 0

    this.ref = null

    this.pendingProps = pendingProps
    this.memoizedProps = null
    this.updateQueue = null
    this.memorizedState = null
    this.dependencies = null
    this.mode = mode

    // Effects
    this.effectTag = NoEffect
    this.nextEffect = null

    this.firstEffect = null
    this.lastEffect = null

    this.expirationTime = NoWork
    this.childExpirationTime = NoWork

    this.alternate = null
  }
}
