import { FiberRoot } from './FiberRoot'
import { Fiber } from './Fiber'
import { reconcileWork } from './reconciler'
import { HOSTROOT } from './share'

let isScheduling = false

export function render(vnode, dom, callback) {
  const FiberRootNode = new FiberRoot(dom, callback)
  const current = (FiberRootNode.current = new Fiber(HOSTROOT, vnode))
  current.stateNode = FiberRootNode
  scheduleWork(current)
}

function scheduleWork(rootFiber) {
  if (!isScheduling) {
    isScheduling = true
    // 应当传入reconcile，根据情况调度
    reconcileWork(rootFiber)
  }
}
