const { sequelize } = require('./src/db/models');
const app = require('./app');
require('dotenv').config();

const port = process.env.SERVER_PORT ?? 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
})();

app.listen(port, () => {
  console.log('Server started at http://localhost:%s/', port);
});
