const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const app = express();

const { login, createUser } = require("./controllers/users");
const clothingItem = require("./routes/clothingItem");
const auth = require("./middlewares/auth");
const cors = require("cors");

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (r) => {
    console.log("connected to DB", r);
  },
  (e) => console.log("DB error", e),
);

const routes = require("./routes");


app.use(cors());
app.use(express.json());




app.post('/signin', login);
app.post('/signup', createUser);


app.use(auth);
app.use('/items', clothingItem);

app.use(routes);






app.listen(PORT, () => {
  // if everything is working, the console will show which port the application is listening
  console.log(`App is listening at port: ${PORT}`);
});
