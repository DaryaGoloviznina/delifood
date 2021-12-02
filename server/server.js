const app = require('./app');
require('dotenv').config();

const port = process.env.SERVER_PORT ?? 3100;

app.listen(port, () => {
  console.log('Server started at http://localhost:%s/', port);
});
