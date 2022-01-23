import { Migration } from '@mikro-orm/migrations';

export class Migration20220123171723 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
  }

}
