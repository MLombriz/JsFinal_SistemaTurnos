class Usuario{
    constructor(nombre, apellido, mail, apodo = " ", clave, id = " "){
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.apodo = apodo;
        this.clave = clave;
        this.id = id;
    }
        exito(){
            return 'Usuario creado con exito'
        }

        existente(){
            return 'Usuario ya previamente existente'
        }
}

class Movimiento{
    constructor(tipo, categoria, fecha, importe, moneda, descripcion = " "){
        this.tipo = tipo;
        this.categoria = categoria;
        this.fecha = fecha;
        this.importe = importe;
        this.moneda = moneda;
        this.descripcion = descripcion;
    }

    guardar(){
        return `Se ha guardado el ${this.tipo} ${this.categoria} por un importe de ${this.importe}`;
    }

    eliminar(){
        return `Se ha eliminado el ${this.tipo} ${this.categoria} por un importe de ${this.importe}`;
    }
}

// CATEGORIAS DE CUENTA
class Cuenta{
    constructor(nombre){
        this.nombre = nombre;
    }
}

let efectivo = new Cuenta("efectivo");
let tarjeta = new Cuenta("tarjeta");

// CATEGORIAS DE INGRESO
class Ingreso{
    constructor(nombre){
        this.nombre = nombre;
    }
}

let deposito = new Ingreso("deposito");
let sueldo = new Ingreso("sueldo");
let ahorro = new Ingreso("ahorro");

let ingresoCategorias = [deposito,sueldo,ahorro];

// CATEGORIAS GASTOS
class Gasto{
    constructor(nombre){
        this.nombre = nombre;
    }
}

let auto = new Gasto("auto");
let ropa = new Gasto("ropa");
let entretenimiento = new Gasto("entretenimiento");
let comida = new Gasto("comida");
let nafta = new Gasto("nafta");
let general = new Gasto("general");
let regalo = new Gasto("regalo");
let salud = new Gasto("salud");
let vacaciones = new Gasto("vacaciones");
let casa = new Gasto("casa");
let hijos = new Gasto("hijos");
let shopping = new Gasto("shopping");
let deporte = new Gasto("deporte");
let transporte = new Gasto("transporte");

let gastoCategorias = [auto, ropa, entretenimiento, comida, nafta, general, regalo,
salud, vacaciones, casa, hijos, shopping, deporte, transporte];
