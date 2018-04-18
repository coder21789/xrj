'use strict';

module.exports = function(sequelize, DataTypes) {
  const article = sequelize.define('article', {
    id: { type: DataTypes.INTEGER(11), allowNull: false, primaryKey: true },
    user_id: { type: DataTypes.INTEGER(11), allowNull: false},
    status: { type: DataTypes.STRING(2), allowNull: false},
    subject: { type: DataTypes.STRING(255), allowNull: false},
    author: { type: DataTypes.STRING(256), allowNull: false },
    summary: { type: DataTypes.STRING(1024), allowNull: false },
    content: { type: DataTypes.STRING(32), allowNull: true },
    create_time:{ type: DataTypes.NOW(), allowNull: true },
    publish_time: { type: DataTypes.NOW(), allowNull: true },
    keywords:{ type: DataTypes.STRING(1024), allowNull: false },
    sensitive_words:{ type: DataTypes.STRING(1024), allowNull: false },
    news_id: { type: DataTypes.INTEGER(11), allowNull: false},
    failed_cause: { type: DataTypes.STRING(2), allowNull: true },
    suggest_flag: { type: DataTypes.INTEGER(1), allowNull: false}
  }, {
      freezeTableName: true,     
      tableName: 'register_user_article',       
      timestamps: false,
      associate: (models) => {}
  });
  return article;
};