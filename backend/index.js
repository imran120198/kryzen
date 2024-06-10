const express = require("express");
const cors = require("cors");
const { UserRouter } = require("./Routes/User.routes");
const { authentication } = require("./Middleware/authentication");

require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Kryzen Server");
});

app.use("/user", UserRouter);
app.use(authentication);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
