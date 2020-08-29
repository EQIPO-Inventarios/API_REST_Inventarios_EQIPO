const mongoose = require("mongoose");

 mongoose.connect("mongodb://localhost/db_multibodegas",{
    useNewUrlParser : true,
    useUnifiedTopology: true
})
.then(data => console.log("db is connected"))
.then(err => console.error(err));