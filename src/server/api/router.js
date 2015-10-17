'use strict';
var express = require('express');
var router = express.Router();
router.get("/test", function (req, res) {
    res.send("Test router express change");
});
module.exports = router;

//# sourceMappingURL=router.js.map
