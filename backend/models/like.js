'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Like.belongsTo(models.User, {
        foreignKey: 'author',
        onDelete: 'cascade'
      });

      models.Like.belongsTo(models.Post, {
        foreignKey: 'post_id',
        onDelete: 'cascade'
      });
    }
  }
  Like.init(
    {
      post_id: {type: DataTypes.INTEGER, allowNull: false},
      author: {type: DataTypes.INTEGER, allowNull: false}
    },
    {
      sequelize,
      modelName: 'Like',
    }
  );
  return Like;
};
