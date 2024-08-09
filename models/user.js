module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USER',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Paper, { foreignKey: 'authorId', as: 'papers' });
    User.hasMany(models.PcChair, { foreignKey: 'userId', as: 'pcChairs' });
    User.hasMany(models.PcMember, { foreignKey: 'userId', as: 'pcMembers' });
  };

  return User;
};
