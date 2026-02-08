
const fs = require('fs');
const bcrypt = require('bcryptjs');
const password = 'PrasannaTex@2026';
const hash = bcrypt.hashSync(password, 10);
fs.writeFileSync('hash.txt', hash, 'utf8');
