const express = require("express");
const router = express.Router();
const y= (req, res) => {
    res.send({ response: "Server is up and running." }).status(200);
  }
router.get(y);

module.exports = router;