import { FiberRoot } from './FiberRoot'
import { Fiber } from './Fiber'
import { HOSTROOT,NormalPriority } from './share'
import { scheduleWork } from './scheduler'
import { createUpdate,enqueue } from './update'

export function render(vnode, dom, callback) {
  const FiberRootNode = new FiberRoot(dom, callback)
  const current = (FiberRootNode.current = new Fiber(HOSTROOT, null))
  const update = createUpdate(vnode,NormalPriority)

  current.stateNode = FiberRootNode

  enqueue(current,update)
  scheduleWork(current)
}