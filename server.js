require("dotenv").config();
const express = require("express");
const cors = require("cors");
const clientController = require("./controllers/clientController");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  mongoSanitize({
    replaceWith: "",
  })
);

app.set("view engine", "ejs");

app.use("/clients", clientController);

app.get('/clients/entry-form', (req, res) => {
    res.render('entryForm.ejs')
})

app.get("/", (req, res) => {
  res.json({
    status: 200,
    msg: "Default Route",
  });
});

app.set("port", PORT);

app.listen(app.get("port"), () => {
  console.log(`PORT: ${app.get("port")}`);
});
