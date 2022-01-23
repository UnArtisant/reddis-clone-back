import { Injectable } from '@nestjs/common';
import {MikroORM} from "@mikro-orm/core";
import {User} from "../../entities/User";

@Injectable()
export class AppService {
  constructor(private readonly orm: MikroORM) {
  }
  async getHello() {
    return await this.orm.em.find(User, {});
  }
}
