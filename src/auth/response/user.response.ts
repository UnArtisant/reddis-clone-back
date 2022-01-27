import {Field, ObjectType} from "@nestjs/graphql";
import {User} from "../entities/user.entity";
import {FieldError} from "../error/field.error";

@ObjectType()
export class UserResponse {
    @Field(() => User, {nullable: true})
    user?: User;

    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];
}