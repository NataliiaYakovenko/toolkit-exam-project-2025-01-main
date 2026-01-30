module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Messages',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      sender: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
  Message.associate = function (models) {
    Message.belongsTo(models.Users, {
      foreignKey: 'sender',
      targetKey: 'id',
    });
    Message.belongsTo(models.Conversations, {
      foreignKey: 'conversationId',
      targetKey: 'id',
    });
  };
  return Message;
};
