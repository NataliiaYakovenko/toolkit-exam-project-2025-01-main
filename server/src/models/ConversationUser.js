module.exports = (sequelize, DataTypes) => {
  const ConversationUser = sequelize.define(
    'ConversationsUsers',
    {
      conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      blackList: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      favoriteList: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: 'Conversations_Users',
      timestamps: false,
    },
  );

  ConversationUser.associate = function (models) {
    ConversationUser.belongsTo(models.Users, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
    ConversationUser.belongsTo(models.Conversations, {
      foreignKey: 'conversationId',
      targetKey: 'id',
    });
  };

  return ConversationUser;
};
