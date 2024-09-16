const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const path = require("path");

const expressSession = express("express-session");
const flash = express("connect-flash");

require("dotenv").config();
const db = require("./config/mongooseConnection");

const indexRouter = require("./routes/index");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  })
);
app.use(flash());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`Server Running Of Port ${port}`);
});
