import express from "express";
const router = express.Router();

router.post("/create", (req,res) => {
    // Take in data
    // Store account info in db
});

router.post("/login", (req,res) => {
    // Authenticate with db
    // Create JWT token and store in httponly
    res.status(200).json({message: 'Hello!!!'})
});

export default router;