// Inicio / Bienvenida al sitio

alert("Gracias por seleccionar nuestra plataforma de Gestion de Gastos");

// Creo usuarios

const usuario1 = new Usuario("Martin", "Laborda", "martinlaborda@mail.com", "labo", "123456");
const usuario2 = new Usuario("Javier", "Rodriguez", "javierrodriguez@mail.com", "javi", "123456");


let selectElement = document.getElementsByTagName("select")
// Creo el array de Tipos de Gastos
console.log(selectElement.tipo)
let tipoGasto = [];
for (const iterator of selectElement.tipo) {
    tipoGasto.push(iterator.value)
}
console.log(tipoGasto)


// Creo el array de Categorias Existentes
console.log(selectElement.categorias)
let categoriasExistentes = [];
for (const iterator of selectElement.categorias) {
    categoriasExistentes.push(iterator.value)
}
console.log(categoriasExistentes)

let newCategory = document.getElementById("categoriaNueva")
console.log(newCategory.innerText)


// Creo Movimientos de Gastos / Ingresos
const mov1 = new Movimiento("Ingreso","Sueldo","02/04/2021",45000,"pesos","Ingreso Sueldo");
const mov2 = new Movimiento("Egreso","Expensas","05/04/2021",8000,"pesos","Expensas Abril");
const mov3 = new Movimiento("Egreso","Alquiler","05/04/2021",30000,"pesos","Alquiler Depto");

let totalMov = [];
// "Pusheamos" los movimientos del mes en el array
totalMov.push(mov1,mov2,mov3);

console.log(totalMov);

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

    console.log(parrafoMov)
}
