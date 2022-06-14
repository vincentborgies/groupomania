'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User, {
        foreignKey: 'author',
        onDelete: 'cascade'
      });

      models.Comment.belongsTo(models.Post, {
        foreignKey: 'post_id',
        onDelete: 'cascade'
      });
    }
  }
  Comment.init(
    {
      post_id: {type: DataTypes.INTEGER, allowNull: false },
      author: {type: DataTypes.INTEGER, allowNull: false},
      author_name: {type: DataTypes.STRING, allowNull: false},
      author_photo: {type: DataTypes.STRING, allowNull: false},
      content: {type: DataTypes.TEXT, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  );
  return Comment;
};
