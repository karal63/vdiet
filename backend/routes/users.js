const express = require("express");
const router = express.Router();
const db = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateTokens(user) {
    const accessToken = jwt.sign(
        {
            userId: user.id,
            username: user.name,
        },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        {
            userId: user.id,
            username: user.name,
        },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
}

router.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const [emailRows] = await db.execute(
            "SELECT email FROM users WHERE email = ?",
            [email]
        );
        if (emailRows.length > 0) {
            return res
                .status(500)
                .json({ success: false, data: "Email already exists." });
        }

        const [nameRows] = await db.execute(
            "SELECT name FROM users WHERE name = ?",
            [name]
        );
        if (nameRows.length > 0) {
            return res
                .status(500)
                .json({ success: false, data: "Name is already taken." });
        }

        await db.execute(
            "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
            [email, hashedPassword, name]
        );
        return res.sendStatus(201);
    } catch (error) {
        res.status(400).json({ success: false, data: "Database error." });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const [userRows] = await db.execute("SELECT * FROM users WHERE email = ?", [
        email,
    ]);
    const user = userRows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
        const { accessToken, refreshToken } = generateTokens(user);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/refresh",
        });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.sendStatus(200);
    } else {
        res.status(401).json({
            success: false,
            message: "Invalid credentials.",
        });
    }
});

router.post("/refresh", async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);
    // .json({ success: false, message: "Invalid credentials." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
        const accessToken = jwt.sign(
            {
                userId: decoded.userId,
                username: decoded.username,
            },
            process.env.JWT_ACCESS_TOKEN,
            { expiresIn: "15m" }
        );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(403);
    }
});

router.get("/auth/status", (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.sendStatus(401);
    // .json({ status: false, message: "Invalid credentials." });
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        res.status(200).json({ user: decoded });
    } catch (error) {
        req.sendStatus(403);
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("refreshToken", { path: "/refresh" });
    res.clearCookie("accessToken");
    res.sendStatus(200);
});

const verifyKey = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return res.sendStatus(401);
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        req.decodedUser = decoded;
        next();
    } catch (error) {
        res.sendStatus(401);
    }
};

router.post("/users/history", verifyKey, async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT history FROM users WHERE id = ?",
            [req.decodedUser.userId]
        );

        const parsedHistory = JSON.parse(rows[0].history);

        const isExisting = parsedHistory.find(
            (day) => day.date === req.body.today
        );

        if (isExisting) {
            const updatedHistory = parsedHistory.map((day) => {
                if (day.date === req.body.today) {
                    return {
                        date: day.date,
                        food: [],
                    };
                }
                return day;
            });
            const jsonUpdatedHistory = JSON.stringify(updatedHistory);

            await db.execute("UPDATE users SET history = ? WHERE id = ?", [
                jsonUpdatedHistory,
                req.decodedUser.userId,
            ]);
        } else {
            await db.execute("UPDATE users SET history = ? WHERE id = ?", [
                JSON.stringify([
                    ...parsedHistory,
                    { date: req.body.today, food: [] },
                ]),
                req.decodedUser.userId,
            ]);
        }
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
});

router.get("/users/history", verifyKey, async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT history FROM users WHERE id = ?",
            [req.decodedUser.userId]
        );

        res.status(200).json(rows[0]);
    } catch (error) {
        res.sendStatus(400);
    }
});

module.exports = router;
