export function Fiber(tag, vnode) {
  this.expirationTime = null
  this.updateQueue = null

  this.tag = tag
  this.type = null
  this.stateNode = null
  this.return = null
  this.child = null


  this.props = null;
  this.oldProps = null;

  // 副作用
  this.effectTag = null
  // 另一个节点
  this.alternate = null

  // 携带下一个props
  this.children = vnode
  this.oldChildren = null
}
