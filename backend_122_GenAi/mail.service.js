import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
});

// Verify the connection configuration
transporter.verify()
    .then(() => {
        console.error("Email transporter is ready to send emails");
    })
    .catch((err) => {
        console.log('Email transporter verification failed', err);
    })

// Function to send email
export async function sendEmail ({to, subject, text="", html})  {
    const mailOptions = await transporter.sendMail({
        from: process.env.GOOGLE_USER, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
    });

    // console.log("Email sent: ", mailOptions)
    console.log("EMAIL FUNCTION CALLED ✅");
};

