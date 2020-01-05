// createElement函数，A pragma is a compiler directive. It tells the compiler how it should handle the contents of a file.
// handle JSX differently.

// type 标签名 attrs 属性 剩余参数:children
/**
 *
 * @param {string} type 标签名
 * @param {object} attrs 属性对象
 */
export function createElement(type, attrs) {
  const props = attrs || {}
  let key = props.key || null
  let ref = props.ref || null
  const children = []

  // 处理children, 把children放到props上面
  for (let i = 2; i < arguments.length; i++) {
    let vnode = arguments[i]
    if (vnode == null || vnode === true || vnode === false) {
    } else if (typeof vnode === 'string' || typeof vnode === 'number') {
      children.push(createText(vnode))
    } else {
      children.push(vnode)
    }
  }

  if (children.length) {
    props.children = children.length === 1 ? children[0] : children
  }

  delete props.key
  delete props.ref

  return {
    type,
    props,
    key,
    ref
  }
}

function createText(vnode) {
  return { type: 'text', props: { textValue: vnode } }
}
