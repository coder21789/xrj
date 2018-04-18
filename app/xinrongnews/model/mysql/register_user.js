'use strict';

module.exports = function(sequelize, DataTypes) {
  const register_user = sequelize.define('register_user', {
    id: { type: DataTypes.INTEGER(11), allowNull: false, primaryKey: true },
    nick_name: { type: DataTypes.STRING(30), allowNull: true },
    username: { type: DataTypes.STRING(32), allowNull: false },
    userpwd: { type: DataTypes.STRING(64), allowNull: false},
    email: { type: DataTypes.STRING(64), allowNull: true },
    phone: { type: DataTypes.STRING(15), allowNull: true },
    creation_time: { type: DataTypes.NOW(), allowNull: true },
    login_count: { type: DataTypes.INTEGER(10), allowNull: false },
    is_active: { type: DataTypes.STRING(1), allowNull: true },
    introduction: { type: DataTypes.STRING(1000), allowNull: true },
    real_name: { type: DataTypes.STRING(63), allowNull: false },
    occupation: { type: DataTypes.STRING(63), allowNull: false },
    province: { type: DataTypes.STRING(63), allowNull: false },
    city: { type: DataTypes.STRING(63), allowNull: false },
    photo: { type: DataTypes.STRING(300), allowNull: true },
    social_id: { type: DataTypes.STRING(31), allowNull: true },
    good_at_category: { type: DataTypes.STRING(32), allowNull: true }
  }, {
      freezeTableName: true,     
      tableName: 'register_user',       
      timestamps: false
  });
  return register_user;
};