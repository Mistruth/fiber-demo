import { getCurrentHookFiber } from './reconciler'

let cursor = 0

export function resetCursor(){
  cursor = 0
}

export function useState(initState) {
  return useReducer(null, initState)
}

export function useReducer(reducer, initState) {
  const fiber = getCurrentHookFiber()

  const hooks = fiber.hooks || (fiber.hooks = {list: []})

  const setter = (value) => {
    const newValue = reducer ? reducer(value) : value
  }
  
  
  
  
  
  return [initState]
}