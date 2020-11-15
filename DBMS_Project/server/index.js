const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user : 'root',
    host : 'localhost',
    password : 'Cool_18#gUy@&yO',
    database : 'customer', 
});

app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const type = req.body.type;
    const country = req.body.country;
    const prem = req.body.prem;

    db.query("INSERT INTO cust_det (name, age, gender, type, country, prem) VALUES (?,?,?,?,?,?)",
    [name, age, gender,type, country, prem], 
    (err, result) => {
        if(err){
            console.log(err)
        }
        else{
            res.send("Values Inserted");
        }
    })
});

app.get("/showCust", (req,res) => {
    db.query("SELECT * FROM cust_det", (err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.put('/update', (req,res) => {
    const id = req.body.id;
    const age = req.body.age;
    db.query("UPDATE cust_det SET age= ? WHERE id=?", [age, id], (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
})

app.delete('/delete/:id', (req,res) => {
    const id = req.params.id
    db.query("DELETE FROM cust_det WHERE id=?",id, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.listen(3001, ()=> {
    console.log("Hooray!, running on port 3001");
});

