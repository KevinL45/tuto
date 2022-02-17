//Création d'un package.json
// npm init 

//On installe les modules.
// npm install nodemon
// npm install babel-register
// npm install express

//Pas en global car en moment du démarrage du serveur, il va pas retrouver les modules
//Rapelle pour installer un module en global : npm install -g ...


require('babel-register') //importation du modul babel-register il sert a lire ES6
const express = require('express') // exportation du modile express permet de créer un serveur 
const app = express() //création d'une instance de express
const {success, error} = require('./function') // importatrion du module function.js
const bodyParser = require('body-parser') // pour pouvoir utiliser la méthode POST
app.use(bodyParser.json()) //permet de parser les données json
app.use(bodyParser.urlencoded({ extended: true})) //permet de parser les données urlencoded

app.use((req,res,next) => { //requete http, response http, fonction suivante

    console.log('request url:', req.url)
    next() //permet de passer a la suite de la requête 

})

 const members = [
     {
         id: 1,
         name: 'John',
     },
     {
         id: 2, 
         name: 'Julie',
     },
     {
         id: 3,
         name: 'Jack',
     }
 ]

 let MemberRouter = express.Router()
 MemberRouter.route('/')
 MemberRouter.route('/:id')

 ///////////////////////////RECUPERATION DES MEMBRES ////////////////////////

 app.get('/api/members', (req,res)=> {
     if(req.query.max != undefined && req.query.max > 0){ //si la requête contient un paramètre max
         res.json(success(members.slice(0, req.query.max))) //on renvoie les membres de 0 a max
     } else if (req.query.max != undefined) {// si la requete contient un parametre vide 
         res.json(error("Mauvaise valeur")) //on renvoi un parametre vide 
     } else {
         res.json(success(members)) //sinon on retourne tous les membres 
     }
 })


 app.get('/api/members/:id', (req, res) => { //création de la route qui recupere l'id

    let index = getIndex(req.params.id); //création de la variable index qui contiens la  fonction getIndex qui permet de récuperer l'index du membre

    if (typeof (index) == 'string') { //si la variable index est null
        res.json(error(index)) //on retpurne une erreue
    } else {
        res.json(success(members[index])) //sinon on retourne le membre
    }
 })


 //////////////// AJOUT D'UN MEMBRE POST ///////////////////////////////
//créer une fonction createId avant de faire cette requête 

 app.post('/api/members', (req, res) => {
     if (req.body.name != undefined) { // si la requête contient un parametre name 
         members.push({ //permet d'ajouter un membre a la fin du tableau
             id: createId(), // on lui donne un id 
             name: req.body.name // on lui donne un nom 
         })
         res.json(success(members))  //on retourne le tableau des membres  
         } else {
             res.json(error("nom manquant"))// sinon renvoie une erreur
         }
 })

/////////////////////EDITION D'UN MEMBRE/////////////////////////////////////////

app.put('/api/members/:id', (req, res) => { //c'est la route 
    let index = getIndex(req.params.id)// création d'une variable index qui contient la fonction getIndex qui permet de récuperer l'index du memebre 

    if(typeof(index) == 'string'){
        res.json(error(index))
    }else { 
        let member = members[index] // une variable qui contient le membre modifier 

        if(req.body.name != undefined){
            member.name = req.body.name //on modifie le nom du membre avec l'id passé en parametre dans l'url
            res.json(success(members)) //on retourne le tableau des membres 
        } else {
             res.json(error("nom manquant")) // sinon renvoie une erreur 
        }
        res.json(success(members[index]))// sinon retourne le membre 
    }
})

/////////////////////SUPPRESION D'UN MEMBRE/////////////////////////////////////////
app.delete('/api/members/:id',(req,res)=>{
    let index = getIndex(req.params.id)

    if(typeof(index) == 'string'){
        res.json(error(index))
    }else{
        //On supprime le membre avec l'id
        members.splice(index,1)
    }
    res.json(success(members))
})







app.listen(8000, ()=> {
    console.log('Commencer')
})

function getIndex(id) { //function qui récupere l'index du membre
    for (let i = 0; i < members.length; i++) {
        if (members[i].id == id) {
            return i 
        }
    }
    return "Mauvais id"
}

function createId() { 
    return members[members.length - 1].id +1 // on retourne l'id du dernier membre +1 
}