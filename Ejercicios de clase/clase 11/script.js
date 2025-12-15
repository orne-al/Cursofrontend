/*
function suma(a,b)
{
    let suma = (a + b) ;
    console.log("La suma es: " + suma);
}

function multiplicacion(a,b)
{
    let multi = (a * b) ;
    console.log("La multiplicacion es: " + multi);
}

function resta(a,b)
{
    let resta = (a-b);
    console.log("La resta es: " + resta);

}

function dividir(a,b)
{
    if(b !== 0){
        let division = a/b;
        console.log("La division es: " + division);
    }else{
        console.log("ERROR. No se puede dividir por cero");
    }
}

suma(2,4);
multiplicacion(2,4);
resta(2,4);
dividir(2,0);

*/

function generarProductos()
{
    const productos = [

        {
            id: 1,
            name: "Camisas",
            description: "Tipo de Camisas",
            precio: 400,

        },
        {
            id:2,
            name: "Remeras",
            description: "Tipo de remeras",
            precio: 450.20,
        },
        {
            id:3,
            name: "Camperas",
            description: "Tipo de abrigo",
            precio: 950,

        },
        {
            id:4,
            name: "Zapatillas",
            description: "Tipo de calzado",
            precio: 359,
        },
        {
            id:5,
            name: "Jeans",
            description: "Tipo de pantalon",
            precio:550,
        },

    ];

    return productos;
}

function recorrerProductos(titulo , productos)
{
    console.log(`------${titulo}------`);

    for({id, name: nombreProducto, description, precio} of productos)
    {
        console.log(`ID: ${id}, name: ${nombreProducto}, description: ${description}, precio: ${precio}`);
    }

}

function Agregarprod(idd,nombreprod,descr,pre)
{
    const prodnuevo = [

    {   
        id: idd,
        name: nombreprod,
        description: descr,
        precio: pre,
    
    }

    ];

    return prodnuevo;
}

function ActualizarCatalogo(prodOferta,catalogoOrig)
{
    const CatalogNuevo = [...catalogoOrig, prodOferta];

    return CatalogNuevo;
}


const CatalogoProds = generarProductos();
recorrerProductos("Catalogo Inicial", CatalogoProds);
const ProductoOferta = Agregarprod(6,"Calzas","Tipo de pantalon",699.99);
const catalogoActualizado = ActualizarCatalogo(ProductoOferta, CatalogoProds);
recorrerProductos("Catalogo Actualizado",catalogoActualizado);
