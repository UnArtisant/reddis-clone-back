import {Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, SerializedPrimaryKey} from "@mikro-orm/core";
import {Field, Int, ObjectType} from "@nestjs/graphql";
import {v4 as uuidv4} from 'uuid';
import {User} from "../../auth/entities/user.entity";
import {Updoot} from "../../upboot/entity/updoot.entity";

@ObjectType()
@Entity()
export class Post {

    @Field(() => Int)
    @PrimaryKey()
    _id!: number;

    @Field()
    @SerializedPrimaryKey()
    id: string = uuidv4();

    @Field()
    @Property()
    title!: string;

    @Field()
    @Property()
    text!: string;

    @Field()
    @Property({default : 0})
    points!: number;

    @Field()
    @ManyToOne(() => User)
    user!: User;

    @OneToMany(() => Updoot, updoot => updoot.post)
    updoots? = new Collection<Updoot | []>(this);

    @Field()
    @Property()
    createdAt: Date = new Date();

    @Field()
    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}