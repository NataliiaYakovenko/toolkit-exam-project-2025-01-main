module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    'Conversations',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  Conversation.associate = function (models) {
    Conversation.belongsToMany(models.Users, {
      through: models.ConversationsUsers,
      foreignKey: 'conversationId',
      otherKey: 'userId',
      as: 'users',
    });

    Conversation.hasMany(models.Messages, {
      foreignKey: 'conversationId',
      sourceKey: 'id',
    });

    Conversation.belongsToMany(models.Catalogs, {
      through: 'Catalogs_Conversations',
      foreignKey: 'conversationId',
      otherKey: 'catalogId',
    });

    Conversation.hasMany(models.ConversationsUsers, {
      foreignKey: 'conversationId',
      sourceKey: 'id',
      as: 'conversationUsers',
    });
  };

  return Conversation;
};
