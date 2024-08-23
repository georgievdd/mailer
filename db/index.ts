import {Sequelize} from "sequelize-typescript";
import {DB_HOST, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER} from "./config";
import {Sender, Template} from "./model";

const sequelize = new Sequelize({
  database: POSTGRES_DB,
  dialect: "postgres",
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: DB_HOST,
  models: [Template, Sender],
});

export default async () => {
  await sequelize.sync()
};
