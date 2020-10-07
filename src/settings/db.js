const mongoose = require("mongoose");
//'mongodb://localhost/db_multibodegas'
"mongodb+srv://islam:tjysCX2czL0vdZcD@cluster0.hgpt5.mongodb.net/db_api_mutlibodegas?retryWrites=true&w=majority";
const conection_url ='mongodb://localhost/db_multibodegas';
mongoose.connect(conection_url,{
    useCreateIndex : true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(data => console.info("db is connected"))
.then(err => console.error(err));