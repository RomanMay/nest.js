import { EntityRepository, Repository } from "typeorm";

import { LogEntity } from "./logs.entity";

@EntityRepository(LogEntity)
export class LogsRepository extends Repository<LogEntity> {

    async getLogs(projectId: number): Promise<LogEntity[]> {

        const logs = await this.createQueryBuilder("log")
            .leftJoinAndSelect('log.task', 'task')
            .where('task."projectId" = :projectId', { projectId })
            .getMany()

        return logs
    }




}