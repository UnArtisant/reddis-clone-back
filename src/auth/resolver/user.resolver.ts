import {Args, Mutation, Resolver, Query} from "@nestjs/graphql";
import {User} from "../entities/user.entity";
import {UsernamePasswordInput} from "../input/username.password.input";
import {EntityManager} from "@mikro-orm/core";
import * as argon2 from "argon2";
import {UserResponse} from "../response/user.response";
import {JwtService} from "@nestjs/jwt";
import {CurrentUser} from "../decorator/user.decorator";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../service/jwt-auth.guard";

@Resolver(of => User)
export class UserResolver {

    constructor(
        private readonly em: EntityManager,
        private jwtService: JwtService
    ) {
    }


    @Query(() => User)
    @UseGuards(JwtAuthGuard)
    async user(@CurrentUser() user: User): Promise<User | null> {
        return user
    }

    @Mutation(() => UserResponse)
    async register(
        @Args("params") params: UsernamePasswordInput
    ): Promise<UserResponse> {
        try {
            const hashedPassword = await argon2.hash(params.password)
            const user = this.em.create(User, {...params, password: hashedPassword})
            await this.em.persistAndFlush(user)
            const access_token = this.jwtService.sign({...user})
            return {user: {...user, access_token}}
        } catch (e) {
            return {
                errors: [{field: "password", message: "Invalid password"}]
            }
        }
    }

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
        const access_token = this.jwtService.sign({...user})
        return {user: {...user, access_token}}
    }
    @Mutation(() => Boolean)
     logout()  {
        return true
    }
}