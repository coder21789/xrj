/**
 *
 * 广告模块数据映射模型
 * @model advert
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
    const advert = sequelize.define('advert', {
        id: {type: DataTypes.INTEGER(), allowNull: false, primaryKey: true},
        name: {type: DataTypes.STRING(30), allowNull: false},
        pic_sample_url: {type: DataTypes.STRING(512), allowNull: false},
        pxh: {type: DataTypes.INTEGER(), allowNull: false},
        deleted: {type: DataTypes.INTEGER(), allowNull: false},
        create_time: {type: DataTypes.NOW(), allowNull: false}
    }, {
        freezeTableName: true,
        tableName: 'advert_sample',
        timestamps: false
    });
    return advert;
};