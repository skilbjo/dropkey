module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    UserId: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true
    },
    FacebookId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FacebookToken: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: { 
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'User',
    timestamps: false, 
    classMethods: {
      // associate: function(models) {
      //   Transaction.belongsTo(models.Merchant);
      // }
    }
  }); 
  return User;
};