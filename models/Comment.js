const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bomment: {
        type: DataTypes.STRING,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'post',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'comment',
    }
  );
  
  module.exports = Comment;
  