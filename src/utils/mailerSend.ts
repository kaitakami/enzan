import { render } from "@react-email/render";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || "",
});

export const sendEmail: (
  email: React.ReactElement,
  subject: string,
  recipient: {
    email: string;
    name: string;
  },
  sender: string
) => Promise<void> = async (email, subject, recipient, sender = "Kai (Enzan)") => {
  const emailHtml = render(email);
  const sentFrom = new Sender("email@enzan.dev", sender);
  const recipients = [new Recipient(recipient.email, recipient.name)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject(subject)
    .setHtml(emailHtml);

  await mailerSend.email.send(emailParams);
};
