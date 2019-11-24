export function h(type, attrs) {
  // get attrs from component and split key & ref
  let props = attrs || {}
  let key = props.key || null
  let ref = props.ref || null
  let children = []

  for (let i = 2; i < arguments.length; i++) {
    let vnode = arguments[i]
    if (vode === null || vode === true || vode === false) {
    } else if (typeof vnode === "string" || typeof vode === "number") {
      children.push(createText(vode))
    } else {
      children.push(vode)
    }
  }

  if (children.length) {
    props.children = children.length === 1 ? children[0] : children
  }

  delete props.key
  delete props.ref
  return { type, props, key, ref }
}

export function createText(vnode) {
  return { type: "text", props: { nodeValue: vnode } }
}
