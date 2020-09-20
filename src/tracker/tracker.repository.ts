import { EntityRepository, Repository } from "typeorm";

import { TrackerEntity } from "./tracker.entity";

@EntityRepository(TrackerEntity)
export class TrackerRepository extends Repository<TrackerEntity> {

    async getTrackerByTaskId(taskId: number, userId: number): Promise<TrackerEntity> {
        const tracker = this.createQueryBuilder('tracker')
            .leftJoinAndSelect('tracker.task', 'task')
            .leftJoinAndSelect('task.author', 'user')
            .where('task.id = :taskId', { taskId })
            .andWhere('(task.assignedUser = :userId OR task.authorId = :userId)', { userId })
            .getOne()
        return tracker
    }


}