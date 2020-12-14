var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 6666;

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


async function GetDataNit(nit){
   
    let url = 'https://free.feel.com.gt/api/v1/obtener_contribuyente';
    
    axios.post(url,{nit: nit})
    .then((response) => {
        let json = response.data;
        let respuesta = `${json.descripcion},${json.direcciones.direccion}`;        
        return respuesta;
 
    }, (error) => {
        console.log(error);
        return "error";
    });
};

app.get("/",function(req,res){
  res.send('Hola Alexis Burgos');  
	//res.sendFile(path + 'index.html');
}); 

app.get("/datosnit",async function(req,res){
  
  let nit = req.query.nit;
  
  let url = 'https://free.feel.com.gt/api/v1/obtener_contribuyente';
    
    axios.post(url,{nit: nit})
    .then((response) => {
        let json = response.data;
        let respuesta = `${json.descripcion},${json.direcciones.direccion}`;        
        return respuesta;
 
    }, (error) => {
        console.log(error);
        return "error";
    });

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
