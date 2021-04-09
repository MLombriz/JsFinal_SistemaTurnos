class Agente{
    constructor(nombre,apellido,mail, telefono){
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.telefono = telefono;
    }
}

class Vivienda{
    constructor(id, direccion, tipo, ambientes, operacion, estado, dormitorios, precio, moneda, expensas = " ", disponible = true ){
        this.id = id;
        this.direccion = direccion;
        this.tipo = tipo;
        this.ambientes = ambientes;
        this.operacion = operacion;
        this.estado = estado;
        this.dormitorios = dormitorios;
        this.precio = precio;
        this.moneda = moneda;
        this.expensas = expensas;
        this.disponible = disponible;
    }

    reservado(){
        // Cambio el estado del inmueble reservado
        this.estado = "Reservado";
    }

    alquilado(){
        this.estado = "Alquilado";
        this.disponible = false;
    }
}

class diaSemana{
    constructor(id,dia, diminutivo, hsInicial, hsFinal){
        this.id = id;
        this.dia = dia;
        this.diminutivo = diminutivo;
        this.hsInicial = hsInicial;
        this.hsFinal = hsFinal;
    }
}

class Mes{
    constructor(id,nombre, diminutivo){
        this.id = id;
        this.mes = nombre;
        this.diminutivo = diminutivo;
    }
}
