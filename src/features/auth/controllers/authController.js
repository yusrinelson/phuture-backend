const User = require("../../../models/usersModel");
const jwt = require("jsonwebtoken");

//create token
const createToken = async (user) => {
  const payload = {
    _id: user._id,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1m" });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: "3m",
  });

  await User.updateOne({ _id: user._id }, { refreshToken });

  return { token, refreshToken };
};

// Signup User
const signupUser = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, surname, email, password });
    const { token, refreshToken } = await createToken(user); //destructure tokens from createToken

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      maxAge: 3 * 60 * 1000, // 3 minutes (your refresh expiry)
    });

    res.status(201).json({
      message: "User created successfully",
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const { token, refreshToken } = await createToken(user); //destructure tokens from createToken
    console.timeEnd("LOGIN_TIME");
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      maxAge: 3 * 60 * 1000, // 3 minutes (your refresh expiry)
    });

    res.status(200).json({
      message: "User logged in successfully",
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      token,
    });
    console.time("LOGIN_TIME");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//refresh token
const HandleRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    //verify token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    // Check if user exists and refresh token matches the one in DB
    const user = await User.findById(decoded._id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    //generate new access token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.SECRET,
      { expiresIn: "1m" },
    );

    res.status(200).json({
      message: "Token refreshed successfully",
      _id: user._id,
      name: user.name,      
      surname: user.surname,      
      email: user.email,
      role: user.role,
      token, // new access token
    });
  } catch (error) {
    res
      .status(403)
      .json({ message: "Invalid refresh token", error: error.message });
  }
};

//logout
const logoutUser = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ message: "User not found" });
    }

    await User.updateOne({ _id: userId }, { refreshToken: null });

    // res.clearCookie("token", {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "strict",
    // });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during logout", error: error.message });
  }
};

module.exports = { signupUser, loginUser, HandleRefreshToken, logoutUser };
