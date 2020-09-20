import { TrackerEntity } from "../tracker.entity"

export class TrackerResponseDto {
    id: number

    startDate: Date

    isActive: boolean

    tracked: number

    constructor(tracker: TrackerEntity) {
        this.startDate = tracker.startDate
        this.isActive = tracker.isActive
        this.tracked = tracker.tracked
    }
}
