import { Model, DataTypes, Optional } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../../config/Sequelize';

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  budgetLimit: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public budgetLimit!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  budgetLimit: {
    type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale according to your requirements
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  timestamps: true,
  hooks: {
    beforeSave: async (user: User) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});
