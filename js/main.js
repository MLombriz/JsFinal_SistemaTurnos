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

