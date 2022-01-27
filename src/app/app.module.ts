import {Global, Module} from "@nestjs/common";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {ConfigModule} from "@nestjs/config";
import {GraphQLModule} from "@nestjs/graphql";
import {__prod__} from "./constant/global";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";

@Global()
@Module({
    imports: [
        MikroOrmModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        GraphQLModule.forRoot({
            debug: !__prod__,
            playground: !__prod__,
            autoSchemaFile: 'schema.gql'
        }),
        PassportModule,
    ],
    providers: [],
})

export class AppModule {}