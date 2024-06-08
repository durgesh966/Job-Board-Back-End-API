const express = require("express");
const app = express();
require("colors");
require("dotenv").config({ path: ".env" });

const port = process.env.PORT || 9000;

app.get("/", (req, res)=>{
   res.send("Hello i am Durgeh");
});

app.listen(port, () => {
    console.log(`Serer Listening on http://localhost:${port}`.bgGreen.black);
})