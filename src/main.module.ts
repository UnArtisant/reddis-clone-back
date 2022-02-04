import { Module} from '@nestjs/common';
import {AppModule} from "./app/app.module";
import {PostModule} from "./post/post.module";
import {AuthModule} from "./auth/auth.module";
import {UpdootModule} from "./upboot/updoot.module";


@Module({
    imports: [
        AppModule,
        PostModule,
        AuthModule,
        UpdootModule
    ],
    providers: [],
})

export class MainModule {}
