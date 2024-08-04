module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Paper, { foreignKey: 'authorId' });
  };
  return User;
};