import {Collection, Entity, ManyToMany, OneToMany, PrimaryKey, Property, SerializedPrimaryKey} from "@mikro-orm/core";
import {Field, ObjectType} from "@nestjs/graphql";
import {v4 as uuidv4} from 'uuid';
import {Post} from "../../post/entities/post.entity";
import {Updoot} from "../../upboot/entity/updoot.entity";

@ObjectType()
@Entity()
export class User {

    @Field()
    @PrimaryKey()
    _id!: number;

    @Field()
    @SerializedPrimaryKey()
    id: string = uuidv4();

    @Field()
    @Property({unique: true})
    username!: string;

    @Field()
    @Property()
    password!: string

    @Field(() => [Post], {nullable: true})
    @OneToMany(() => Post, post => post.user)
    posts? = new Collection<Post | []>(this);

    @OneToMany(() => Updoot, updoot => updoot.user)
    updoots? = new Collection<Updoot | []>(this);

    @Field({nullable: true})
    access_token: string = null

    @Field()
    @Property()
    createdAt: Date = new Date();

    @Field()
    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

}