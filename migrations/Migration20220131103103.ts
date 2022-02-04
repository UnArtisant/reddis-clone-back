import { Migration } from '@mikro-orm/migrations';

export class Migration20220131103103 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "points" int4 not null default 0, add column "user__id" int4 not null;');

    this.addSql('alter table "post" add constraint "post_user__id_foreign" foreign key ("user__id") references "user" ("_id") on update cascade;');
  }

}
