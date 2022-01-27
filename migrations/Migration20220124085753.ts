import { Migration } from '@mikro-orm/migrations';

export class Migration20220124085753 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post" ("_id" serial primary key, "id" varchar(255) not null, "title" character varying NOT NULL, "text" character varying NOT NULL, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('alter table "user" add column "id" varchar(255) not null;');
  }

}
