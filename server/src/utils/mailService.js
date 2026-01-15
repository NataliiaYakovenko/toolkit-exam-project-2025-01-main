const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports.sendOfferDecision = async ({ to, status, contestTitle }) => {
  const subject =
    status === 'approved'
      ? 'Your offer was approved'
      : 'Your offer was rejected';

  const text =
    status === 'approved'
      ? `Your offer for contest ${contestTitle} was approved`
      : `Your offer for contest ${contestTitle} was rejected`;


  await sgMail.send({
    to,
    from: process.env.MAIL_USER,
    subject,
    html: `
      <p>${text}</p> `,
  });
};

