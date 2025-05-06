const express = require("express");
const router = express.Router();
const db = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/sign-in", async (req, res) => {
    try {
        const [emailRows] = await db.execute(
            "SELECT email FROM users WHERE email = ?",
            [req.body.email]
        );
        // email check
        if (emailRows.length > 0) {
            return res
                .status(500)
                .json({ success: false, data: "Email already exists." });
        }

        const [nameRows] = await db.execute(
            "SELECT name FROM users WHERE name = ?",
            [req.body.name]
        );
        // name check
        if (nameRows.length > 0) {
            return res
                .status(500)
                .json({ success: false, data: "Name is already taken." });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // creating user
        await db.execute(
            "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
            [req.body.email, hashedPassword, req.body.name]
        );

        return res.status(200).json({ success: true, data: "" });
        // Get JWT key and login user automaticaly
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, data: "Database error." });
    }
});

router.post("/log-in", async (req, res) => {
    try {
        const [userRows] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [req.body.email]
        );

        console.log(userRows[0].password);

        bcrypt.compare(
            req.body.password,
            userRows[0].password,
            (error, isMatch) => {
                if (error || !isMatch) {
                    return res
                        .status(400)
                        .json({ success: false, data: "Invalid credentials." });
                }

                const token = jwt.sign(
                    {
                        userId: userRows.id,
                        username: userRows.name,
                    },
                    process.env.JWT_KEY,
                    { expiresIn: "15m" }
                );

                return res.status(200).json({ success: true, data: token });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
