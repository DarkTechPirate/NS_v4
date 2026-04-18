require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

require("./config/passport")(passport);
const connectMongo = require("./config/connectMongo");

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    
    socket.on("join", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined their own room`);
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
    });
});

app.set('io', io); // make io available in controllers if needed


app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// API Routes
app.use("/api", require("./routes/index"));

const port = process.env.PORT || 3000;

(async () => {
    try {
        await connectMongo();
        server.listen(port, "0.0.0.0", () => {
            console.log(`☑️ Server running on port ${port}`);
        });
    } catch (err) {
        console.error("Startup failed:", err);
        process.exit(1);
    }
})();

// Graceful Custom Shutdown
const mongoose = require("mongoose");
mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected");
});
