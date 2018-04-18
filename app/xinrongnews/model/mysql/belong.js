/**
 *
 * 大画财经模块作者数据映射模型
 * @model topic
 *
 */

'use strict';

import news from './news';

module.exports = function(sequelize, DataTypes) {
    const belong = sequelize.define('belong', {
        id: {type: DataTypes.INTEGER(), allowNull: false, primaryKey: true},
        parent_id: {type: DataTypes.INTEGER(), allowNull: false},
        child_id: {type: DataTypes.INTEGER(), allowNull: false},
        parent_table: {type: DataTypes.STRING(32), allowNull: false},
        child_table: {type: DataTypes.STRING(32), allowNull: false}
    }, {
        freezeTableName: true,
        tableName: 'db_belong',
        timestamps: false,
        classMethods: {
            associate: function(models) {
                belong.belongsTo(news, {foreignKey: 'parent_id'});
            }
        }
    });
    return belong;
};