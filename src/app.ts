import express from "express";
import config from "config";

import connect from "./utils/dbConnect";
import logger from "./utils/logger";
import routes from "./routes";

const port = config.get<number>("port");


const app = express();

app.listen(port, async ()=>{
    logger.info(`App listening on port ${port}.`);
    await connect();
    routes(app);
})