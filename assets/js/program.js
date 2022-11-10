// Switch
var checkbox = document.getElementById('check1');
var checkbox2 = document.getElementById('check2');

checkbox.addEventListener("change", () => {
    validaCheckbox(checkbox, 'bloque', 'El bloque se encuentra en una pendiente', 'El bloque no se encuentra en una pendiente');
});
checkbox2.addEventListener("change", () => {
    validaCheckbox(checkbox2, 'fric', 'Hay fricción en la simulación', 'No hay fricción en la simulación');
});

function validaCheckbox(check, elem, msg1, msg2) {
    var checked = check.checked;
    if(checked) {
        document.getElementById(elem).innerHTML = msg1;
    } else {
        document.getElementById(elem).innerHTML = msg2;
    };
};

// Forms
const first_form = document.getElementById("firts_form");
const second_form = document.getElementById("second_form");
const third_form = document.getElementById("third_form");
const four_form = document.getElementById("four_form");
const start = document.getElementById('button3');

// General
document.addEventListener("DOMContentLoaded", function() {

    first_form.addEventListener('submit', function(evento) {
        evento.preventDefault();
        var masa = document.getElementById('masa').value;
        if (masa.length == 0) {
            return;
        };

        translate(1);

        let datos = [
            masa = first_form.elements['masa'].value,
            pendiente = checkbox.checked 
        ];
        window.sessionStorage.setItem('datos1', JSON.stringify(datos));
    }); 

    second_form.addEventListener('submit', function(evento) {
        evento.preventDefault();
        var anguloa = document.getElementById('anguloa').value;
        var mu_es = document.getElementById('mu_es').value;
        var mu_di = document.getElementById('mu_di').value;

        if (anguloa.length == 0 || mu_es.length == 0 || mu_di == 0) {
            return;
        }

        let datos = [
            anguloa = second_form.elements['anguloa'].value,
            mu_es = second_form.elements['mu_es'].value,
            mu_di = second_form.elements['mu_di'].value
        ];
        window.sessionStorage.setItem('datos2', JSON.stringify(datos));

        translate(2);
    }); 

    third_form.addEventListener('submit', function(evento) {
        evento.preventDefault();
        var fuerza = document.getElementById('fuerza').value;

        if (fuerza.length == 0) {
            return;
        }

        let datos = [
            fuerza = third_form.elements['fuerza'].value,
            friccion = checkbox2.checked 
        ];
        window.sessionStorage.setItem('datos3', JSON.stringify(datos));

        translate(3);
    }); 

    four_form.addEventListener('submit', function(evento) {
        evento.preventDefault();
        var mu_es2 = document.getElementById('mu_es2').value;
        var mu_di2 = document.getElementById('mu_di2').value;

        if (mu_es2.length == 0 || mu_di2 == 0) {
            return;
        }

        let datos = [
            mu_es2 = four_form.elements['mu_es2'].value,
            mu_di2 = four_form.elements['mu_di2'].value
        ];
        window.sessionStorage.setItem('datos4', JSON.stringify(datos));

        translate(4);
    }); 

    start.addEventListener('click', function(evento) {
        evento.preventDefault();

        sessionStorage.clear();
        location.reload();
    }); 
});

// Traslado de forms para generar el efecto 'carrusel'
let ancho = screen.width;
document.getElementById("forms").style.width = ancho;
document.getElementById("forms").style.display = "flex";
document.getElementById("forms").style.overflow = "hidden";


function translateSet(formStart, formFinish) {
    setTimeout(() => {
        document.getElementById(formStart).style.display = 'none';
        document.getElementById(formFinish).style.display = 'flex';
        document.getElementById(formFinish).style.transform = 'translateX(30em)';            
    }, 1000);

    setTimeout(() => {
        document.getElementById(formFinish).style.transform = 'translateX(0em)';
    }, 1100);

    document.getElementById(formStart).style.transform = 'translateX(-200em)';
};


function translate(type) {
    if (type == 1) {
        if (checkbox.checked == true) {
            translateSet('form1', 'form2');
        } else {
            translateSet('form1', 'form3');
        };

    } else if (type == 2) {
        translateSet('form2', 'finish');
        cargarDatos();

    } else if (type == 3) {
        if (checkbox2.checked == true) {
            translateSet('form3', 'form4');
        } else {
            translateSet('form3', 'finish');
            cargarDatos();
        };

    } else if (type == 4) {
        translateSet('form4', 'finish');
        cargarDatos();
    };
};

// Acá comienza el programa de cargar datos
function cargarDatos() {
    // SessionStorage
    const getdata1 = JSON.parse(sessionStorage.getItem('datos1'));
    const getdata2 = JSON.parse(sessionStorage.getItem('datos2'));
    const getdata3 = JSON.parse(sessionStorage.getItem('datos3'));
    const getdata4 = JSON.parse(sessionStorage.getItem('datos4'));

    // Variables pedidas por el usuario
    const pendiente = getdata1[1];
    const masa = +(getdata1[0]);

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
        // Hace unos cálculos básicos
        pesox = a; 
        pesoy = b; 
        console.log(pesoy);
        ffe = uest * pesoy;
        ffd = udin * pesoy;
        mostrar_resultados();
        return pesox, pesoy, ffe, ffd;
    };

    function decimal(x) {
        // Coloca hasta 2 números después de la coma
        var dec = x.toFixed(2);
        return dec;
    };

    function mostrar_resultados() {
        // Muestra los resultados del cálculo en la tabla
        tablaResultados('Fuerza Normal', `${decimal(normal)} N`);
        tablaResultados('Peso en el eje x', `${decimal(pesox)} N`);
        tablaResultados('Peso en el eje y', `${decimal(pesoy)} N`);
        tablaResultados('Fuerza de fricción estática', `${decimal(ffe)}`);
        tablaResultados('Fuerza de fricción dinámica', `${decimal(ffd)}`);
    
        if (ffe > pesox) {
            tablaResultados('Conclusión', `El objeto no se mueve. Para que se mueva el μe tiene que ser ${decimal(pesox / pesoy)}`);
        } else {
            tablaResultados('Conclusión', `El objeto se mueve a ${decimal((pesox - ffd) / masa)} m/s`);
        };
    };

    // Programa
    if (pendiente == true) {
        var normal = peso;
        var anguloa = parseFloat(getdata2[0]);
        var anguloc = parseFloat(180 - anguloa - 90);
        var pesox_com = (normal / Math.sin((90 * Math.PI) / 180)) * Math.sin((anguloc * Math.PI) / 180); 
        var pesoy_com = (normal / Math.sin((90 * Math.PI) / 180)) * Math.sin((anguloa * Math.PI) / 180); 
        var ue = parseFloat(getdata2[1]);
        var ud = parseFloat(getdata2[2]);
        var ffe = peso * ue;
        var ffd = peso * ud;
        complex_float(pesox_com, pesoy_com, ue, ud);

    } else {
        var fuerza = parseFloat(getdata3[0]);
        var friccion = getdata3[1];
        var semueve = true;

        if (friccion == true) {
            var ue = parseFloat(getdata4[0]);
            var ud = parseFloat(getdata4[1]);
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
            tablaResultados('Conclusión', `El objeto se mueve a ${decimal(a_ms2)} ms/2`);
        } else {
            tablaResultados('Conclusión', `El objeto no se mueve. Se necesitan mas de ${f_mover} N para mover el objeto`);
        };
    };

    translateSet('waiting', 'resultados');
};

function tablaResultados (e1, e2) {
    // Crea las filas necesarias en la tabla con los resultados indicados en los parámetros
    let container = document.querySelector('tbody');
    let containerItem = document.createElement('tr');
    containerItem.innerHTML = `
    <td>${e1}</td>
    <td>${e2}</td>`;
    container.appendChild(containerItem);
};