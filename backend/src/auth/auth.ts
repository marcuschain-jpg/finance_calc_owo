import express from "express";
const bcrypt = require('bcrypt');
const router = express.Router();
import pool from '../../db';

router.post("/register", async(req,res) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const DOB = req.body.DOB;
    const password = req.body.password;
    const saltRounds = 10;
    let hashedPassword = "";

    try
    {
        hashedPassword = await bcrypt.hash(password, saltRounds);
        const output = await pool.query(`
        INSERT INTO users(email, firstname, lastname, password, dob)
        VALUES ($1, $2, $3, $4, $5)
        `, [email, firstName, lastName, hashedPassword, DOB]);
        if(output) return res.status(200).send();
    }
    catch(err){
        console.log(err)
        return res.status(500).send();
    }
});

router.post("/login", (req,res) => {
    // Authenticate with db
    // Create JWT token and store in httponly
    res.status(200).json({message: 'Hello!!!'})
});

export default router;