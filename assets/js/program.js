// Switch
var checkbox = document.getElementById('check1');
checkbox.addEventListener("change", validaCheckbox, false);
function validaCheckbox() {
    var checked = checkbox.checked;
    if(checked) {
        document.getElementById('bloque').innerHTML = 'El bloque se encuentra en una pendiente';
    } else {
        document.getElementById('bloque').innerHTML = 'El bloque no se encuentra en una pendiente';
    };
};

var checkbox2 = document.getElementById('check2');
checkbox2.addEventListener("change", validaCheckbox, false);
function validaCheckbox() {
    var checked = checkbox2.checked;
    if(checked) {
        document.getElementById('fric').innerHTML = 'Hay fricción en la simulación';
    } else {
        document.getElementById('fric').innerHTML = 'No hay fricción en la simulación';
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

// Todo esto se puede simplificar y lo sabés

function translate(type) {
    if (type == 1) {
        if (checkbox.checked == true) {
            setTimeout(() => {
                document.getElementById('form1').style.display = 'none';
                document.getElementById('form2').style.display = 'flex';
                document.getElementById('form2').style.transform = 'translateX(30em)';
            }, 1000);
    
            setTimeout(() => {
                document.getElementById('form2').style.transform = 'translateX(0em)';
            }, 1100);
        
            document.getElementById('form1').style.transform = 'translateX(-200em)';
        } else {
            setTimeout(() => {
                document.getElementById('form1').style.display = 'none';
                document.getElementById('form3').style.display = 'flex';
                document.getElementById('form3').style.transform = 'translateX(30em)';
            }, 1000);
        
            setTimeout(() => {
                document.getElementById('form3').style.transform = 'translateX(0em)';
            }, 1100);
        
            document.getElementById('form1').style.transform = 'translateX(-200em)';
        };

    } else if (type == 2) {
        setTimeout(() => {
            document.getElementById('form2').style.display = 'none';
            document.getElementById('finish').style.display = 'flex';
            document.getElementById('finish').style.transform = 'translateX(30em)';
        }, 1000);
    
        setTimeout(() => {
            document.getElementById('finish').style.transform = 'translateX(0em)';
        }, 1100);
    
        document.getElementById('form2').style.transform = 'translateX(-200em)';
        cargarDatos();


    } else if (type == 3) {
        if (checkbox2.checked == true) {
            setTimeout(() => {
                document.getElementById('form3').style.display = 'none';
                document.getElementById('form4').style.display = 'flex';
                document.getElementById('form4').style.transform = 'translateX(30em)';
            }, 1000);
        
            setTimeout(() => {
                document.getElementById('form4').style.transform = 'translateX(0em)';
            }, 1100);
        
            document.getElementById('form3').style.transform = 'translateX(-200em)';
        } else {
            setTimeout(() => {
                document.getElementById('form3').style.display = 'none';
                document.getElementById('finish').style.display = 'flex';
                document.getElementById('finish').style.transform = 'translateX(30em)';
            }, 1000);
        
            setTimeout(() => {
                document.getElementById('finish').style.transform = 'translateX(0em)';
            }, 1100);
        
            document.getElementById('form3').style.transform = 'translateX(-200em)';
            cargarDatos();
        };
    } else if (type == 4) {
        setTimeout(() => {
            document.getElementById('form4').style.display = 'none';
            document.getElementById('finish').style.display = 'flex';
            document.getElementById('finish').style.transform = 'translateX(30em)';
        }, 1000);
    
        setTimeout(() => {
            document.getElementById('finish').style.transform = 'translateX(0em)';
        }, 1100);
    
        document.getElementById('form4').style.transform = 'translateX(-200em)';
        cargarDatos();

    };
};

function cargarDatos() {
    // SessionStorage
    const getdata1 = JSON.parse(sessionStorage.getItem('datos1'));
    const getdata2 = JSON.parse(sessionStorage.getItem('datos2'));
    const getdata3 = JSON.parse(sessionStorage.getItem('datos3'));
    const getdata4 = JSON.parse(sessionStorage.getItem('datos4'));

    // Variables pedidas por el usuario
    const pendiente = getdata1[1];
    const masa = +(getdata1[0]);
    console.log('Masa: ' + masa + 'Pendiente: ' + pendiente);

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
    };


    function mostrar_resultados() {
        tablaResultados('Fuerza Normal', `${decimal(normal)} N`);
        console.log(`La Normal es de ${decimal(normal)}`);
        tablaResultados('Peso en el eje x', `${decimal(pesox)} N`);
        console.log(`El peso en el eje x es de ${decimal(pesox)}`);
        tablaResultados('Peso en el eje y', `${decimal(pesoy)} N`);
        console.log(`El peso en el eje y es de ${decimal(pesoy)}`);
        tablaResultados('Fuerza de fricción estática', `${decimal(ffe)}`);
        console.log(`La fuerza de fricción estática es de ${decimal(ffe)}`);
        tablaResultados('Fuerza de fricción dinámica', `${decimal(ffd)}`);
        console.log(`La fuerza de fricción dinámica es de ${decimal(ffd)}`);
    
        if (ffe > pesox) {
            tablaResultados('Conclusión', `El objeto no se mueve. Para que se mueva el μe tiene que ser ${decimal(pesox / pesoy)}`);
            console.log(`El objeto no se mueve, la friccion es muy alta.\nPara que el objeto se mueva el μe tiene que ser ${decimal(pesox / pesoy)}`);
        } else {
            tablaResultados('Conclusión', `El objeto se mueve a ${decimal((pesox - ffd) / masa)} m/s`);
            console.log(`El objeto se mueve a una aceleracion de ${decimal((pesox - ffd) / masa)} m/s`);
        };
    };


    // Programa
    if (pendiente == true) {
        var normal = peso;
        var anguloa = parseFloat(getdata2[0]);
        console.log('Angulo', +(getdata2[0]));

        var anguloc = parseFloat(180 - anguloa - 90);
        var pesox_com = (normal / Math.sin((90 * Math.PI) / 180)) * Math.sin((anguloc * Math.PI) / 180); 
        var pesoy_com = (normal / Math.sin((90 * Math.PI) / 180)) * Math.sin((anguloa * Math.PI) / 180); 
        console.log(pesoy_com);
        var ue = parseFloat(getdata2[1]);
        var ud = parseFloat(getdata2[2]);
        console.log('UE', +(getdata2[1]));
        console.log('ED', +(getdata2[2]));

        var ffe = peso * ue;
        var ffd = peso * ud;

        complex_float(pesox_com, pesoy_com, ue, ud);
    } else {
        var fuerza = parseFloat(getdata3[0]);
        console.log('Fuerza', +(getdata3[0]));

        var friccion = getdata3[1];
        console.log('Fricción', getdata3[1]);

        var semueve = true;

        if (friccion == true) {
            var ue = parseFloat(getdata4[0]);
            console.log('UE', +(getdata4[0]));

            var ud = parseFloat(getdata4[1]);
            console.log('UD', +(getdata4[1]));

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
                console.log('AMS2' + a_ms2);
            } else {
                semueve = false;
                var f_mover = 0.01;
            };
        };

        if (semueve == true) {
            tablaResultados('Conclusión', `El objeto se mueve a ${decimal(a_ms2)} ms/2`);
            console.log(`El objeto se mueve a ${decimal(a_ms2)}ms/2`);
        } else {
            tablaResultados('Conclusión', `El objeto no se mueve. Se necesitan mas de ${f_mover} N para mover el objeto`);
            console.log(`El objeto no se mueve, se necesitan mas de ${f_mover}N para mover el objeto`);
        };
    };

    // Translate
    setTimeout(() => {
        document.getElementById('waiting').style.display = 'none';
        document.getElementById('resultados').style.display = 'flex';
        document.getElementById('resultados').style.transform = 'translateX(30em)';
    }, 1000);

    setTimeout(() => {
        document.getElementById('resultados').style.transform = 'translateX(0em)';
    }, 1100);

    document.getElementById('waiting').style.transform = 'translateX(-200em)';
};

function tablaResultados (e1, e2) {
    let container = document.querySelector('tbody');
    let containerItem = document.createElement('tr');
    containerItem.innerHTML = `
    <td>${e1}</td>
    <td>${e2}</td>`;
    container.appendChild(containerItem);
};