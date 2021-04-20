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