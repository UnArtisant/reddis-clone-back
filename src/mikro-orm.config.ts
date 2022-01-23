import {User} from "./entities/User";

export default {
    entities: [
        User
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