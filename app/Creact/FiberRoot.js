export function FiberRoot(dom, cb) {
  this.current = null
  this.expirationTime = 0
  this.dom = dom || null
  this.done = cb || null
}
