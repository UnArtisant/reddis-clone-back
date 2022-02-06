import {Field, ObjectType} from "@nestjs/graphql";
import {UpdootError} from "../error/updoot.error";

@ObjectType()
export class UpdootResponse {
    @Field(() => Boolean)
    updoot: boolean;

    @Field(() => UpdootError, {nullable: true})
    errors?: UpdootError;
}