import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Favorite extends Model<Favorite> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  })
  id_usuario: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;
}
