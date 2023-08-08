require("dotenv").config();

const secretKey = process.env.SECRET_SESSION_KEY;

const passportSession = {
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true },
};

module.exports = passportSession;
