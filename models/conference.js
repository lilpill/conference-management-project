module.exports = (sequelize, DataTypes) => {
  const Conference = sequelize.define('Conference', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    state: DataTypes.STRING,
  }, {});
  Conference.associate = function(models) {
    Conference.hasMany(models.Paper, { foreignKey: 'conferenceId' });
  };
  return Conference;
};