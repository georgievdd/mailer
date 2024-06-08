import {SERVER_HOST, SERVER_PORT, USE_SECRET} from "./config";
// @ts-ignore
import cookieParser from 'cookie-parser'
// @ts-ignore
import express from 'express'
import checkKey from "./middleware/checkKey";
import router from "./router";
const app = express()
app.use(express.json());
app.use(cookieParser());
if (USE_SECRET) {
  app.use(checkKey)
}
app.use(router)
export default () => {
  app.listen(SERVER_PORT, () => {
    console.log(`Server is running on ${SERVER_HOST}`);
  });
}