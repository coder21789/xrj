'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recommend', {
    id: { type: DataTypes.INTEGER(), allowNull: false , primaryKey: true},
    recommend_code: { type: DataTypes.STRING(32), allowNull: true },
    recommend_name: { type: DataTypes.STRING(32), allowNull: true },
    category_code: { type: DataTypes.STRING(32), allowNull: true},
    news_id: { type: DataTypes.INTEGER(), allowNull: true },
    news_recommend_subject: { type: DataTypes.STRING(32), allowNull: true },
    news_recommend_summary: { type: DataTypes.STRING(512), allowNull: true },
    recommend_style: { type: DataTypes.STRING(16), allowNull: true },
    news_url: { type: DataTypes.STRING(128), allowNull: true },
    news_pic: { type: DataTypes.STRING(128), allowNull: true },
    news_pic_desc: { type: DataTypes.STRING(256), allowNull: true },
    news_video: { type: DataTypes.STRING(255), allowNull: true },
    creat_time: { type: DataTypes.NOW(), allowNull: true },
    publish_time: { type: DataTypes.NOW(), allowNull: true },
    rank: { type: DataTypes.STRING(2), allowNull: true },
    state: { type: DataTypes.STRING(2), allowNull: true },
    news_recommend_bili_subject: { type: DataTypes.STRING(1022), allowNull: true }
  }, {
      freezeTableName: true,    
      tableName: 'news_web_recommend',       
      timestamps: false,
      classMethods: {
      associate: function(models) {}
    },
  });
};