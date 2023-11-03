const express = require("express");
const mongoose = require("mongoose");
const {errors} = require("celebrate");

const { PORT = 3001 } = process.env;
const app = express();
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler");
const { login, createUser } = require("./controllers/users");
const clothingItem = require("./routes/clothingItem");
const { requestLogger, errorLogger } = require('./middlewares/logger');


mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (r) => {
    console.log("connected to DB", r);
  },
  (e) => console.log("DB error", e),
);


/* ------------------------ Remove after code review ------------------------ */
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
/* ---------------------------------------------------------------------------- */

const routes = require("./routes");

//middleware setups
app.use(cors());
app.use(requestLogger);
app.use(express.json());



// my routes
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/items', clothingItem);
//error handling
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.use(routes);






app.listen(PORT, () => {
  // if everything is working, the console will show which port the application is listening
  console.log(`App is listening at port: ${PORT}`);
});
