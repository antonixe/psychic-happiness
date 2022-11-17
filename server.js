const express = require("express"); //saving function
const app = express();
const assetsRouter = require("./routes/assets");
const mongoose = require("mongoose");


mongoose.connect("mongodb://0.0.0.0/PRACTICUM");

app.use(express.urlencoded({ extended: false })); //interact with forms 
app.use("/assets", assetsRouter); // like a path to forms 

app.use(express.static("public")); // set to global no need to recall everytime


app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("assets/home")
})

app.listen(3000, console.log("practicum"));