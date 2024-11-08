const express = require('express');
const app = express();
const jsonServer = require('json-server');

app.use('/images', express.static('images'));

app.use(jsonServer.router('db.json'));

app.listen(3000, () => {
  console.log('Server started on port 3000');
});