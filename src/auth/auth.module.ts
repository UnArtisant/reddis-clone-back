import {Module} from "@nestjs/common";
import {UserResolver} from "./resolver/user.resolver";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./service/jwt.strategy";

@Module({
    imports: [JwtModule.register({ secret: process.env.JWT_SECRET })],
    providers: [UserResolver, JwtStrategy],
})

export class AuthModule {}