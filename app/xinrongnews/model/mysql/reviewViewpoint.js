/**
 *
 * 大事件评论观点表数据映射模型
 * @model news_review_viewpoint
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
    const reviewViewpoint = sequelize.define('reviewViewpoint', {
        id: {type: DataTypes.INTEGER(), allowNull: false, primaryKey: true},
        type: {type: DataTypes.INTEGER(), allowNull: false},
        news_id: {type: DataTypes.INTEGER(), allowNull: false},
        news_draft_id: {type: DataTypes.INTEGER(), allowNull: true},
        content: {type: DataTypes.STRING(32), allowNull: false},
        show_num: {type: DataTypes.STRING(8), allowNull: false},
        real_num: {type: DataTypes.STRING(32), allowNull: false}
    }, {
        freezeTableName: true,
        tableName: 'news_review_viewpoint',
        timestamps: false
    });
    return reviewViewpoint;
};