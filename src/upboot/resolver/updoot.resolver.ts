import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {Updoot} from "../entity/updoot.entity";
import {EntityManager} from "@mikro-orm/core";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../auth/service/jwt-auth.guard";
import {CurrentUser} from "../../auth/decorator/user.decorator";
import {User} from "../../auth/entities/user.entity";
import {Post} from "../../post/entities/post.entity";

@Resolver(Updoot)
export class UpdootResolver {

    constructor(
        private readonly em: EntityManager
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async vote(
        @Args("postId") postId: number,
        @Args('value') value: number,
        @CurrentUser() user: User
    ) {
        const updoot = value !== -1;
        const _value = updoot ? 1 : -1
        const post = await this.em.findOne(Post, {_id: postId})
        const entity = this.em.create(Updoot, {
            value: _value
        })
        entity.user = user
        entity.post = post
        post.points += _value
        await this.em.persistAndFlush(entity)
        return true
    }
}