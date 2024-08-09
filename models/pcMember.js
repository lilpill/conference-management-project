module.exports = (sequelize, DataTypes) => {
    const PcMember = sequelize.define('PcMember', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      conferenceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {});
  
    PcMember.associate = function(models) {
      PcMember.belongsTo(models.User, { foreignKey: 'userId' });
      PcMember.belongsTo(models.Conference, { foreignKey: 'conferenceId' });
    };
  
    return PcMember;
  };
  