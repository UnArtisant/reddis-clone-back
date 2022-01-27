import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class UsernamePasswordInput {
    @Field()
    password: string

    @Field()
    username: string
}