import { Table, Column, Model, DataType } from "sequelize-typescript";


// @ts-ignore
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
