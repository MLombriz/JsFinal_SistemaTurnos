

// LISTADO DE MOVIMIENTOS

// Creo Movimientos de Gastos / Ingresos
const mov1 = new Movimiento("Ingreso","Sueldo","02/04/2021",45000,"pesos","Ingreso Sueldo");
const mov2 = new Movimiento("Egreso","Expensas","05/04/2021",8000,"pesos","Expensas Abril");
const mov3 = new Movimiento("Egreso","Alquiler","05/04/2021",30000,"pesos","Alquiler Depto");

let totalMov = [];
// "Pusheamos" los movimientos del mes en el array
totalMov.push(mov1,mov2,mov3);

console.log(totalMov);

// Oculto el listado
let btnMovimientosOff = document.getElementById("btnMovementsOff");
btnMovimientosOff.onclick = () => {
    let checkListado = document.getElementById("movCargados")
    if (checkListado!=null){
        console.log("Ocultando Listado Movimientos..")
        let listado = document.getElementById("movCargados");
        listado.parentNode.removeChild(listado);
    }else{
        console.log("Listado ya se encuentra oculto")
    }
    
}
// Muestro el listado
let btnMovimientosOn = document.getElementById("btnMovementsOn");
btnMovimientosOn.onclick = () => {
    let checkListado = document.getElementById("movCargados");
    if (checkListado == null){
        console.log("Mostrando Listado Movimientos..");
        // Genero el div "movCargados"
        let divMov = document.createElement("div");
        divMov.setAttribute("id","movCargados");
        divMov.innerHTML = '<h2>Listado de movimientos</h2>';
        document.body.appendChild(divMov);
        // Agrego los movimientos en la plataforma:
        let contador = 0;
        for (const movimiento of totalMov) {
            contador += 1;
            // Creo un elemento p para mostrar los movimientos cargados
            let parrafoMov = document.createElement("p");
            // Le genero el valor
            parrafoMov.innerHTML = `Movimiento ${contador} - Tipo: ${movimiento.tipo} - Monto: ${movimiento.importe} ${movimiento.moneda} - Descripcion: ${movimiento.descripcion}`;
            // Anexo el parrafo al final
            document.getElementById("movCargados").appendChild(parrafoMov);
        }
    }else{
        console.log("Ya se esta mostrando el listado")
    }
    
}



// VALIDAR FORMULARIO
// Creo la funcion validarFormulario
function validarFormulario(e) {
    e.preventDefault();
    console.log('Datos Cargados')
}
let formularios = document.getElementsByTagName("form");
for (const iterator of formularios) {
    iterator.addEventListener("submit", validarFormulario)
}
