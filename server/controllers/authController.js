const User = require('../models/User');

exports.userLogin = async (req, res) => {
  const { userName } = req.body;

  if (!userName) {
    return res
      .status(500)
      .json({ success: false, msg: "You didn't provide any username!" });
  }

  try {
    const user = await User.findOne({ userName: userName });

    if (user) {
      return res.status(200).json({ success: true, user: user });
    }

    if (!user) {
      const user = new User({
        userName,
      });
      const savedUser = await user.save();
      res.status(200).json({ success: true, user: savedUser });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
