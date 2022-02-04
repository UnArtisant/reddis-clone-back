import {Module} from "@nestjs/common";
import {UpdootResolver} from "./resolver/updoot.resolver";

@Module({
    imports: [],
    providers: [UpdootResolver],
})

export class UpdootModule {}