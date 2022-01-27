import {User} from "./auth/entities/user.entity";
import {Post} from "./post/entities/post.entity";

export default {
    entities: [
        User,
        Post
    ],
    dbName: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    type: 'postgresql',
    migrations : {
        path: "./migrations", // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/,
    }
};