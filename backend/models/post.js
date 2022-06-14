'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, {
        foreignKey: 'author',
        onDelete: 'cascade',
      });
      models.Post.hasMany(models.Comment, {
        foreignKey: 'post_id',
      });
      models.Post.hasMany(models.Like, {
        foreignKey: 'post_id',
      });
    }
  }

  Post.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      media_url: DataTypes.STRING, 
      author: { type: DataTypes.INTEGER, allowNull: false },
      author_name : {type: DataTypes.STRING, allowNull: false},
      author_photo : DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
