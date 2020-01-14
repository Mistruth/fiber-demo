export function Fiber(tag, vnode) {
  this.expirationTime = null
  this.updateQueue = null

  this.tag = tag
  this.type = null
  this.startNode = null
  this.return = null
  this.child = null
  this.alternate = null

  this.children = vnode
}
