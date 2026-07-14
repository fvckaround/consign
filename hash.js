const bcrypt = require("bcryptjs");
const password = process.argv[2];
if (!password) {
  console.log("Usage: node hash.js YourPasswordHere");
  process.exit(1);
}
console.log(bcrypt.hashSync(password, 10));