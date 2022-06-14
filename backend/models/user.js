'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post, {
        foreignKey: 'author',
        onDelete: 'cascade',
      });
      models.User.hasMany(models.Comment, {
        foreignKey: 'author',
        onDelete: 'cascade',
      });
      models.User.hasMany(models.Like, {
        foreignKey: 'author',
        onDelete: 'cascade',
      });
    }
  }
  User.init(
    {
      firstname: { type: DataTypes.STRING, allowNull: false },
      lastname: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      photo: DataTypes.STRING,
      is_admin: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
