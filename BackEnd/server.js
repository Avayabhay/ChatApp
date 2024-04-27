const express = require("express");

const app = express();

//root route
app.get("/", (req, res) => res.send("Welcom !!e"));

app.listen(5000, () => console.log("Server is runnig at 5000"));
