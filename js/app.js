const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e){
    e.preventDefault();

    // validar formulario
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        mostrarError('Ambos campos son obligatorios');
        return;
    }
    // consultar API
    consultarApi(ciudad, pais);
}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');
    if(!alerta){
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'mx-auto', 'text-center', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mt-6');
        alerta.innerHTML = `
            <strong class='font-bold'>Error!</strong>
            <span class='block'>${mensaje}</span>
        `
        container.appendChild(alerta);
        
        setTimeout(() => {
            alerta.remove();
        }, 3000)
    }      
}

function consultarApi(ciudad, pais){
    const appId = 'e77f83d15fa6796f829948b58e3f5848'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHtml();
            if(datos.cod === '404'){
                mostrarError('Ciudad no encontrada')
                return;
            }
            // imprime la respuesta
            mostrarClima(datos);
        })
}

function mostrarClima(datos){
    const {name, main:{temp, temp_max, temp_min}} = datos;
    const centigrados = gradosAkelvin(temp);
    const max = gradosAkelvin(temp_max);
    const min = gradosAkelvin(temp_min);

    const actual = document.createElement('p');
    const tempMax = document.createElement('p');
    const tempMin = document.createElement('p');
    const climaCiudad = document.createElement('p');
    climaCiudad.textContent = `Clima en ${name}`;
    climaCiudad.classList.add('font-bold', 'text-2xl');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    tempMax.innerHTML = `Max: ${max} &#8451;`;
    tempMax.classList.add('text-xl');

    tempMin.innerHTML = `Min: ${min} &#8451;`;
    tempMin.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(climaCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);
    resultado.appendChild(resultadoDiv);
}

function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

const gradosAkelvin = grados => parseInt(grados - 273.15)

function spinner(){
    limpiarHtml();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `
    resultado.appendChild(divSpinner);
}