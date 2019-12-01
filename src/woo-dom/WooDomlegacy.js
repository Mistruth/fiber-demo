import { createLegacyRoot } from './WooRoot'

export function render(element, container, callback) {
  return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false,
    callback
  )
}

function legacyRenderSubtreeIntoContainer(
  parentComponent,
  children,
  container,
  forceHydrate = false,
  callback
) {
  let root = container._rootContainer
  let fiberRoot

  if (!root) {
    // 这里拿到Fiber_root对象
    root = container._rootContainer = legacyCreatRootFromDomContainer(
      container,
      forceHydrate
    )
    fiberRoot = root._interalRoot

    unbatchedUpdates(() => {
      updateContainer(children, fiberRoot, parentComponent, callback)
    })
  } else {
    fiberRoot = root._interalRoot
    updateContainer(children, fiberRoot, parentComponent, callback)
  }

  return getPublicRootInstance(fiberRoot)
}

function legacyCreatRootFromDomContainer(container, forceHydrate) {
  if (!forceHydrate) {
    let rootSibling

    while ((rootSibling = container.lastChild)) {
      container.removeChild(rootSibling)
    }
  }

  return createLegacyRoot(container, forceHydrate)
}
