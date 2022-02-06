import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class UpdootError {

    @Field()
    title!: string;

    @Field()
    message!: string;
}