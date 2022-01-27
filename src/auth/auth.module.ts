import {Module} from "@nestjs/common";
import {UserResolver} from "./resolver/user.resolver";

@Module({
    imports: [],
    providers: [UserResolver],
})

export class AuthModule {}