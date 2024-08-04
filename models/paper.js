module.exports = (sequelize, DataTypes) => {
  const Paper = sequelize.define('Paper', {
    title: DataTypes.STRING,
    abstract: DataTypes.STRING,
    content: DataTypes.STRING,
    state: DataTypes.STRING,
    conferenceId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
  }, {});
  Paper.associate = function(models) {
    Paper.belongsTo(models.Conference, { foreignKey: 'conferenceId' });
    Paper.belongsTo(models.User, { foreignKey: 'authorId' });
  };
  return Paper;
};