const express = require('express');
const app = express();
const port = 3069;
const mainApi = require('./main-api.js');

app.use(express.json());
app.use('/api', mainApi);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
});
