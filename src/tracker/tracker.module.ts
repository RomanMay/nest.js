import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TrackerRepository } from "./tracker.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([TrackerRepository]),

    ]
})

export class TrackerModule{}