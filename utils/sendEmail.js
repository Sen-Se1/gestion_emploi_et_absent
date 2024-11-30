const nodemailer = require('nodemailer');
const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASSWORD
} = process.env

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: true,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD,
        },
    });

    const mailOpts = {
        from: 'Admin Dashboard <houssemmbarki615@gmail.com>',
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    await transporter.sendMail(mailOpts);
};

module.exports = sendEmail;