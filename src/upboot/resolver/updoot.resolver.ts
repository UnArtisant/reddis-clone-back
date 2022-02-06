import {Args, Int, Mutation, Resolver} from "@nestjs/graphql";
import {Updoot} from "../entity/updoot.entity";
import {EntityManager} from "@mikro-orm/core";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../auth/service/jwt-auth.guard";
import {CurrentUser} from "../../auth/decorator/user.decorator";
import {User} from "../../auth/entities/user.entity";
import {Post} from "../../post/entities/post.entity";
import {UpdootError} from "../error/updoot.error";
import {UpdootResponse} from "../response/updoot.response";

@Resolver(Updoot)
export class UpdootResolver {

    constructor(
        private readonly em: EntityManager
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => UpdootResponse)
    async vote(
        @Args("postId", {type: () => Int}) postId: number,
        @Args('value', {type: () => Int}) value: number,
        @CurrentUser() user: User
    ): Promise<UpdootResponse> {

        const updoot = value !== -1;
        const _value = updoot ? 1 : -1

        const post = await this.em.findOne(Post, {_id: postId})

        if (!post) {
            return {
                updoot: false,
                errors: {
                    title: "Post not found",
                    message: "No post have been found"
                }
            }
        }

        const isUpdoot = await this.em.findOne(Updoot, {user: user._id, post: post._id})

        if (isUpdoot && isUpdoot.value === _value) {
            return {
                updoot: false,
                errors: {
                    title: "Post Updooted",
                    message: "Sorry, you can't updoot a post that you already react with."
                }
            }
        } else if (isUpdoot && isUpdoot.value !== _value) {
            isUpdoot.value = _value
            post.points += _value
            await this.em.flush()
        } else {
            const entity = this.em.create(Updoot, {
                value: _value
            })
            entity.user = user
            entity.post = post
            post.points += _value
            await this.em.persistAndFlush(entity)
        }
        return {
            updoot: true
        }
    }
}