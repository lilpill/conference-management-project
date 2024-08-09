module.exports = (sequelize, DataTypes) => {
    const PcChair = sequelize.define('PcChair', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      conferenceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {});
  
    PcChair.associate = function(models) {
      PcChair.belongsTo(models.User, { foreignKey: 'userId' });
      PcChair.belongsTo(models.Conference, { foreignKey: 'conferenceId' });
    };
  
    return PcChair;
  };
  