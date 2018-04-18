'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('city', {
    cityid: { type: DataTypes.INTEGER(100), allowNull: false , primaryKey: true},
    ranking: { type: DataTypes.INTEGER(11), allowNull: true },
    name: { type: DataTypes.STRING(200), allowNull: true },
    englishname: { type: DataTypes.STRING(200), allowNull: true},
    simplyname: { type: DataTypes.STRING(100), allowNull: true },
    dscp: { type: DataTypes.STRING(300), allowNull: true },
    isparent: { type: DataTypes.INTEGER(11), allowNull: true },
    parentid: { type: DataTypes.STRING(100), allowNull: true },
    cityflag: { type: DataTypes.INTEGER(11), allowNull: true }
  }, {
      freezeTableName: true,      
      tableName: 'db_city',       
      timestamps: false,
      classMethods: {
        associate: function(models) {}
      }
    }
  );
};