/* 
let num1= parseFloat(prompt("Ingrese el primer numero: "));
let num2= parseFloat(prompt("Ingrese el segundo numero: "));



if(isNaN(num1) && isNaN(num2))
{

    print("Error. Numero no Valido");

}else{

    let suma = num1+num2;
    let multiplicacion = num1 * num2;
    let division = num1/num2;
    let resto= num1 % num2;

    console.log("Suma: " + suma);
    console.log("Multiplicacion: " + multiplicacion);
    console.log("Division: " + division);
    console.log("Resto: " + resto);

}
*/

let nombre = prompt("Ingrese el nombre: ");
let edad= parseInt(prompt("Ingrese la edad: "));

if(isNaN(edad))
{
    console.log("Error. Edad Invalida");

}else{
    console.log("La persona se llama " + nombre + " y tiene " + edad + " años");

}

if(edad>=18)
{
    console.log("Es mayor de edad");
}else{
    console.log("Es menor de edad");
}