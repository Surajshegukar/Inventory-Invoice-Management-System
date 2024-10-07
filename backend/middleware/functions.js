import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message);

  console.log(`Message sent: ${info.messageId}`);
};

// Generate 6 digit OTP for password reset or email verification etc
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

