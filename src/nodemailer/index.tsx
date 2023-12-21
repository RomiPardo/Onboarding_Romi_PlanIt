import { EMAIL_ADDRESS, EMAIL_PASSWORD } from "mail-information";
import nodemailer from "nodemailer";
import { Email } from "./email";
import { render } from "@react-email/components";

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
): Promise<string> =>
  new Promise((resolve, reject) => {
    const emailHtml = render(<Email message={message} />);

    transport.sendMail(
      {
        to: userEmail,
        from: EMAIL_ADDRESS,
        html: emailHtml,
        subject,
      },
      (error) => {
        if (error) {
          console.error("Error sending email:", error);
          return reject("Hubo un error al enviar el email");
        }

        resolve("success");
      },
    );
  });
