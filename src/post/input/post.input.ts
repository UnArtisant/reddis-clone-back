import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class PostInput {
    @Field()
    text: string;

    @Field()
    title: string;
}