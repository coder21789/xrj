'use strict';

import news from './news';

module.exports = function(sequelize, DataTypes) {
  const category = sequelize.define("category", {
    id: {type: DataTypes.INTEGER(), primaryKey: true},
    name: DataTypes.STRING(63),
    creation_time: DataTypes.NOW(),
    code: DataTypes.STRING(31),
    level: DataTypes.INTEGER(),
    parent_id: DataTypes.INTEGER(),
    order_no: DataTypes.INTEGER(),
    deleted: DataTypes.BOOLEAN(),
    title: DataTypes.STRING(32),
    keywords: DataTypes.STRING(128),
    description: DataTypes.STRING(512),
    support3Level: DataTypes.INTEGER(),  
    list_template_id: DataTypes.INTEGER()
  }, {      
    freezeTableName: true,     
    tableName: 'category',       
    timestamps: false,
    classMethods: {
        associate: function(models) {
            category.belongsTo(news, {foreignKey: 'category_id'});
        }
    }
  });
  return category;
};