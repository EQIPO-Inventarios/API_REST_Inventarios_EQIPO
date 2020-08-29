const express = require("express"),
        morgan = require("morgan"),
        path = require("path"),
        bodyParser = require("body-parser");

const app = express();

app.set("port", process.env.PORT || 3000);

//middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended: true}));

//routes
app.use("/api", require("./routes/app"));

app.listen(app.get("port"), () =>{
    console.log("Server on Port", app.get("port"))
})

