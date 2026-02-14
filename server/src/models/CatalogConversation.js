module.exports = (sequelize, DataTypes) => {
  const CatalogConversation = sequelize.define(
    'CatalogsConversations',
    {
      catalogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: 'Catalogs_Conversations',
      timestamps: false,
    },
  );

  return CatalogConversation;
};
