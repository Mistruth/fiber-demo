const [HOST] = [0]

export function Fiber(tag, vnode) {
  this.expirationTime = null
  this.updateQueue = null

  this.type = tag
  this.startNode = null
  this.return = null
  this.child = null
  this.alternate = null
  this.payload = {
    elements: vnode
  }
}
