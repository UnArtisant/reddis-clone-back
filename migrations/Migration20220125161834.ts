import { Migration } from '@mikro-orm/migrations';

export class Migration20220125161834 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "username" varchar(255) not null, add column "password" varchar(255) not null;');
  }

}
