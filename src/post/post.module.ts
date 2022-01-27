import {Module} from "@nestjs/common";
import {PostResolver} from "./resolver/post.resolver";

@Module({
    imports: [],
    providers: [PostResolver],
})

export class PostModule {}