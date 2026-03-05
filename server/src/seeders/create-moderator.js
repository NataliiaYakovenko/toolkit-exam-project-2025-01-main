const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const existingModerator = await queryInterface.rawSelect(
      'Users',
      {
        where: {
          email: 'moderator@gmail.com',
        },
      },
      ['id']
    );

    if (!existingModerator) {
      const hashedPassword = await bcrypt.hash('Moderator123', 10);

      return queryInterface.bulkInsert('Users', [
        {
          firstName: 'Moderator',
          lastName: 'Moderator',
          displayName: 'Moderator',
          password: hashedPassword,
          email: 'moderator@gmail.com',
          avatar: 'anon.png',
          role: 'moderator',
          balance: 0,
          rating: 0,
        },
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', {
      email: 'moderator@gmail.com',
    });
  },
};
