const mysql = require('mysql2');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'leadb'
}


);
db.connect((err)=>{
    if(err){
        console.log("Connection Failed!",err)
        return;
    }
    console.log("Server is Connected!")

});

module.exports= db;