import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

// Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract user email from Google profile
        const email = profile.emails[0].value;

        // Check if user already exists
        let user = await User.findOne({ email });

        // If user does not exist, create new user
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: email,
            password: "google-auth-user", // dummy password
          });
        }

        // Pass user to next step
        done(null, user);

      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Required for session support (even if session: false is used)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
