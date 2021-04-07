
// Cero un Agente
const agente1 = new Agente("Pedro", "Pombo", "ppombo@inmobiliaria.com", "+54-9-11-32024722");


// Creo un departamento
const depto1 = new Vivienda(1,"Pacheco 3131", "departamento",2,"alquiler","activo",1,30000,"AR$",6800);
const casa1 = new Vivienda(2,"Fraga 1625","casa",6,"venta","activa",3,500000,"U$D");

// Defino los dias de la semana
const lunes = new diaSemana(01,"Lunes", "Lun",12, 19);
const martes = new diaSemana(02,"Martes","Mar",12,19);
const miercoles = new diaSemana(03,"Miercoles","Mie",12,19);
const jueves = new diaSemana(04,"Jueves","Jue",12,19);
const viernes = new diaSemana(05,"Viernes","Vie",12,19);
const sabado = new diaSemana(06,"Sabado","Sab",12,19);
const domingo = new diaSemana(07,"Domingo","Dom",12,19);

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
const diasSemana = [lunes,martes,miercoles,jueves,viernes,sabado,domingo];
const meses = [enero, febrero, marzo, abril, mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre];


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

