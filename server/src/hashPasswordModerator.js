const bcrypt = require('bcrypt');

(async () => {
  const password = 'Moderator123';
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log(hash);
})();
