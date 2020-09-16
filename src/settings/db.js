const mongoose = require("mongoose");
//'mongodb://localhost/db_multibodegas'
const conection_url ="mongodb+srv://islam:tjysCX2czL0vdZcD@cluster0.hgpt5.mongodb.net/db_api_mutlibodegas?retryWrites=true&w=majority";
mongoose.connect(conection_url,{
    useCreateIndex : true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(data => console.info("db is connected"))
.then(err => console.error(err));