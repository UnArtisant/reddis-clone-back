import {Module} from "@nestjs/common";
import {PostResolver} from "./resolver/post.resolver";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {Post} from "./entities/post.entity";

@Module({
    imports: [MikroOrmModule.forFeature([Post])],
    providers: [PostResolver],
})

export class PostModule {}