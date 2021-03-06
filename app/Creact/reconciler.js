import { Fiber } from './Fiber'
import {
  HOST,
  HOOKCOMPONENT,
  CLASSCOMPONENT,
  HOSTROOT,
  DELETE,
  UPDATE,
  PLACEMENT
} from './share'
import { commitWork } from './commit'
import { shouldYeild, rootFiber } from './scheduler'
import { processUpdateQueue } from './update'
import { createElement } from './dom'
import { resetCursor } from './hooks'

let WIP = null // 当前正在工作的WIP
let commitQueue = []
let preCommit = null
let currentHooksFiber = null

export const CurrentRootFiber = []

export function performWorkOnRoot(didout = true) {
  // 构建fiber树

  WIP = rootFiber[0]

  while (WIP && (!shouldYeild() || didout)) {
    WIP = performUnitOfWork(WIP)
  }

  if (!didout && WIP) {
    rootFiber[0] = WIP
    return performWorkOnRoot.bind(null)
  }

  if (preCommit) {
    commitWork(preCommit, commitQueue)
  }

  commitQueue = []
  preCommit = null

  return null
}

function performUnitOfWork(fiber) {
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
  processUpdateQueue(fiber)
  reconcileChildren(fiber)
}

function updateHOST(fiber) {
  if (fiber.type) {
    fiber.stateNode = createElement(fiber)
  }

  const hostChildren = fiber.props.children || null

  fiber.children = hostChildren
  reconcileChildren(fiber)
}

function updateHooks(fiber) {
  // 当前WIP给到hooks

  currentHooksFiber = fiber
  const Component = fiber.type(fiber.props)
  resetCursor()

  fiber.stateNode = fiber.type
  fiber.children = Component
  reconcileChildren(fiber)
}

function updateClass(fiber) {}

// link + diff
function reconcileChildren(fiber) {
  if (!fiber.children) return
  let oldChildren = fiber.oldChildren
  let newChildren = (fiber.oldChildren = hashy(fiber.children))
  let store = {}

  // diff
  for (const k in oldChildren) {
    let oldChildVnode = oldChildren[k]
    let newChildVnode = newChildren[k]

    // TODO 可判断key
    if (oldChildVnode.type === newChildVnode.type) {
      store[k] = newChildVnode
    } else {
      const emptyFiber = new Fiber(null, null)
      emptyFiber.return = fiber
      emptyFiber.effectTag = DELETE
      commitQueue.push(emptyFiber)
    }
  }

  let prevFiber = null

  // diff
  for (const k in newChildren) {
    let oldChildVnode = store[k]
    let newChildVnode = newChildren[k]

    // TODO 通过判断创建或复用alternate Fiber
    // 这里应该是根据情况重新创建
    const newFiber = new Fiber(null, null)

    if (typeof newChildVnode.type === 'function') {
      newFiber.tag = HOOKCOMPONENT
    } else {
      newFiber.tag = HOST
    }
    newFiber.type = newChildVnode.type
    newFiber.key = newChildVnode.key
    newFiber.props = newChildVnode.props
    newFiber.return = fiber

    if (oldChildVnode) {
      newFiber.effectTag = UPDATE
      newFiber.oldProps = oldChildVnode.props || {}
      commitQueue.push(newFiber)
    } else if (newChildVnode) {
      newFiber.effectTag = PLACEMENT
      commitQueue.push(newFiber)
    }

    // 链接链表
    if (prevFiber) {
      prevFiber.sibling = newFiber
    } else {
      fiber.child = newFiber
    }
    prevFiber = newFiber
  }

  if (prevFiber) prevFiber.sibling = null
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

function hashy(arr) {
  if (!arr) return {}
  if (arr.pop) {
    const obj = {}
    arr.forEach((item, index) => {
      const hash = '.' + index
      obj[hash] = item
    })
    return obj
  }
  return { '.0': arr }
}

export function getCurrentHookFiber() {
  return currentHooksFiber
}
