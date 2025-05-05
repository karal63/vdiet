const express = require("express");
const router = express.Router();
const db = require("../db.js");

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
                .json({ success: false, message: "Email already exists." });
        }

        const [nameRows] = await db.execute(
            "SELECT name FROM users WHERE name = ?",
            [req.body.name]
        );
        // name check
        if (nameRows.length > 0) {
            return res
                .status(500)
                .json({ success: false, message: "Name is already taken." });
        }

        // creating user
        db.execute(
            "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
            [req.body.email, req.body.password, req.body.name]
        );

        res.status(200).json({
            success: true,
            mess: "Account created.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Databse error" });
    }
});

module.exports = router;
