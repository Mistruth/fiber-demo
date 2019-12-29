import { getCurrentPriorityLevel } from '../scheduler'

export function requestCurrentTimeForUpdate() {
  return performance.now()
}

export function computeExpirationForFiber(currentTime, fiber, suspenseConfig) {
  const priorityLevel = getCurrentPriorityLevel()

  let expirationTime = computeAsyncExpiration(currentTime)

  return expirationTime
  // switch (priorityLevel) {
  //   // case ImmediatePriority:
  //   //   expirationTime = Sync
  //   //   break
  //   // case UserBlockingPriority:
  //   //   // TODO: Rename this to computeUserBlockingExpiration
  //   //   expirationTime = computeInteractiveExpiration(currentTime)
  //   //   break
  //   case NormalPriority:
  //   case LowPriority: // TODO: Handle LowPriority
  //     // TODO: Rename this to... something better.
  //     expirationTime =
  //     break
  //   case IdlePriority:
  //     expirationTime = Idle
  //     break
  //   default:
  // }
}

export const scheduler = scheduleUpdateOnFiber

export function scheduleUpdateOnFiber(fiber, expirationTime) {
  const root = markUpdateTimeFromFiberRoot(fiber, expirationTime)
}

function markUpdateTimeFromFiberToRoot(fiber, expirationTime) {
  if (fiber.expirationTime < expirationTime) {
    fiber.expirationTime = expirationTime
  }

  let alternate = fiber.alternate

  if (alternate !== null && alternate.expirationTime < expirationTime) {
    alternate.expirationTime = expirationTime
  }

  let node = fiber.return

  let root = null
  // if(node === null && fiber.tag === )
}
