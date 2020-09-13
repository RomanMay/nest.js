import { EntityRepository, Repository } from "typeorm";

import { LogEntity } from "./logs.entity";

@EntityRepository(LogEntity)
export class LogsRepository extends Repository<LogEntity> {

}