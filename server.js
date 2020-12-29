var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var axios = require('axios');

var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3300;

app.use(bodyParser.json());

app.use(express.static('librerias'));

var path = __dirname + '/';
var pathLibrerias = __dirname + '/librerias/';

//manejador de rutas
router.use(function (req,res,next) {
  
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name, pplication/json');
        // Set to true if you need the website to include cookies in the requests sent
      res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});


function GetDataNit(nit){
   
    let url = 'https://free.feel.com.gt/api/v1/obtener_contribuyente';
    
    return new Promise((resolve,reject)=>{
        axios.post(url,{nit: nit})
        .then((response) => {
            let json = response.data;
            let respuesta = `${json.descripcion},${json.direcciones.direccion}`;        
            resolve(respuesta);
    
        }, (error) => {
            console.log(error);
            reject("error");
        });
        
    });

    
};

app.get("/",function(req,res){
  res.send('Hola Alexis Burgos');  
	//res.sendFile(path + 'index.html');
}); 


app.get("/datosnit", function(req,res){
    
    let nit = req.query.nit;
    console.log(nit);
    
    let url = 'https://free.feel.com.gt/api/v1/obtener_contribuyente';
try {
  axios.post(url,{nit: nit})
    .then((response) => {
        let json = response.data;
        if(json.respuesta=true){
          let respuesta =  `${json.descripcion};${json.direcciones.direccion}`;        
          res.send(respuesta);
        }else{
          res.send('error');
        };
    }, (error) => {
        console.log(error);
        res.send("error");
    });
} catch (error) {
  res.send('error');
}
    
 
}); 

app.get("/funciones", (req,res)=>{
  res.sendFile(pathLibrerias + 'funciones.js');
});

app.use("/",router);

app.use("*",function(req,res){
  res.send('<h1 class="text-danger">NO DISPONIBLE</h1>');
});


io.on('connection', function(socket){
  
  socket.on('tarea nueva',function(msg,user){
    io.emit('tarea nueva',msg);
  });

  
});


http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});
