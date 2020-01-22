import { Fiber } from './Fiber'
import { HOST, HOOKCOMPONENT, CLASSCOMPONENT, HOSTROOT, DELETE, UPDATE, PLACEMENT} from './share'
import { commitWork } from './commit'
import { shouldYeild } from './schedule'

let WIP = null // 当前正在工作的WIP
let commitQueue = []

let preCommit = null

export function reconcileWork(RootFiber, didout = true) {
  // 构建fiber树
  WIP = RootFiber

  while (WIP && (didout || !shouldYeild())) {
    WIP = reconcile(WIP)
  }

  if(WIP) {
    // 中止，重来
   return 'NOTCOMPLETE'
  }

  if (preCommit) {
    commitWork(preCommit,commitQueue)
    return null
  }
}

function reconcile(fiber) {
  switch (fiber.tag) {
    case HOST:
      updateHOST(fiber)
      break
    case HOSTROOT:
      updateHOSTROOT(fiber)
      break
    case HOOKCOMPONENT:
      updateHooks(fiber)
      break
    case CLASSCOMPONENT:
      updateClass(fiber)
      break
  }

  // walk
  if (fiber.child) return fiber.child
  while (fiber) {
    // 已经遍历到根节点
    if (fiber.tag === HOSTROOT) {
      preCommit = fiber
    }

    if (fiber.sibling) {
      return fiber.sibling
    }
    fiber = fiber.return
  }
}

function updateHOSTROOT(fiber) {
  reconcileChildren(fiber, fiber.children)
}

function updateHOST(fiber) {
  if (fiber.type) {
    if(fiber.type === 'text') {
      fiber.stateNode = document.createTextNode('')
      fiber.stateNode.nodeValue = fiber.props.textValue
    } else {
      fiber.stateNode = document.createElement(fiber.type)
    }
  }

  const hostChildren = fiber.props.children || null

  fiber.children = hostChildren
  reconcileChildren(fiber)
}

function updateHooks(fiber) {
  // const children = fiber.type(fiber.children.props || {})
  const Component = fiber.type(fiber.props)
  fiber.stateNode = fiber.type
  fiber.children = Component
  reconcileChildren(fiber)
}

function updateClass(fiber) {}

// link + diff
function reconcileChildren(fiber) {
  
  if(!fiber.children) return
  let oldChildren = fiber.oldChildren
  let newChildren = fiber.oldChildren = hashy(fiber.children)
  let store = {}

  // diff
  for(const k in oldChildren) {
    let oldChildVnode = oldChildren[k]
    let newChildVnode = newChildren[k]

    // TODO 可判断key
    if(oldChildVnode.type === newChildVnode.type) {
      store[k] = newKid
    } else {
      const emptyFiber = new Fiber(null,null)
      emptyFiber.return = fiber
      emptyFiber.effectTag = DELETE
      commitQueue.push(emptyFiber)
    }
  }

  let prevFiber = null
  
  // diff
  for(const k in newChildren) {
    let oldChildVnode = store[k]
    let newChildVnode = newChildren[k]

    // TODO 通过判断创建或复用alternate Fiber
    const newFiber = new Fiber(null,null)
    
    if(typeof newChildVnode.type === 'function') {
      newFiber.tag = HOOKCOMPONENT
    } else {
      newFiber.tag = HOST
    }
    newFiber.type = newChildVnode.type
    newFiber.key = newChildVnode.key
    newFiber.props = newChildVnode.props
    newFiber.return = fiber

    if(oldChildVnode) {
      newFiber.effectTag = UPDATE
      newFiber.oldProps = oldChildVnode.props || {}
      commitQueue.push(newFiber)
    } else if(newChildVnode){
      newFiber.effectTag = PLACEMENT
      commitQueue.push(newFiber)
    }

    // 链接链表
    if(prevFiber) {
      prevFiber.sibling = newFiber
    } else {
      fiber.child = newFiber
    }
    prevFiber = newFiber
  }

  if(prevFiber) prevFiber.sibling = null

}

function createWorkInProgress(fiber) {
  const obj = {
    expirationTime: fiber.expirationTime,
    type: fiber.type,
    tag: fiber.tag,
    stateNode: fiber.stateNode,
    return: fiber.return,
    child: fiber.child,
    children: fiber.children,
    updateQueue: fiber.updateQueue,
    oldChildren: fiber.oldChildren,
    effectTag: fiber.effectTag,
    props: fiber.props,
    oldProps: fiber.props
  }
  obj.current = fiber
  fiber.alternate = obj
  return obj
}

function hashy(arr){
  if(!arr) return {}
  if(arr.pop) {
    const obj = {}
    arr.forEach((item,index) =>{
      const hash = '.' + index
      obj[hash] = item
    })
    return obj
  }
  return {'.0':arr}
}