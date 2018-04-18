/**
 *
 * 新闻表拓展属性表数据映射模型
 * @model news_app
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
    const newsApp = sequelize.define('newsApp', {
        id: {type: DataTypes.INTEGER(), allowNull: false, primaryKey: true},
        newsId: {type: DataTypes.INTEGER(), allowNull: false},
        is_suggest_app: {type: DataTypes.INTEGER(), allowNull: true},
        thumbnail_url_app: {type: DataTypes.STRING(255), allowNull: true},
        video_url_app: {type: DataTypes.STRING(255), allowNull: true},
        news_url_app: {type: DataTypes.STRING(255), allowNull: true},
        read_count_app: {type: DataTypes.INTEGER(), allowNull: true},
        refer_type: {type: DataTypes.STRING(12), allowNull: true},
        show_type: {type: DataTypes.STRING(64), allowNull: true},
        review_type: {type: DataTypes.INTEGER(), allowNull: false}
    }, {
        freezeTableName: true,
        tableName: 'news_app',
        timestamps: false
    });
    return newsApp;
};