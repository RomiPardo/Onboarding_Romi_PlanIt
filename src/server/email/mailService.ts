import { EMAIL_ADDRESS, EMAIL_PASSWORD } from "mail-information";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
});

export const sendEmail = (
  userEmail: string,
  message: string,
  subject: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    transport.sendMail(
      {
        to: userEmail,
        from: EMAIL_ADDRESS,
        subject: subject,
        text: message,
      },
      (error) => {
        if (error) {
          reject("Hubo un error al enviar el email");
        } else {
          resolve("success");
        }
      },
    );
  });
};
