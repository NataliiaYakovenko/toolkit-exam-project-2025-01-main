const bcrypt = require('bcrypt');

(async () => {
  const password = 'Moderator123';
  const saltRounds = 10;
  await bcrypt.hash(password, saltRounds);
})();
