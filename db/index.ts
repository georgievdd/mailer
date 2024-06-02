import { Sequelize } from "sequelize-typescript";
import {POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER} from "./config";
import {Template} from "./model";

const sequelize = new Sequelize({
  database: POSTGRES_DB,
  dialect: "postgres",
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  models: [Template],
});

export default () => sequelize.sync();
