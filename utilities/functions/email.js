const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, html) => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  const info = {
    to,
    subject,
    text,
    html,
    from: 'Test api',
  };
  return transporter.sendMail(info);
};

module.exports = {
  sendEmail,
};
