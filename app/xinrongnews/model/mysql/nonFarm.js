/**
 *
 * 非农模块数据映射模型
 * @model nonFarm
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
    const nonFarm = sequelize.define('nonFarm', {
        id: {type: DataTypes.INTEGER(), allowNull: false, primaryKey: true},
        former_value: {type: DataTypes.DECIMAL(), allowNull: false},
        forcast_value: {type: DataTypes.DECIMAL(), allowNull: false},
        real_value: {type: DataTypes.DECIMAL(), allowNull: false},
        report_date: {type: DataTypes.NOW(), allowNull: false},
        create_time: {type: DataTypes.NOW(), allowNull: false}
    }, {
        freezeTableName: true,
        tableName: 'none_farm_report',
        timestamps: false
    });
    return nonFarm;
};