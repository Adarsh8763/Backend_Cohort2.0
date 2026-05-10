import "dotenv/config"
import express from 'express'
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"

const app = express()


app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, (_, __, profile, done) => {
    return done(null, profile)
}))


app.get("/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    }))

app.get("/auth/google/callback",
        passport.authenticate("google", {
            session: false,
            failureRedirect: "/"
        }),
        (req, res) => {
            console.log(req.user)
            res.send("Google Authentication is Successful")
        }
    )

app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })