import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/Sequelize';
interface UserTokenAttributes {
  id?: number;
  userId: number;
  token: string;
  createdAt: Date;
}

interface UserTokenCreationAttributes extends Optional<UserTokenAttributes, 'id'> {}

export class UserToken extends Model<UserTokenAttributes, UserTokenCreationAttributes> implements UserTokenAttributes {
  public id!: number;
  public userId!: number;
  public token!: string;
  public createdAt!: Date;
}

UserToken.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'UserToken',
  timestamps: false
});
