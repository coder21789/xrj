/**
 *
 * 双语数据映射模型
 * @model bilingual
 *
 */

'use strict';

import news from './news';

module.exports = function(sequelize, DataTypes) {
    const bilingual = sequelize.define('bilingual', {
        id: {type: DataTypes.INTEGER(), allowNull: false, primaryKey: true},
        bili_subject: {type: DataTypes.STRING(255), allowNull: false},
        refer_article: {type: DataTypes.STRING(1024), allowNull: false},
        classic_term: {type: DataTypes.STRING(1024), allowNull: false},
        good_saying: {type: DataTypes.STRING(1024), allowNull: false},
        news_id: {type: DataTypes.INTEGER(), allowNull: false}
    }, {
        freezeTableName: true,
        tableName: 'news_bilingual',
        timestamps: false,
        classMethods: {
            associate: function(models) {
                bilingual.belongsTo(news, {foreignKey: 'news_id'});
            }
        }
    });
    return bilingual;
};