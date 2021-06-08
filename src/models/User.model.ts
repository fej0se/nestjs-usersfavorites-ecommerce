import {
  BeforeCreate,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isLoggedIn: boolean;

  @BeforeCreate
  static hashPassword(user: User) {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, 10);
    }
  }
}
