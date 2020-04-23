const nodemailer = require('nodemailer');
const config = require('../../config');

const sendEmail = async (to, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.gmailAccount, // generated ethereal user
      pass: config.gmailPassword, // generated ethereal password
    },
  });

  const info = {
    from: config.gmailAccount,
    to,
    subject,
    text,
    html,
  };
  return transporter.sendMail(info);
};

module.exports = {
  sendEmail,
};
