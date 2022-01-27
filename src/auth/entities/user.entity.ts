import {Entity, PrimaryKey, Property, SerializedPrimaryKey} from "@mikro-orm/core";
import {Field, ObjectType} from "@nestjs/graphql";
import {v4 as uuidv4} from 'uuid';

@ObjectType()
@Entity()
export class User {

    @Field()
    @PrimaryKey()
    _id!: number;

    @Field()
    @SerializedPrimaryKey()
    id: string = uuidv4() ;

    @Field()
    @Property()
    createdAt: Date = new Date();

    @Field()
    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @Field()
    @Property()
    username!: string;

    @Field()
    @Property()
    password!: string

    @Field({nullable: true})
    access_token: string = null

}