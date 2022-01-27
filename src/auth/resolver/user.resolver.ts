import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {User} from "../entities/user.entity";
import {UsernamePasswordInput} from "../input/username.password.input";
import {EntityManager} from "@mikro-orm/core";
import * as argon2 from "argon2";
import {UserResponse} from "../response/user.response";

@Resolver(of => User)
export class UserResolver {

    constructor(
        private readonly em: EntityManager
    ) {
    }

    //TODO add schema validation
    @Mutation(() => UserResponse)
    async register(
        @Args("params") params: UsernamePasswordInput
    ): Promise<UserResponse> {
        try {
            const hashedPassword = await argon2.hash(params.password)
            const user = this.em.create(User, {...params, password: hashedPassword})
            await this.em.persistAndFlush(user)
            return {user: user}
        } catch (e) {
            return {
                errors: [{field: "password", message: "Invalid password"}]
            }
        }
    }

    //TODO add schema validation
    @Mutation(() => UserResponse)
    async login(
        @Args("params") params: UsernamePasswordInput
    ): Promise<UserResponse> {
        const user = await this.em.findOne(User, {username: params.username})
        if (!user) {
            return {
                errors: [{field: "username", message: "User not found"}]
            }
        }
        const isCorrect = await argon2.verify(user.password, params.password)
        if (!isCorrect) {
            return {
                errors: [{field: "password", message: "Wrong credential"}]
            }
        }
        return {user: {...user}}
    }
}