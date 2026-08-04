// import nodemailer from 'nodemailer'

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         type: 'OAuth2',
//         user: process.env.GOOGLE_USER,
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//     },
// });

// Verify the connection configuration
// transporter.verify()
//     .then(() => {
//         console.log("Email transporter is ready to send emails");
//     })
//     .catch((err) => {
//         console.log('Email transporter verification failed', err);
//     })

// Function to send email
// export async function sendEmail({ to, subject, text, html }) {
//     const mailOptions = await transporter.sendMail({
//         from: process.env.GOOGLE_USER, // sender address
//         to, // list of receivers
//         subject, // Subject line
//         text, // plain text body
//         html, // html body
//     });

//     console.log("Email sent: ", mailOptions)
// };


import { google } from 'googleapis';
import MailComposer from "nodemailer/lib/mail-composer/index.js";

// Initialize OAuth2 Client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground' // Or your configured redirect URI
);

// Set credentials using the stored refresh token
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

// Initialize Gmail API
const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

/*
 * Sends an email using the Gmail API
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - HTML body content
 */
export async function sendEmail({to, subject, html}) {
  try {
    console.log("========= Sending Email =========");
    console.log('Sending email to:', to);
    console.log("========= Sending Email =========");
    // 1. Create the email message using Nodemailer's MailComposer
    const mailComposer = new MailComposer({
      from: `"Sender Name" <${process.env.GOOGLE_USER}>`,
      to: to,
      subject: subject,
      html: html
    });

    const message = await mailComposer.compile().build();

    // 2. Encode the message in Base64Url format (RFC 4648)
    const rawMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // 3. Send the email via Gmail API
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: rawMessage
      }
    });

    console.log('Email sent successfully. Message ID:', response.data.id);
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
