import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app.service';
import {Observable} from "rxjs";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any[]> {
    return await this.appService.getHello();
  }

  @Get('test')
  getTest(): string {
    return 'test update did update ?';
  }
}
