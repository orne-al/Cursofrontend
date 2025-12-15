/*
let nombre = prompt("Ingrese el nombre: ");
let correo = prompt("Ingrese el correo: ");
let mensaje = prompt("Ingrese el mensaje: ");

if(nombre != "" && correo != "" && mensaje != "")
{
    console.log("Formulario Completo. Listo para enviar");
}else{
    console.log("Faltan completar campos obligatorios");
}

*/

const ropa = [ 'Remeras', 'Pantalones' , 'Gorras'];
let contador = 0;

for(const prenda of ropa)
{
    alert(prenda);
    contador++;
}

console.log("Hay " + contador + " productos");
console.log("Lista de productos mostrada correctamente");
console.log(2 + "3");