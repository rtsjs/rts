'use strict';
var express = require('express');
var api = express.Router();
api.get("/test", function (req, res) {
    res.send("Test api express change");
});
module.exports = api;

//# sourceMappingURL=router.js.map
