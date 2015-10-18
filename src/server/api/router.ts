'use strict';
import express = require('express');

var router = express.Router();

router.get("/test", (req:any, res:any) => {
    res.send("Test router express change");
});

export = router;