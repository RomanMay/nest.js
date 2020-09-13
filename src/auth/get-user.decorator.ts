import { createParamDecorator, ExecutionContext } from "@nestjs/common"

import { UserEntity } from "./user.entity"

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest()
    console.log('get user', req.user)
    return req.user
});