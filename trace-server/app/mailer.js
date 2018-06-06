import nodemailer from "nodemailer";

const from = '"Trace H.R" <trace-hr@kairostech.com>';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // Office 365 server
    port: process.env.EMAIL_PORT, // secure SMTP
    secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      ciphers: "SSLv3"
    }
  });
}

export function sendConfirmationEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Welcome to Trace",
    text: `
		Welcome to Trace H.R. 
		Please, confirm your email.

		${user.generateConfirmationUrl()}
		`
  };

  transport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Reset Password",
    text: `
		To reset password follow this link:

		${user.generateResetPasswordLink()}
		`
  };

  transport.sendMail(email);
}
