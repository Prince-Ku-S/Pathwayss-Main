const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // ✅ Use Gmail (or update for another provider)
      auth: {
        user: process.env.EMAIL_USER, // ✅ Your email from .env
        pass: process.env.EMAIL_PASS, // ✅ App password (not normal password)
      },
    });

    const mailOptions = {
      from: `"Pathwayss" <${process.env.EMAIL_USER}>`, // ✅ Sender's email
      to, // ✅ Recipient's email
      subject, // ✅ Email subject
      text, // ✅ Email body (plain text)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.response}`);
  } catch (error) {
    console.error("❌ Email Sending Error:", error);
  }
};

module.exports = sendEmail;
