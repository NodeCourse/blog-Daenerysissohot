const express = require('express');
const passport = require('passport');
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

/*
app.post('/api/post', (req,res) => {
    const { title,content } = req.body;
    Post
        .create({title,content})
        .then(()=> res.redirect('/'))
});
*/
app.post('/api/post', (req,res) => {
    const  title = req.body.title;
    const review = req.body.review;
    const eval = req.body.eval;
    Post
        .create({title,review,eval})
        .then(()=> {
            res.redirect('/')
        })
});






/*
const User = db.define ('user', {
    fullname: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING }
});



User
    .sync()
    .then(() => {
        User.create({
            fullname: 'Lara Croft',
            email: 'Lara.croft@gmail.com'
        });
    })
    .then(() => {
        User.create({
            fullname: 'Solid snake',
            email: 'solid.snake@gmail.com'
        });
    })
    .then(() => {
        return User.findAll();
    })
    .then((users) => {
        console.log(users);
    });
*/
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
    },
    eval:{
        type:Sequelize.STRING
    },
    review:{
        type:Sequelize.STRING
    }
});

Post
    .sync()
    .then(()=>{
        Post.create({
            title: "Fortnite",
            eval:"4",
            review:" super jeux !"
        })
    });
Post
.sync()
    .then(()=>{
        Post.create({
            title: "PUBG",
            eval:"2",
            review: " c'est nul "

        })
    });
Post
.sync()
    .then(()=>{
        Post.create({
            title: "OverWatch",
            eval:"3",
            review: " ça va "
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
