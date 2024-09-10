import config from "config";

import dbInstance from "./utils/dbConnect";
import logger from "./utils/logger";
import createServer from "./utils/server";

const port = config.get<number>("port");

const app = createServer();

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await dbInstance();
});