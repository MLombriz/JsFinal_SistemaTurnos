class Agente{
    constructor(nombre,apellido,mail, telefono){
        this.name = nombre;
        this.surname = apellido;
        this.mail = mail;
        this.cel = telefono;
    }
}

class Vivienda{
    constructor(id, direccion, tipo, ambientes, operacion, estado, dormitorios, precio, moneda, expensas = " ", ){
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
