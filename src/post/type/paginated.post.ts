import {Field, ObjectType} from "@nestjs/graphql";
import {Post} from "../entities/post.entity";

@ObjectType()
export class PaginatedPost {
    @Field(() => [Post])
    posts: Post[]

    @Field()
    hasMore: boolean
}