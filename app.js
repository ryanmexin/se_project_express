const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (r) => {
    console.log("connected to DB");
  },
  (e) => console.log("DB error", e),
);

const routes = require("./routes");
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "64e52622c42f04be1166d1b4", // paste the _id of the test user created in the previous step
  };
  next();
});
app.use(routes);


app.listen(PORT, () => {
  // if everything is working, the console will show which port the application is listening
  console.log(`App is listening at port: ${PORT}`);
});
