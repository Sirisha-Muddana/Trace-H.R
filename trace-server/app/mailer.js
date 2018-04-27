import nodemailer from 'nodemailer';

const from = '"Trace" <info@kairostech.com';

function setup() {
	return nodemailer.createTransport({
		host: "smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "b6321380a02508",
			pass: "eeb0140701d66f"
		}
	})
}

export function sendConfirmationEmail(user) {
	const transport = setup();
	const email = {
		from,
		to: user.email,
		subject: "Welcome to Trace",
		text: `
		Welcome to Trace H.R. Please, confirm your email.

		${user.generateConfirmationUrl()}
		`
	}

	transport.sendMail(email);
}