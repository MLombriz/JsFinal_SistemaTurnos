// Inicio / Bienvenida al sitio

alert("Gracias por seleccionar Inmobiliaria para encontrar tu proxima vivienda");
/*
// Creo un Agente
const agente1 = new Agente("Pedro", "Pombo", "ppombo@inmobiliaria.com", "+54-9-11-32024722");
const agente2 = new Agente("Maria","Lopez", "mlopez@inmobiliaria.com", "+54-9-11-3543-7821");
*/
// Creo un departamento
const vivienda1 = new Vivienda(1,"Pacheco 3131", "departamento",2,"alquiler","activo",1,30000,"AR$",6800);
const vivienda2 = new Vivienda(2,"Fraga 1625","casa",6,"venta","activa",3,500000,"U$D");
const vivienda3 = new Vivienda(3,"Viel 224","oficina",2,"alquiler","activo",1,15000,"AR$",4000);

// Defino los dias de la semana
const lunes = new diaSemana(01,"Lunes", "Lun",10, 16);
const martes = new diaSemana(02,"Martes","Mar",15,19);
const miercoles = new diaSemana(03,"Miercoles","Mie",12,19);
const jueves = new diaSemana(04,"Jueves","Jue",15,19);
const viernes = new diaSemana(05,"Viernes","Vie",12,19);
const sabado = new diaSemana(06,"Sabado","Sab",10,13);
const domingo = new diaSemana(07,"Domingo","Dom",0,0);

//Defino los meses
const enero = new Mes(01,"Enero","Ene");
const febrero = new Mes(02,"Febrero","Feb");
const marzo = new Mes(03,"Marzo","Mar");
const abril = new Mes(04,"Abril","Abr");
const mayo = new Mes(05,"Mayo","May");
const junio = new Mes(06,"Junio","Jun");
const julio = new Mes(07,"Julio","Jul");
const agosto = new Mes(08,"Agosto","Ago");
const septiembre = new Mes(09,"Septiembre","Sep");
const octubre = new Mes(10,"Octubre","Oct");
const noviembre = new Mes(11,"Noviembre","Nov");
const diciembre = new Mes(12,"Diciembre","Dic");

// creo un array con los dias de la semana
const viviendas = [vivienda1, vivienda2, vivienda3];
const diasSemana = [lunes,martes,miercoles,jueves,viernes,sabado,domingo];
const meses = [enero, febrero, marzo, abril, mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre];




//Reviso las viviendas disponibles
let viviendasDisponibles = [];
for (const i of viviendas) {
    if (i.disponible == true){
    viviendasDisponibles.push(i.id);
    }
}

// Proceso de RESERVA de Visita
// 1) El usuario seleccionar la vivienda a visitar
let aVisitar = parseInt(prompt("Seleccione el id de la vivienda a visitar. Viviendas disponibles: "+viviendasDisponibles.join(" - ")));


let diasDisponibles = [];
for (const i of diasSemana){
    diasDisponibles.push(i.dia)
}

// 2) Selecciono el dia a visitar
let diaVisitar = prompt("Seleccione el dia a visitar la vivienda. Disponibles: " + diasDisponibles.join(" - "));


// Creo los horarios disponibles
let hsDisponibles = [];
let indiceSemana = 0;
for (let index = 0; index < diasSemana.length; index++) {
    if (diasSemana[index].dia.toLowerCase() == diaVisitar.toLowerCase() ) {
        indiceSemana = index;
        break
    }   
}
for (let index = diasSemana[indiceSemana].hsInicial; index < (diasSemana[indiceSemana].hsFinal+1); index++) {
    hsDisponibles.push(index);
}

// 3) Selecciono el horario a visitar
let hsVisitar = parseInt(prompt("Seleccione el horario a visitar. Horarios Disponibles: "+ hsDisponibles.join("hs - ")));


alert("Usted Reservo el siguiente Turno: Para Domicilio " + viviendas[aVisitar-1].direccion + " a las "
 + hsVisitar + "hs del dia " + diaVisitar +". Nos comunicaremos para confirmar nuevamente el turno, el dia previo a la visita solicitada."  );

vivienda1.reservado()
console.log(vivienda1)



///////////////////////////////////////////////////////////////////////
// Creo un array desde el Dom al Lun (invierto orden)
const listaSemana = [];
for (const i of diasSemana) {
    listaSemana.push(i.dia);
}

const listaMes = [];
for (const i of meses) {
    listaMes.push(i.mes);
}


console.log("Lista Semana:" + listaSemana.join());
const listaSemanaR = listaSemana.filter(i => i.includes('r'));
console.log("Lista dias que contienen 'r': " + listaSemanaR.join());
console.log("Encuentro el mes que tiene 'st':" + listaMes.find(i=> i.includes("st")));
console.log("Listado meses en mayuscula: " + listaMes.map(i=> i.toUpperCase()));

