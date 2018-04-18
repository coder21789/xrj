/**
 *
 * 大画财经模块数据映射模型
 * @model authorTeam
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
    const authorTeam = sequelize.define('authorTeam', {
        id: {type: DataTypes.INTEGER(), allowNull: false, primaryKey: true},
        name: {type: DataTypes.STRING(10), allowNull: false},
        tag: {type: DataTypes.STRING(8), allowNull: false},
        introduce: {type: DataTypes.STRING(40), allowNull: false},
        show_flag: {type: DataTypes.INTEGER(1), allowNull: false},
        photo: {type: DataTypes.STRING(128), allowNull: false},
        create_time: {type: DataTypes.NOW(), allowNull: false},
        order: {type: DataTypes.INTEGER(4), allowNull: false},
        deleted: {type: DataTypes.INTEGER(1), allowNull: false}
    }, {
        freezeTableName: true,
        tableName: 'news_author_team',
        timestamps: false
    });
    return authorTeam;
};