const express = require('express');
const cors = require('cors');
const sql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = sql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
});

app.post('/add',(req,res)=>{
    const{sname,address,email,dept,description} = req.body;
    const q = "INSERT INTO portal (sname,email,address,dept,description) VALUES (?,?,?,?,?)";
    db.query(q,[sname,email,address,dept,description],(err,result)=>{
        if(err)return res.status(500).json(err);
        return res.status(200).json({message:"Details added!"});
    });
});

app.get('/all',(req,res)=>{
    const q = "SELECT * FROM portal ORDER BY id";
    db.query(q,(err,result)=>{
        if(err)return res.status(500).json(err);
        return res.status(200).json(result);
    });
});

app.listen(process.env.PORT,()=>{console.log("Server running successfully!")});
