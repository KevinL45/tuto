//On installe les modules.
//Pas en global car en moment du démarrage du serveur, il va pas retrouver les modules
//Rapelle pour installer un module en global : npm install -g ...
// npm install nodemon
// npm install babel-register
// npm install express

//Création d'un package.json
// npm init 

//Importation du module babel-register, il sert à lire ES6
require("babel-register")

//Exportation du module express, il permet de créer un serveur
const express = require("express")

//ça permet d'utiliser la méthoode POST
const bodyParser = require("body-parser");



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

app.get('/api', function(req,res){
    res.send('Bienvenue')
    
})

app.get('api/book/:id',(req,res)=>{
        //Il permet de récupérer les paramètre de la route
        res.send(req.param)
})

app.listen(8000,() => {
    console.log("Commencer")
})