const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const usersRouter = require("./routes/users");

app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173", // your Vue dev server
        credentials: true, // ✅ allow cookies
    })
);
app.use(express.json());
app.use("/", usersRouter);

app.listen(5000, () => {
    console.log("Server is running on port 5000.");
});

// fixed the bug, had to put on every fetch credentials include
