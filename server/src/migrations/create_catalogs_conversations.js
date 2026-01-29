module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Catalogs_Conversations', {
      conversationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Conversations',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      catalogId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Catalogs',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Catalogs_Conversations');
  },
};
