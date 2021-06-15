import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './User.model';

@Table
export class Favorite extends Model<Favorite> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  })
  user_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;
}
