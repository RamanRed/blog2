const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const path = require('path');

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "blog",
    password: "raman2004@postgreSQL",
    port: 5432,
});

client.connect();

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("blog");
});

app.get("/read", (req,res) => {
    res.render("read.ejs")    
});

app.post("/read", (req,res)=>{

});

app.post("/add", async (req, res) => {
    const { author, idea, link, description } = req.body;
    
    try {
        await client.query("INSERT INTO blog (img, description, idea, summary) VALUES ($1, $2, $3, $4)", [link, description, idea, author]);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        console.log(`error : ${err}`);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
