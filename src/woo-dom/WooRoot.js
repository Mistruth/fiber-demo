export function createLegacyRoot(container, option) {
  return new WooDomBlockingRoot(container, legacy, option)
}

class WooDomBlockingRoot {
  constructor(container, tag, option) {
    this._internalRoot = createRootImpl(container, tag, option)
  }

  render(children, callback) {
    const root = this._internalRoot

    const cb = callback
    // 从fiber中拿
    updateContainer(children, root, null, cb)
  }

  unmount(callback) {
    const root = this._internalRoot

    const cb = callback

    const contianer = root.contianerInfo

    updateContianer(null, root, null, () => {})
  }
}

function createRootImpl(container, tag, options) {
  const hydrate = options != null && options.hydrate === true

  const hydrationCallbacks =
    (options != null && options.hydrationOptions) || null
  // 从fiber中拿
  const root = createContainer(container, tag, hydrate, hydrationCallbacks)

  return root
}
