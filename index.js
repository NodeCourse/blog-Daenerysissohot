const express = require('express');
const bodyParser = require('body-parser');
// const {database, Post, Vote } = require('./models');
const Sequelize = require('sequelize');
const app = express();
app.use(express.static("public"));

app.set('view engine','pug');
app.use(bodyParser.urlencoded({ extended:true}));



const db = new Sequelize('database','root','', {
    host: 'localhost',
    dialect:'mysql'
});

app.get('/', (req, res ) => {
    Post
        .findAll()
        .then(posts => res.render('home', {posts}));
});

app.post('/api/post', (req,res) => {
    const { title,content } = req.body;
    Post
        .create({title,content})
        .then(()=> res.redirect('/'))
});
app.post('/api/post', (req,res) => {
    const  title = req.body.title;
    Post
        .create({title,title})
        .then(()=> {
            res.redirect('/')
        })
});

const User = db.define ('user', {
    fullname: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING }
});



User
    .sync()
    .then(() => {
        User.create({
            fullname: 'Jane Doe',
            email: 'jane.doe@gmail.com'
        });
    })
    .then(() => {
        User.create({
            fullname: 'John Doe',
            email: 'john.doe@gmail.com'
        });
    })
    .then(() => {
        return User.findAll();
    })
    .then((users) => {
        console.log(users);
    });

app.post('/api/post/:postID/upvote', (req, res) => {
    Vote
        .create({ action: 'up',postId: req.params.postId})
        .then(() => res.redirect('/'));
});

app.post('/api/post/:postID/downvote', (req, res) => {
    Vote
        .create({ action: 'down',postId: req.params.postId})
        .then(() => res.redirect('/'));
});


const Post = db.define('post', {
    title:{
        type:Sequelize.STRING
    }
});

Post
    .sync()
    .then(()=>{
        Post.create({
            title: "1er post"
        })
    });

const Vote = db.define('vote', {
    action: {
        type: Sequelize.ENUM('up','down')
    }
});





Post.hasMany(Vote);


Vote.sync()

app.listen(3000, () => {
    console.log('listening on port 3000');
});
