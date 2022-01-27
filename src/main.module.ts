import { Module} from '@nestjs/common';
import {AppModule} from "./app/app.module";
import {PostModule} from "./post/post.module";
import {AuthModule} from "./auth/auth.module";


@Module({
    imports: [
        AppModule,
        PostModule,
        AuthModule
    ],
    providers: [],
})

export class MainModule {}
