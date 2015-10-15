'use strict';
var express = require('express');

var api = express.Router();

api.get("/test", function(request, response) {
    response.send("Test api ");
});

module.exports = api;