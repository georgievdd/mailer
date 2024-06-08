import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table
export class Template extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  script!: string
}

@Table
export class Sender extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  smtp_host!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string
}