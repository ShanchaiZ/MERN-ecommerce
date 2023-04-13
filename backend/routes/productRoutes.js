const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Handling Product Routes! for example: product searching");
});

module.exports = router;