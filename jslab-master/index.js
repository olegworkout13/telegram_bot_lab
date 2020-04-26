
const express = require("express");
const app = express();

app.get("/*", function(_request, response){
     
    response.send(_request.url + " 80");
});
app.listen(80);