const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db'); 

app.listen(PORT, () => {
  // if everything is working, the console will show which port the application is listening
  console.log(`App is listening at port: ${PORT}`);
});
