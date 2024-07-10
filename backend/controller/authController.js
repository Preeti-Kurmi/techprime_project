const jwt = require('jsonwebtoken');

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const predefinedUser = {
    email: "kiran.gosavi@techprimelab.com",
    password: "mypass321",
  };

  if (email === predefinedUser.email && password === predefinedUser.password) {
    const token = jwt.sign({ email }, 'djdsks');

    return res.json({
      Success: "true",
      Message: "Valid User",
      token,
    });
  } else {
    return res.status(401).json({
      Success: "False",
      Message: "Invalid User",
    });
  }
};

module.exports = { loginUser };
