import {Args, Int, Mutation, Query, ResolveField, Resolver, Root} from "@nestjs/graphql";
import {Post} from "../entities/post.entity";
import {EntityManager, MikroORM} from "@mikro-orm/core";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../auth/service/jwt-auth.guard";
import {PostInput} from "../input/post.input";
import {CurrentUser} from "../../auth/decorator/user.decorator";
import {User} from "../../auth/entities/user.entity";
import {InjectRepository} from "@mikro-orm/nestjs";
import {EntityRepository} from "@mikro-orm/postgresql";
import {PaginatedPost} from "../type/paginated.post";

@Resolver(Post)
export class PostResolver {
    constructor(
        private readonly em: EntityManager,
        @InjectRepository(Post)
        private readonly postRepository: EntityRepository<Post>,
    ) {
    }

    @ResolveField(() => String)
    textSnippet(@Root() root: Post) {
        return root.text.slice(0,50)
    }

    @Query(() => PaginatedPost)
    async posts(
        @Args('limit', { type: () => Int }) limit: number,
        @Args('offset', {nullable: true, type: () => Int}) offset: number = 0
    ): Promise<PaginatedPost> {
        const qb = this.postRepository
            .createQueryBuilder("p")
            .orderBy({createdAt: "DESC"})
            .limit(limit + 1)
            .offset((limit * offset))

        const result = await qb.getResult()
        await this.postRepository.populate(result, ['user']);
        return {posts: result.slice(0, limit), hasMore: result.length > limit}
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => Post, {nullable: true})
    async post(
        @Args('id') id: number,
    ): Promise<Post | null> {
        return await this.em.findOne(Post, {_id: id})
    }

    @Mutation(() => Post)
    @UseGuards(JwtAuthGuard)
    async createPost(
        @Args("options") options: PostInput,
        @CurrentUser() user: User
    ): Promise<Post> {
        const post = this.em.create(Post, {...options})
        post.user = user
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