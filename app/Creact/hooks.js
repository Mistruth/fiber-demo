import { getCurrentHookFiber } from './reconciler'
import { scheduleWork } from './scheduler'

let cursor = 0

export function resetCursor() {
  cursor = 0
}

export function useState(initState) {
  return useReducer(null, initState)
}

export function useReducer(reducer, initState) {
  const fiber = getCurrentHookFiber()
  const hooks = fiber.hooks || (fiber.hooks = { stateList: [] })

  if (cursor >= hooks.stateList.length) {
    hooks.stateList.push({})
  }

  const oldState = hooks.stateList[cursor]

  const setter = value => {
    const newValue = reducer ? reducer(value) : value

    if (newValue !== oldState.value) {
      oldState.value = newValue
      scheduleWork(fiber)
    }
  }

  if (!oldState.value) {
    oldState.value = initState
  }

  cursor++

  return [oldState.value, setter]
}
