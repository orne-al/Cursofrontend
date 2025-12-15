let zapatillas = [];

let listaCarrito = [];


function insertarProductos(lista) {

    const contenedorZapas = document.querySelector("#productos .contenedorZapas");
    console.log(contenedorZapas);

    for (let c = 0; c < lista.length; c++) {

        const ZapaActual = lista[c];

        const NuevoElem = document.createElement("article");
        NuevoElem.className = "producto";
        NuevoElem.innerHTML = `
             <img src=${ZapaActual.img} alt="Foto zapatilla">

               <div class="producto-texto">
                     <h3>${ZapaActual.nombre}</h3>
                    
                     <p>
                        <a href="#." class="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                        data-descripcion = "${ZapaActual.descripcion}">
                        Ver descripción
                        </a>
                     </p>
                    <div class="descripcion"></div>

                      <p class="producto-precio">${ZapaActual.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</p>
                       <button 
                            class= "btn-agregar" 
                            data-id="${ZapaActual.id}"
                        >
                            Agregar al carrito 
                        </button>
                </div>
        
        `

        contenedorZapas.appendChild(NuevoElem);

    }

}


function ActualizarTotal()
{
    const totalSpan = document.querySelector("#totalCarrito");

    let total = 0;

    for(const producto of listaCarrito)
    {
        total += producto.precio;
    }

    totalSpan.textContent = total.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
}




function BuscarEnLista(id, lista) {
    console.log(id, lista);

    for (const zapatilla of lista) {
        if (zapatilla.id == id) {
            console.log("Encontrado", zapatilla.id);
            return id;
        }
    }

    return -1;
}


function BuscarZapaPorID(id, lista) {
    console.log(id, lista);

    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id === id) {
            console.log(lista[i]);
            return lista[i];
        }
    }
}


function insertarProdHTML(producto) {
    console.log(producto);

    const listcarrito = document.querySelector("#carrito .list-group");
    console.log(listcarrito);

    const elementoli = document.createElement("li");

    elementoli.textContent = `${producto.nombre} ${producto.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}`;
    elementoli.className = "list-group-item";
    listcarrito.appendChild(elementoli);


}

function actualizarContador() {
    const numerocontador = document.querySelector("#carrito .contador");
    console.log(numerocontador);
    numerocontador.textContent = listaCarrito.length;

}

function guardarEnStorage(lista) {
    //convertir en json la lista
    const carritoJSON = JSON.stringify(lista);
    //guardamos en el local storage
    localStorage.setItem("listaCarrito", carritoJSON);

    console.log("Carrito guardado en el local storage");

}



function agregaralCarrito(datosEvento) {
    console.log(datosEvento.target.tagName);

    if (datosEvento.target.tagName == "BUTTON") {
        //vemos el id del boton
        console.log(datosEvento.target.dataset);
        console.log(datosEvento.target.dataset.id);
        console.log(typeof (datosEvento.target.dataset.id));

        const idproducto = parseInt(datosEvento.target.dataset.id);
        console.log(listaCarrito);

        const Idencontrado = BuscarEnLista(idproducto, listaCarrito);
        console.log("encontrado: ", Idencontrado);


        if (Idencontrado == -1) {
            const productoencontrado = BuscarZapaPorID(idproducto, zapatillas);
            console.log(productoencontrado);

            listaCarrito.push(productoencontrado);
            console.log("agregado");
            console.log(listaCarrito);

            insertarProdHTML(productoencontrado);
            actualizarContador();
            guardarEnStorage(listaCarrito);
            ActualizarTotal();

        }





    }
}


function mostrarDescripcion(datosEvento) {
    console.log(datosEvento.target.tagName);

    const elementoEvento = datosEvento.target.tagName;
    if (elementoEvento == "A") {

        datosEvento.preventDefault();
        //obtener el elemento clicado
        const elementoclicado = datosEvento.target;

        //obtener la descripcion del dataser
        console.log(datosEvento.target.dataset.descripcion);
        const descripcionZapas = elementoclicado.dataset.descripcion;
        //encontrar la tarjeta contenedora del boton
        const divCard = elementoclicado.closest(".producto");
        console.log(divCard);
        //obtener el div de la descripcion
        const divDescripcion = divCard.querySelector(".descripcion");
        console.log(divDescripcion);

        if (divDescripcion.children.length == 0) {
            //creamos el elemento que vamos a insertar en este caso el parrafo
            const parrafoDescripcion = document.createElement("p");
            //insertamos el contenido en el parrafo
            parrafoDescripcion.textContent = descripcionZapas;

            //insertamos el parrafo que acabamos de crear en el div
            divDescripcion.appendChild(parrafoDescripcion);
            //cambiamos el texto del enlace
            elementoclicado.textContent = "Ocultar descripcion";

        } else {
            elementoclicado.textContent = "Ver descripcion";
            divDescripcion.innerHTML = "";
        }

    }




}

function vaciarCarrito() {

    //seleccionamos el contenedor en el html y los borramos 
    const listaHTML = document.querySelector("#carrito .list-group");
    listaHTML.innerHTML = "";
    
}



function eliminarStorageyCarrito() {
    //eliminamos el almacenamiento
    localStorage.removeItem("listaCarrito");
    listaCarrito = [];

    //contador actualizar
    actualizarContador();
    //actualizamos el total
    ActualizarTotal();
    //tenemos que eliminar el carrito del HTML usamos otra funcion
    vaciarCarrito();

}


function cargarcarritoStorage() {
    const carritoJSON = localStorage.getItem("listaCarrito");
    if (carritoJSON) {
        //lo pasamos a lista de objetos
        return JSON.parse(carritoJSON);
    } else {
        return [];
    }
}




async function cargarProductosAPI() {
    console.log("Cargar productos");

    try {
        //peticion del archivo json a la URL de la API
        const respuesta = await fetch("./zapatillas.json");
        console.log(respuesta);

        if (!respuesta.ok) {

            throw new Error(`Error al obtener los datos: ${respuesta.status} - ${respuesta.statusText}`);
        }

        const zapatillasArray = await respuesta.json();
        console.log(zapatillasArray);
        return zapatillasArray;
    }

    catch (Datoserror) {
        console.error("Fallo grave en la carga:", Datoserror);

        const ListaUL = document.querySelector("#productos .contenedorZapas");
        ListaUL.innerHTML = '<li id="mensaje-error"> ❌ Error al cargar el catalogo.</li>';

        return [];
    }
}

async function inicioprograma() {
    console.log("Iniciando el programa");
    zapatillas = await cargarProductosAPI();

    insertarProductos(zapatillas);
    const ContenedorZapatillas = document.querySelector("#productos .contenedorZapas");
    console.log(ContenedorZapatillas);

    ContenedorZapatillas.addEventListener("click", mostrarDescripcion);
    ContenedorZapatillas.addEventListener("click", agregaralCarrito);

    //seleccionamos el boton y agregamos el listener a vaciar carrito
    const BotonVaciarCarrito = document.querySelector("#carrito .VaciarCarrito");
    BotonVaciarCarrito.addEventListener("click", eliminarStorageyCarrito);

    listaCarrito = cargarcarritoStorage();
    console.log(listaCarrito);

    if (listaCarrito.length != 0) {
        for (const zapatilla of listaCarrito) {
            insertarProdHTML(zapatilla);
        }
        actualizarContador();
        ActualizarTotal();
    }

}


inicioprograma();