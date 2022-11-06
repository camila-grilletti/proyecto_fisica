// Buttons

const buttons = document.querySelectorAll('.button');
buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        let ripples = document.createElement('span');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        this.appendChild(ripples);

        setTimeout(() => {
            ripples.remove();
        }, 1000);
    });
});

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

// Forms

document.getElementById('button1').addEventListener('click', function(e) {
    e.preventDefault();
    setTimeout(() => {
        document.getElementById('form1').style.display = 'none';
        document.getElementById('form2').style.display = 'flex';
        document.getElementById('form2').style.transform = 'translateX(30em)';
    }, 1000);

    setTimeout(() => {
        document.getElementById('form2').style.transform = 'translateX(0em)';
    }, 1100);

    document.getElementById('form1').style.transform = 'translateX(-200em)';
});


document.getElementById('button2').addEventListener('click', function(e) {
    e.preventDefault();
    setTimeout(() => {
        document.getElementById('form2').style.display = 'none';
        document.getElementById('finish').style.display = 'flex';
        document.getElementById('finish').style.transform = 'translateX(30em)';
    }, 1000);

    setTimeout(() => {
        document.getElementById('finish').style.transform = 'translateX(0em)';
    }, 1100);

    document.getElementById('form2').style.transform = 'translateX(-200em)';
});