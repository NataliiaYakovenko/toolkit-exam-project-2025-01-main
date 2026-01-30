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

  CatalogConversation.associate = function (models) {
    CatalogConversation.belongsTo(models.Conversations, {
      foreignKey: 'conversationId',
      targetKey: 'id',
    });
    CatalogConversation.belongsTo(models.Catalogs, {
      foreignKey: 'catalogId',
      targetKey: 'id',
    });
  };

  return CatalogConversation;
};
