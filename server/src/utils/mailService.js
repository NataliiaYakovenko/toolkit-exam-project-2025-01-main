const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

module.exports.sendOfferDecision = async ({ to, status, contestTitle }) => {
  const subject =
    status === 'approved'
      ? 'Your offer was approved'
      : 'Your offer was rejected';

  const text =
    status === 'approved'
      ? `Your offer for contest ${contestTitle} was approved`
      : `Your offer for contest ${contestTitle} was rejected`;

  await transporter.sendMail({
    from: `"Administrator" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text,
  });
};
