import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {Post} from "../entities/post.entity";
import {EntityManager} from "@mikro-orm/core";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../auth/service/jwt-auth.guard";

@Resolver(of => Post)
export class PostResolver {
    constructor(private readonly em: EntityManager) {
    }

    @Query(() => [Post])
    async posts(): Promise<Post[]> {
        return await this.em.find(Post, {})
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => Post, {nullable: true})
    async post(
        @Args('id') id: number,
    ): Promise<Post | null> {
        return await this.em.findOne(Post, {_id: id})
    }

    @Mutation(() => Post)
    async createPost(
        @Args("title") title: string,
        @Args("text") text: string,
    ): Promise<Post> {
        const post = this.em.create(Post, {title, text})
        await this.em.persistAndFlush(post)
        return post
    }

    @Mutation(() => Boolean)
    async deletePost(
        @Args("id") id: number,
    ): Promise<boolean> {
        try {
            await this.em.nativeDelete(Post, { _id: id})
        } catch (e) {
            return false
        }
        return true
    }
}