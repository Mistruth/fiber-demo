const WOO_ELEMENT_TYPE = 'WOO'

export function createElement(type, config, children) {
  const props = {}

  const key = null
  const ref = null

  if (config != null) {
    for (propName in config) {
      props[propsName] = config[propsName]
    }

    const childrenLength = arguments.length - 2

    if (childrenLength === 1) {
      props.children = children
    } else if (childrenLength > 1) {
      const childArray = new Array(childrenLength)

      for (let i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2]
      }
      props.children = childArray
    }

    return WooElement(type, key, ref, props)
  }
}

export function WooElement(type, key, ref, props) {
  return {
    $$typeof: WOO_ELEMENT_TYPE,
    type,
    key,
    ref,
    props
  }
}
