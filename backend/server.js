import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import passport from "passport";
import session from "express-session";
import "./config/passport.js";




dotenv.config();
connectDB();
console.log("hi")

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    session({
      secret: "googleauth",
      resave: false,
      saveUninitialized: false,
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
app.use("/api/auth", authRoutes);
  



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
