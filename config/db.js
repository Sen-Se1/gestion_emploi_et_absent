const mongoose = require('mongoose');
const { DB_URI } = process.env;

const dbConnection = () => {
  mongoose
    .connect(DB_URI)
    .then((connect) => {
      console.log(
        `Base de données connectée: ${connect.connection.host}:${connect.connection.port}/${connect.connection.name}`
      );
    })
};

module.exports = dbConnection;