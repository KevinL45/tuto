//On installe les modules.
// npm install nodemon
// npm install babel-register
// npm install express

//Pas en global car en moment du démarrage du serveur, il va pas retrouver les modules
//Rapelle pour installer un module en global : npm install -g ...


//Création d'un package.json
// npm init 

//Importation du module babel-register, il sert à lire ES6
require("babel-register")

//Exportation du module express, il permet de créer un serveur
const express = require("express")

//ça permet d'utiliser la méthoode POST
const bodyParser = require("body-parser");

const {success, error} = require('./function');
const { memberExpression } = require("babel-types");

//Création d'une instance express
const app = express()

//Permet de parser les données Json
app.use(bodyParser.json());
//Permet de parser les données urlencoded
app.use(bodyParser.urlencoded({ extended : true}));

//requête http, réponse http, fonction suivante
app.use((req,res,next)=>{
    console.log('request url :', req.url);
    //Permet de passer à la suite de la requête
    next()
})


const member = [{
    id :1,
    name : 'Kevin',

    id:2,
    name:'John',

    id:3,
    name:'Jack'
}]

//functions

function getIndex(id){
    for (let i = 0; i < member.length; i++){
        if(member[i].id == id){
            return i;
        }
    }
}

function createId(){
    //On retourne l'id du dernier membre
    return member[member.length - 1].id + 1
}

//get

app.get('/api', function(req,res){
    res.send('Bienvenue') 
})

app.get('/api/member/:id',(req,res)=>{
    //Il permet de récupérer l'index de member
    let index = getIndex(req.params.id)

    //Si la variable index est un string
    if (typeof(index) == 'string'){

        //On retourne une erreur
        res.json(error(index))
    }else{
        //Sinon on retourne le member
        res.json(success(member[index]))
    }
})

app.get('/api/members',(req,res)=>{
    
    //Si la requête contient un paramètre max
    if(req.query.max != undefined && req.query.max > 0){

        //On renvoie les membre de 0 à max
        res.json(sucess(member.slice(0,req.query.max)))

    //Si la requête contient un paramètre vide   
    }else if(req.query.max != undefined){

        //On renvoi un paramètre vide
        res.json(error("Mauvaise valeur"))

    //Sinon on retourne tout les membres
    }else{
        res.json(success(member))
    }
})

//post
app.post('/api/members',(req,res)=>{
    if(req.body.name != undefined){
        member.push({
            id: createId(),
            name : req.body.name
        })
        res.json(success(member))
    }else{
        res.json(error("Missing name"))
    }
})



app.listen(8000,() => {
    console.log("Commencer")
})