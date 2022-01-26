import {Query, Resolver} from "@nestjs/graphql";
import {Post} from "../entities/post.entity";
import {EntityManager} from "@mikro-orm/core";

@Resolver(of => Post)
export class UserResolver {
    constructor(
        private readonly em: EntityManager,
    ) {
    }
    @Query(() => [Post])
    async posts(): Promise<Post[]> {
        return await this.em.find(Post, {})
    }
}