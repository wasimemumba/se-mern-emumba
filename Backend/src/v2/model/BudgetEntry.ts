import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/Sequelize';

// These interfaces are for TypeScript typings for the model attributes and instance
interface BudgetEntryAttributes {
  id?: number;
  name: string;
  price: number;
  userId: number;
  date: string;
}

interface BudgetEntryCreationAttributes extends Optional<BudgetEntryAttributes, 'id'> {}

export class BudgetEntry extends Model<BudgetEntryAttributes, BudgetEntryCreationAttributes> implements BudgetEntryAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public userId!: number;
  public date!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BudgetEntry.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale according to your requirements
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Adjust according to your table naming conventions
      key: 'id'
    }
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'BudgetEntry',
  timestamps: true
});
