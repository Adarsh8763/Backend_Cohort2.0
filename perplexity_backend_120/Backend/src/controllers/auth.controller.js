import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { sendEmail } from "../services/mail.service.js"

async function registerController(req, res) {
    const { username, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User already exist with this" + (isUserAlreadyExist.username === username ? "username" : "email")
        })
    }
    const hashPassword = await bcrypt.hash(password, 10)

    let user
    try {
        user = await userModel.create({
            username: username,
            email: email,
            password: hashPassword
        })
        const emailVerificationToken = jwt.sign(
            {
                email: user.email
            },
            process.env.JWT_SECRET
        )

        await sendEmail({
            to: user.email,
            subject: "Welcome to Perplexity",
            html: `<p>Hello, ${username}!</p>
                <p>Thank you for registering with us. We're excited to have you on board!</p>
                <p>Your email has been successfully registered. You can now log in to your account and explore our services.</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify email</a>
                <p>Best regards,<br/>The Perplexity Team</p>`
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                username: user.username,
                email: user.email,
                verified: user.verified
            }
        })
    }
    catch (err) {
        console.log(err)

        if (user) {
            await userModel.findByIdAndDelete(user._id); // 🔥 rollback
        }

        return res.status(500).json({
            message: "Registration failed"
        });
    }


}

async function loginController(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid credentials",
        })
    }

    if (!user.verified) {
        return res.status(400).json({
            message: "Please verify ur email before logging in"
        })
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "10d"
        }
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "User Logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            verified: user.verified
        }
    })
}

async function getMeController(req, res) {
    const userId = req.user.id

    const user = await userModel.findById(userId)

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    res.status(200).json({
        message: "User details fetched successfully",
        user
    })
}

async function logoutController(req, res) {
    const token = req.cookies.token

    res.clearCookie("token")

    await redis.set(`perplexity:${token}`, Date.now().toString(), "EX", 60 * 60 * 24 * 15)

    res.status(200).json({
        message: "User logged out successfully"
    })
}

async function verifyEmailController(req, res) {
    const { token } = req.query

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findOne({ email: decoded.email })
    if (!user) {
        return res.status(400).json({
            message: "Invalid token",
            err: "User not found"
        })
    }

    if (!user.verified) {
        user.verified = true

        await user.save()

        res.send(`
            <h1>Email verified successfully</h1>
            <p>Your email has been verified. Now u can log in to ur account.</p>
        `)
    }
    else {
        res.send(`
            <h1>Email already verified</h1>
            <p>Your email is already verified. You can log in to your account.</p>
            <p>If you are already logged in, then you can ignore this message.</p>
        `)
    }
}

async function resendVerificationEmailController(req, res) {
    const { email } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            message: "User not found with email."
        })
    }

    const emailVerificationToken = jwt.sign(
        {
            email: user.email
        },
        process.env.JWT_SECRET
    )

    await sendEmail({
        to: user.email,
        subject: "Welcome to Perplexity",
        html: `<p>Hello, ${user.username}!</p>
                <p>Thank you for registering with us. We're excited to have you on board!</p>
                <p>Your email has been successfully registered. You can now log in to your account and explore our services.</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify email</a>
                <p>Best regards,<br/>The Perplexity Team</p>`
    });

    res.status(201).json({
        message: "Verification email resent successfully",
    })
}

export default {
    registerController,
    loginController,
    getMeController,
    logoutController,
    verifyEmailController,
    resendVerificationEmailController
}