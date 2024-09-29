import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "g6Pwz@example.com",
      pass: "qkqkqkqkqkqkqkqkqkqkqkqkqkqkqkq",
    },
  });
};

export default function sendMail(
  from,
  to,
  subject,
  text,
) {
  const transporter = createTransporter();
  return new Promise((resolve, reject) => {
    transporter.sendMail({
      from,
      to,
      subject,
      text
    }, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};
