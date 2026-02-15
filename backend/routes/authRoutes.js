import express from "express";
// import { signup, login, forgotPassword } from "../controllers/authController.js";
import { signup, login, forgotPassword, resetPassword } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import passport from "passport";
// import passport from "passport";
import jwt from "jsonwebtoken";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


router.get("/me", protect, (req, res) => {
    res.json(req.user);
});



// Step 1: Redirect to Google
router.get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
);
  
  // Step 2: Google callback
  router.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/",
      session: false,
    }),
    (req, res) => {
      const token = jwt.sign(
        { id: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      res.redirect(
        `${process.env.CLIENT_URL}/google-success?token=${token}`
      );
    }
  );
    
export default router;
