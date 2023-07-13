//Installed Dependencies:
const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const app = express();

// Create Server with Socket.IO for 
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