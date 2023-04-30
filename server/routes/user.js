const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    if (user)
      return res.status(409).send({ message: "User Email already exists" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));

    const hashPasword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPasword }).save();
    res.status(201).send({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Read Operation
router.route("/read").get((req, res) => {
  User.find({}, { userName: 1, email: 1, _id: 0 })
    .then((name) => res.json(name))
    .catch((err) => {
      res.status(400).json("Error : " + err);
    });
});

module.exports = router;
