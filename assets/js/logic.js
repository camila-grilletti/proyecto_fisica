// Variables pedidas por el usuario
const pendiente = prompt('Desea que el bloque se encuentre en una pendiente? s/n ');
const masa = +(prompt('Ingrese la masa del objeto: '));

// Variables inmutables
const gravedad = 10;
const peso = masa * gravedad;
var dec = 0;
var pesox = 0;
var pesoy = 0;
var ffe = 0;
var ffd = 0;

// Funciones

function complex_float(a, b, uest, udin) {
    pesox = a; 
    pesoy = b; 
    console.log(pesoy);
    ffe = uest * pesoy;
    ffd = udin * pesoy;
    mostrar_resultados();

    return pesox, pesoy, ffe, ffd;
};

function decimal(x) {
    var dec = x.toFixed(2);
    return dec;
}

function mostrar_resultados() {
    console.log(`La Normal es de ${decimal(normal)}`);
    console.log(`El peso en el eje x es de ${decimal(pesox)}`);
    console.log(`El peso en el eje y es de ${decimal(pesoy)}`);
    console.log(`La fuerza de fricción estática es de ${decimal(ffe)}`);
    console.log(`La fuerza de fricción dinámica es de ${decimal(ffd)}`);

    if (ffe > pesox) {
        console.log(`El objeto no se mueve, la friccion es muy alta.\nPara que el objeto se mueva el μe tiene que ser ${decimal(pesox / pesoy)}`);
    } else {
        console.log(`El objeto se mueve a una aceleracion de ${decimal((pesox - ffd) / masa)} m/s`);
    };
};

// Programa

if (pendiente == 's') {
    var normal = peso;
    var anguloa = parseFloat(prompt("Ingrese el angulo 'a': "));
    var anguloc = parseFloat(180 - anguloa);
    var pesox_com = (normal / Math.sin((90 * Math.PI) / 180)) * Math.sin((anguloc * Math.PI) / 180); 
    var pesoy_com = (normal / Math.sin((90 * Math.PI) / 180)) * Math.sin((anguloa * Math.PI) / 180); 
    console.log(pesoy_com);
    var ue = parseFloat(prompt("Ingrese el mu estatico: "));
    var ud = parseFloat(prompt("Ingrese el mu dinámico: "));
    var ffe = peso * ue;
    var ffd = peso * ud;

    complex_float(pesox_com, pesoy_com, ue, ud);
} else {
    var fuerza = parseFloat(prompt('Ingrese la fuerza: '));
    var friccion = prompt('Hay friccion en la simulacion? s/n ');
    var semueve = true;

    if (friccion == 's') {
        var ue = parseFloat(prompt("Ingrese el mu estatico: "));
        var ud = parseFloat(prompt("Ingrese el mu dinámico: "));
        var ffe = peso * ue;
        var ffd = peso * ud;
        if (ffe < fuerza) {
            semueve = true;
            var a_ms2 = (fuerza - ffd) / masa;
        } else {
            semueve = false;
            var f_mover = decimal(ffe);
        };
    } else {
        if (fuerza != 0) {
            semueve = true;
            a_ms2 = fuerza / masa;
        } else {
            semueve = false;
            var f_mover = 0.01;
        };
    };

    if (semueve == true) {
        console.log(`El objeto se mueve a ${decimal(a_ms2)}ms/2`);
    } else {
        console.log(`El objeto no se mueve, se necesitan mas de ${f_mover}N para mover el objeto`);
    };
};