const nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aamr76090@gmail.com",
    pass: "Ahmad@159753142536",
  },
});

module.exports.sendResetEmail = async (email, token) => {
  
  var url = "http://localhost:8080/user/reset-password?token=" + token;

  await smtpTransport.sendMail({
    from: "aamr76090@gmail.com",
    to: email,
    subject: "RESET YOUR PASSWORD",
    text: `Click on this link to reset your password ${url}`,
    html: `<h3> Click on this link to reset your password if this password was sent by someone else please ignore the Message  : ${url} </h3>`,
  });
};

module.exports.sendVerifyEmail = async (email, token) => {
 
  var url = "http://localhost:8000/user/verifyemail?token=" + token;

  await smtpTransport.sendMail({
    from: "<aamr76090@gmail.com>",
    to: email,
    subject: "VERIFY Your EMAIL",
    text: `Click on this link to verify ${url}`,
    html: `<h3> Click on this link to verify your email <br> if this email was sent by someone else please ignore it and contact out team</br>  : ${url} </h3>`,
  });
};
