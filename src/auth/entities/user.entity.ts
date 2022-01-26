import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity()
export class User {

    @Field()
    @PrimaryKey()
    _id!: number;

    @Field()
    @Property()
    createdAt: Date = new Date();

    @Field()
    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();


}