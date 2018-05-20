const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
// const {database, Post, Vote } = require('./models');
const Sequelize = require('sequelize');
const app = express();

app.use(express.static("public"));

app.set('view engine','pug');
app.use(bodyParser.urlencoded({ extended:true}));



const dbquest = new Sequelize('databasequestionnaire','root','', {
    host: 'localhost',
    dialect:'mysql'
});

app.get('/', (req, res ) => {
    Post
        .findAll()
        .then(posts => res.render('home', {posts}));
});

app.get('/', (req, res ) => {
    Reponse
        .findAll()
        .then(reponses => res.render('home', {reponses}));
});

app.post('/api/post', (req,res) => {
    const question1 = req.body.question1;
    const question2 = req.body.question2;
    const question3 = req.body.question3;
    Post
        .create({question1,question2,question3})
        .then(()=> {
            res.redirect('/')
        })
});

app.post('/api/post', (req,res) => {
    const question1 = req.body.question1;
    const question2 = req.body.question2;
    const question3 = req.body.question3;
    Post
        .create({question1,question2,question3})
        .then(()=> {
            res.redirect('/')
        })
});

const Post = dbquest.define('post', {
    question1:{
        type:Sequelize.STRING
    },
    question2:{
        type:Sequelize.STRING
    },
    question3:{
        type:Sequelize.STRING
    }
});

Post
    .sync()
    .then(()=>{
        Post.create({
            question1: " 2+2 = quoi ?",
            question2:"la capital de l'Andorre",
            question3:" Miroir c'est qui le bg?"
        })
    });
Post
.sync()
    .then(()=>{
        Post.create({
            question1: "qui a volé l'orange ?",
            question2:"qu'elle est la réponse a toute les questions ?",
            question3:" qui a suicidé Hitler ?"

        })
    });


const Reponse = dbquest.define('reponses', {
    reponse1:{
        type:Sequelize.STRING
    },
    reponse2:{
        type:Sequelize.STRING
    },
    reponse3:{
        type:Sequelize.STRING
    }
});
// Le formulaire pour répondre aux questions rencontre un probleme
// il ne trouve pas /api/reponse/ donc il ne peut pas enregistrer mes reponse dans la database
// je n'ai jamais reussi a trouver la cause
Reponse
    .sync()
    .then(()=>{
        Reponse.create({
            reponse1: "c'est pas moi !",
            reponse2:"42",
            reponse3:" c'est Louis Charavner! "

        })
    });




app.listen(3000, () => {
    console.log('listening on port 3000');
});
