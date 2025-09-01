const express=require('express')
const mysql=require('mysql')
const bodyparse=require('body-parser');
const cors=require('cors')
const app = express()
const port=3001;

app.use(cors())
app.use(bodyparse.json())

//mysql

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sathyavdb'
});
db.connect((err) => {
    if (!err) {
        console.log('DB Connected');
    } else {
        console.error('DB Connection Failed:', err.message);
    }
});

//create table
app.get('/createtable',(req,res)=>{
    let sql='create table posts(id int auto_increment,title varchar(100),body text,primary key(id))';
    db.query(sql,(err,result)=>{
        if(!err)
            console.log('table created')
        else
        console.log('table not created')
    })
})

//insert data
app.post('/addpost',(req,res)=>{
    let post={title:req.body.title,body:req.body.body};
    let sql='insert into posts set ?';
    db.query(sql,post,(err,result)=>{
        if(!err)
            res.send('post added')
        else
       res.send('post not added')
    })
})
// Get posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get post by id
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});


// Update post
app.put('/updatepost/:id', (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    const sql = `UPDATE posts SET title = ?, body = ? WHERE id = ?`;
    db.query(sql, [title, body, id], (err, result) => {
        if (err) throw err;
        res.send('Post updated...');
    });
});

// Delete post
app.delete('/deletepost/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM posts WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('Post deleted...');
    });
});

app.listen(port,()=>{
    console.log('Server started at port 3001')

})
