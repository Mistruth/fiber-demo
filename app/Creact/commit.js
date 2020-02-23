import { DELETE, NOWORK, UPDATE, HOOKCOMPONENT, HOSTROOT, HOST } from './share'

export function commitWork(fiber, patchQueue) {
  // 提交阶段
  patchQueue.forEach(item => {
    if (item) commit(item)
  })

  fiber.done && fiber.done()
}

function commit(patch) {
  const op = patch.effectTag
  const tag = patch.tag

  if (op === DELETE) {
    // 提交副作用 销毁的生命周期
    while (tag === HOOKCOMPONENT) return patch.return
    // 删除节点
  } else if (tag === HOOKCOMPONENT) {
    // 提交副作用
  } else if (op === UPDATE) {
    // 更新dom上的属性 事件等
  } else {
    // PLACEMENT
    const node = getParentDomNode(patch)
    node.appendChild(patch.stateNode)
  }

  patch.effectTag = NOWORK
}

function getParentDomNode(patch) {
  const parentTag = patch.return.tag
  if (parentTag === HOST) {
    return patch.return.stateNode
  } else if (parentTag === HOOKCOMPONENT) {
    return getParentDomNode(patch.return)
  } else if (parentTag === HOSTROOT) {
    return patch.return.stateNode.dom
  }
}
