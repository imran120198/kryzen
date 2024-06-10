const { Router } = require("express");

require("dotenv").config();

UserRouter = Router();

//signup
UserRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await UserModel.findOne({ where: { email } });

    if (result) {
      return res.status(200).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 4);
    const user = await UserModel.create({ email, password: hashedPassword });
    res.status(200).send("Sign up successful");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong, please try again later");
  }
});

//login
UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordResult = await bcrypt.compare(password, user.password);
    if (!passwordResult) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET_KEY);
    res.json({ msg: "Login successful", token });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send("Something went wrong in Login, please try again later");
  }
});

const UserRouter = Router();

module.exports = {
  UserRouter,
};
