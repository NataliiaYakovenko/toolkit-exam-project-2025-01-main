module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Users',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'anon.png',
      },
      role: {
        type: DataTypes.ENUM('customer', 'creator', 'moderator'),
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      accessToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    },
  );

  User.associate = function (models) {
    User.hasMany(models.Order, { foreignKey: 'userId', targetKey: 'id' });
    User.hasMany(models.Participant, { foreignKey: 'userId', targetKey: 'id' });
    User.hasMany(models.Offer, { foreignKey: 'userId', targetKey: 'id' });
    User.hasMany(models.RefreshToken, { foreignKey: 'userId', targetKey: 'id' });
    User.hasMany(models.Messages, { foreignKey: 'sender', sourceKey: 'id', as: 'SentMessages' });
    User.hasMany(models.ConversationsUsers, { foreignKey: 'userId', sourceKey: 'id' });
    User.hasMany(models.Catalogs, { foreignKey: 'userId', sourceKey: 'id' });
    User.belongsToMany(models.Conversations, { through: models.ConversationsUsers, foreignKey: 'userId', otherKey: 'conversationId' });
  };

  return User;
};
