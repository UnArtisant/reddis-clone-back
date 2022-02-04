import { Migration } from '@mikro-orm/migrations';

export class Migration20220204085508 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "updoot" ("id" serial primary key, "user__id" int4 not null, "post__id" int4 not null, "value" int4 not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('alter table "updoot" add constraint "updoot_user__id_foreign" foreign key ("user__id") references "user" ("_id") on update cascade;');
    this.addSql('alter table "updoot" add constraint "updoot_post__id_foreign" foreign key ("post__id") references "post" ("_id") on update cascade;');
  }

}
