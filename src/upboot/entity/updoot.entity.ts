import {Field, ObjectType} from "@nestjs/graphql";
import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {User} from "../../auth/entities/user.entity";
import {Post} from "../../post/entities/post.entity";

@Entity()
export class Updoot {

    @PrimaryKey()
    id: number;

    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => Post)
    post!: Post;


    @Property()
    value: number

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}