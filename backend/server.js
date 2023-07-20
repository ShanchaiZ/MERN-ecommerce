//Installed Dependencies:
const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const app = express();

// Create Server with Socket.IO for Realtime Client Server Communication:
const httpServer = createServer(app);
global.io = new Server(httpServer);

const apiRoutes = require("./routes/apiRoutes");

// MongoDB Connection:
//=====================================================================
const connectDB = require("./config/db");
connectDB();

// Middleware:
//====================================================================
app.use(express.json()); //used to parse json object for express to read from each request
app.use(cookieParser()); //used to parse cookies for authentication and session logins
app.use(fileUpload()); //used for uploading files

const admins = []; //Initial storage of logged in administrators
let activeChats = []; //Initial storage of active chats

// Real Time Chatting using Socket IO:
io.on("connection", (socket) => {
    socket.on("admin connected to server", (adminName) => {
        admins.push({ id: socket.id, admin: adminName });
    })
    // Client Sends message to Socket server
    socket.on("client sends message", (msg) => {
        if (admins.length === 0) {
            socket.emit("no admin", "");
        } else {
            // Socket Server sends message from client to admin:
            socket.broadcast.emit("server sends message from client to admin", {
                message: msg,
            })
        }
    })

    // Admin sends message to client using Socket Server:
    socket.on("admin sends message", ({ message }) => {
        socket.broadcast.emit("server sends message from admin to client", message);
    })

    socket.on("disconnect", (reason) => {
        // admin disconnected
        const removeIndex = admins.findIndex((item) => item.id === socket.id);
        if (removeIndex !== -1) {
            admins.splice(removeIndex, 1);
        }
    })
})

app.use("/api", apiRoutes);

//Routes:
//=====================================================================
app.get("/", async (req, res, next) => {
    res.send("Hello Shoppers!!");
});


// Error Handler in console:
// ===================================================================
app.use((error, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        console.error(error);
    }
    next(error);
})

// Error Handler displayed in WebBrowser:
app.use((error, req, res, next) => {
    if (process.env.NODE_ENV == 'development') {
        res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    } else {
        res.status(500).json({ message: error.message });
    }
});


// App is listening on port:
//======================================================================
const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () =>
    console.log(`App is listening on ${PORT}`)
);