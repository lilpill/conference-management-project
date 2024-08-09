module.exports = (sequelize, DataTypes) => {
  const Conference = sequelize.define('Conference', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: 'CREATED',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {});

  Conference.associate = function(models) {
    Conference.hasMany(models.PcChair, { foreignKey: 'conferenceId', as: 'pcChairs' });
    Conference.hasMany(models.PcMember, { foreignKey: 'conferenceId', as: 'pcMembers' });
    Conference.hasMany(models.Paper, { foreignKey: 'conferenceId', as: 'papers' });
  };

  return Conference;
};
