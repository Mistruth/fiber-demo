var NoPriority = 0
var Scheduler_ImmediatePriority = 1
var Scheduler_UserBlockingPriority = 2
var Scheduler_NormalPriority = 3
var Scheduler_LowPriority = 4
var Scheduler_IdlePriority = 5

function Scheduler_getCurrentPriorityLevel() {
  return Scheduler_NormalPriority
}

export function getCurrentPriorityLevel() {
  switch (Scheduler_getCurrentPriorityLevel()) {
    case Scheduler_ImmediatePriority:
      return Scheduler_ImmediatePriority
    case Scheduler_UserBlockingPriority:
      return Scheduler_UserBlockingPriority
    case Scheduler_NormalPriority:
      return Scheduler_NormalPriority
    case Scheduler_LowPriority:
      return Scheduler_LowPriority
    case Scheduler_IdlePriority:
      return Scheduler_IdlePriority
    default:
      invariant(false, 'Unknown priority level.')
  }
}
