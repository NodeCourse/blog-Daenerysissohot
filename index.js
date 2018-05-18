const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const app = express();
app.use(express.static("public"));
app.set('view engine','pug');
app.use(bodyParser.urlencoded({ extended:true}));

// declaration de la base de donnée "database" sur mysqp
const db = new Sequelize('database','root','', {
    host: 'localhost',
    dialect:'mysql'
});

// declaration de la table Post et ces colonnes dans la database
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

// liste des reviews cree dans la database au lancement du serveur
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

// declaration de la table vote dans la database
const Vote = db.define('vote', {
    action: {
        type: Sequelize.ENUM('up','down')
    }
});

Post.hasMany(Vote);
Vote.belongsTo(Post);
Vote.sync()
// inclure vote a la table post
app.get('/', (req, res ) => {
    Post
        .findAll({include:[Vote]})
        .then(posts => res.render('home', {posts}));
});
// declaration des colonnes dans la table post
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
// attribut des upvote et downvote a la table vote
app.post('/api/post/:postId/upvote', (req, res) => {
    Vote
        .create({ action: 'up',postId: req.params.postId})
        .then(() => res.redirect('/'));
});

app.post('/api/post/:postId/downvote', (req, res) => {
    Vote
        .create({ action: 'down',postId: req.params.postId})
        .then(() => res.redirect('/'));
});


// Le but de cette condition est de rajouter 1 en cas de up et -1 en cas de down
// je n'ai pas réussi a régler le problème qui ne prend en compte que des +1 même si on clique sur dislike
app.post('/api/post/:postId/', (req, res) => {
    Vote
    return this.getDataValue('votes').reduce((total, vote) => {
        if (vote.type === 'up') {
            return total + 1;
        }

        if (vote.type === 'down') {
            return total - 1;
        }

        return total;
    }, 0);
});



app.listen(3000, () => {
    console.log('listening on port 3000');
});
