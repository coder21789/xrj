/**
 *
 * 文件上传模块数据映射模型
 * @model upload
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
    const upload = sequelize.define('upload', {
        id: {type: DataTypes.INTEGER(), allowNull: false, primaryKey: true},
        file_name: {type: DataTypes.STRING(128), allowNull: false},
        file_path: {type: DataTypes.STRING(512), allowNull: false},
        upload_user: {type: DataTypes.INTEGER(), allowNull: true},
        expire_date: {type: DataTypes.NOW(), allowNull: true},
        create_time: {type: DataTypes.NOW(), allowNull: false}
    }, {
        freezeTableName: true,
        tableName: 'upload_file_record',
        timestamps: false
    });
    return upload;
};