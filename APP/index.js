//GLOBAL VARS
let GlobalTitulo = 'Gestión de Tareas';
let root = document.getElementById('root');
let rootMenu = document.getElementById('rootMenu');

let GlobalCodColaborador = '666';
let GlobalNomColaborador = 'Alexis Burgos'
let GlobalCargo = 'Programador'


document.getElementById('lbTitulo1').innerText = GlobalTitulo;
document.getElementById('lbTitulo2').innerText = GlobalTitulo;


let btnModal = document.getElementById('btnModal');
btnModal.addEventListener('click',()=>{
    $('#modalV').modal('show');
})


function fcnInicializar(){

    
    //inicia parámetros de la tarea
    let f = new Date();
    let cmbMes = document.getElementById('cmbMes');
    cmbMes.innerHTML = funciones.ComboMeses();
    cmbMes.value = f.getMonth() + 1;
    let cmbAnio = document.getElementById('cmbAnio');
    cmbAnio.innerHTML = funciones.ComboAnio();
    cmbAnio.value = f.getFullYear();
    
    document.getElementById('lbTColaborador').innerText = GlobalNomColaborador;
    document.getElementById('lbTCargo').innerText = GlobalCargo;
    document.getElementById('txtTFecha').value = funciones.getFecha();

};


fcnInicializar();
