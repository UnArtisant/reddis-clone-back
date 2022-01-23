import { Global, Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import {MikroOrmModule} from "@mikro-orm/nestjs";

@Global()
@Module({
  imports: [MikroOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
