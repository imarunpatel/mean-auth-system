const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/Mean-Auth-System'));
app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+
        '/dist/Mean-Auth-System/index.html'));
});
app.listen(process.env.PORT || 8080)