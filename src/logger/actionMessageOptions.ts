class TaskStatuses {
    old: string
    new: string
}

export class ActionMessageOptions {
    taskStatuses?: TaskStatuses
    assignedUserId?: number
    startTrackingDate?: Date
    trackedTime?: number
 }
