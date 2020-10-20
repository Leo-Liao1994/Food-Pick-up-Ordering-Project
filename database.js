// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();



// add registration data to the database
const addUser = (user) => {
  const registerQuery = `
  INSERT INTO users (name, email, password, phone)
  VALUES ($1, $2, $3, $4)
  RETURNING *
  `;
  const registerQueryParams = [user.name, user.email, user.password, user.phone];
  return db.query(registerQuery, registerQueryParams)
    .then(response => response.rows[0])
    .catch(error => error.message);
}
exports.addUser = addUser;



// get users from database by email
const findUserByEmail = (email) => {
  const emailQuery = `
    SELECT *
    FROM users
    WHERE email = $1;
    `;
  const emailQueryParams = [email];
  return db.query(emailQuery, emailQueryParams)
    .then(response => response.rows[0])
}
exports.findUserByEmail = findUserByEmail;





