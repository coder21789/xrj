'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('word', {
    id: { type: DataTypes.INTEGER(11), allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING(32), allowNull: true },
    word_type: { type: DataTypes.INTEGER(4), allowNull: false},
    deleted: { type: DataTypes.BOOLEAN(), allowNull: false },
    creation_time: { type: DataTypes.NOW(), allowNull: true },
    code: { type: DataTypes.STRING(8), allowNull: true },
    url: { type: DataTypes.STRING(128), allowNull: true },
    title: { type: DataTypes.STRING(128), allowNull: true },
    keywords: { type: DataTypes.STRING(128), allowNull: true },
    description: { type: DataTypes.STRING(512), allowNull: true }
  }, {
      freezeTableName: true,      
      tableName: 'vocabulary',       
      timestamps: false
  });
};