const express = require("express"),
        morgan = require("morgan"),
        path = require("path"),
        bodyParser = require("body-parser"),
        config = require("./settings/config");

const app = express();

app.set('key', config.key);
app.set("port", process.env.PORT || 3000);

//middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended: true}));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'access-token,Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//routes
app.use("/api", require("./routes/app"));

app.listen(app.get("port"), () =>{
    console.log("Server on Port", app.get("port"))
})

