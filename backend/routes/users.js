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

        const user = userRows[0];
        if (!user) {
            return res
                .status(400)
                .json({ success: false, data: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ success: false, data: "Invalid credentials." });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                username: user.name,
            },
            process.env.JWT_KEY,
            { expiresIn: "15m" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        return res.status(200).json({ success: true, data: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, data: "Server error." });
    }
});

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res
                .status(401)
                .json({ status: false, message: "No token provided." });
        }

        const user = jwt.verify(token, process.env.JWT_KEY);
        req.user = user;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        return res
            .status(401)
            .json({ success: false, message: "Invalid token" });
    }
};

// router.get("/protected/dashboard", verifyToken, (req, res) => {
//     res.status(200).json({ success: true, user: req.user });
// });

router.get("/auth/status", verifyToken, (req, res) => {
    return res.status(200).json({ status: true, user: req.user });
});

module.exports = router;
