const mongoose = require("mongoose");
//'mongodb://localhost/db_multibodegas'
const conection_url ="mongodb://localhost/db_multibodegas";
mongoose.connect(conection_url,{
    useCreateIndex : true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(data => console.info("db is connected"))
.then(err => console.error(err));