module.exports = (sequelize, DataTypes) => {
  const Catalog = sequelize.define(
    'Catalogs',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      catalogName: {
        type: DataTypes.STRING(64),
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

  Catalog.associate = function (models) {
    Catalog.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'id' });
    Catalog.belongsToMany(models.Conversations, { through: models.CatalogsConversations, foreignKey: 'catalogId', otherKey: 'conversationId' });
  };

  return Catalog;
};
