import {Global, Module} from '@nestjs/common';
import {AppModule} from './app/module/app.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        AppModule,
        ConfigModule.forRoot({
            isGlobal: true,
        })
    ],
})

export class MainModule {
}
