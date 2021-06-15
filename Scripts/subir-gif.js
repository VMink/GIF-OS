//VARIABLES GLOBALES
let recorder;
let timer;
let blob;
let form = new FormData();
let horas = '00';
let minutos = '00';
let segundos = '00';

let camara = document.getElementById('camara')
let rollo = document.getElementById('rollo')
if(localStorage.getItem('modo-nocturno')){
    camara.src = "Img/camara-modo-noc.svg"
    rollo.src = "Img/pelicula-modo-noc.svg"
} else {
    camara.src = "Img/camara.svg"
    rollo.src = "Img/pelicula.svg"
}

//FUNCION CUANDO SE LE DA CLICK AL BOTON DE COMENZAR
async function comenzar(){
    
    //SE HACEN LOS CAMBIOS NECESARIOS AL DOM
    let pasos = document.getElementById('pasos');
    let num1 = document.getElementById('num1');
    let num2 = document.getElementById('num2')
    let div1 = document.getElementById('div1')
    pasos.innerHTML = "";
    num1.style.background = "#572EE5"
    num1.style.color = "white"
    div1.innerHTML = `<h1>¿Nos das acceso<br>a tu cámara?</h1>
                    <p>El acceso a tu cámara será válido sólo<br>por el tiempo en el que estés creando el GIFO</p>`;
    
    //SE PIDE ACCESO A LA CAMARA
    await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 400 },
            width: { max: 600 }
        }
    })
    .then(function(stream) {

        //MODIFICACIONES DEL DOM
        num1.style.background = "white"
        num1.style.color = "#572EE5"
        num2.style.background = "#572EE5"
        num2.style.color = "white"
        pasos.innerHTML = `<a id="grabar">GRABAR</a>`
        div1.innerHTML = `<video id="video" autoplay></video>`
        video = document.getElementById('video')
        video.srcObject = stream;
        video.play();
        let grabar = document.getElementById('grabar')

        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 10,
            quality: 10,
            width: 720,
            height: 480,
            onGifRecordingStarted: function(){
                console.log("Recording Started")
            }
        });

        grabar.addEventListener('click', function() {
            iniciarGrabacion();
        })
    })
    .catch((err) => console.log(err));
}

//FUNCION PARA INICIAR UNA GRABACION
function iniciarGrabacion(){
    let pasos = document.getElementById('pasos');
    let contenedorNumeros = document.getElementById('container-num')
    recorder.startRecording();
    pasos.innerHTML = `<a id="finalizar">FINALIZAR</a>`
    timer = setInterval(timerActive,1000);
    contenedorNumeros.style.marginRight = "-65px"
    let finalizar = document.getElementById('finalizar');
    finalizar.addEventListener("click", function() {
        terminarGrabacion()
    })
}

//FUNCION PARA TERMINAR UNA GRABACION
function terminarGrabacion(){
    recorder.stopRecording(function() {
        blob = recorder.getBlob();
        form.append('file',blob,'myGif.gif');
        console.log(form.get('file'))
        let createdUrl = URL.createObjectURL(blob)
        let div1 = document.getElementById('div1')
        div1.innerHTML = `<img src="${createdUrl}" id="gif-repeat">`
    });
    clearInterval(timer)
    horas = '00';
    minutos = '00';
    segundos = '00';
    let pasos = document.getElementById('pasos');
    pasos.innerHTML = `<a id="subir-gifo">SUBIR GIFO</a>`
    let contador = document.getElementById('contador')
    contador.innerHTML = `<a id="repetir">REPETIR CAPTURA</a>`
    let contenedorNumeros = document.getElementById('container-num')
    contenedorNumeros.style.marginRight = "-145px"
    let repetir = document.getElementById('repetir')
    repetir.addEventListener('click', function() {
        repetir.innerHTML = ""
        contenedorNumeros.style.marginRight = ""
        comenzar();
    })
    let subir = document.getElementById('subir-gifo')
    subir.addEventListener('click', function(){
        subirGif();
    })
}

//FUNCION PARA SUBIR EL GIF
async function subirGif(){
    let repetir = document.getElementById('repetir')
    let numeros = document.getElementById('container-num')
    let num2 = document.getElementById('num2')
    let num3 = document.getElementById('num3')
    let subir = document.getElementById('subir-gifo')
    let div1 = document.getElementById('div1')
    let div2 = document.createElement('div')
    let div3 = document.createElement('div')
    let cargando = document.createElement('img')
    let subiendo = document.createElement('p')
    num2.style.background = "white"
    num2.style.color = "#572EE5"
    num3.style.color = "white"
    num3.style.background = "#572EE5"
    repetir.innerHTML = "";
    numeros.style.marginRight = ""  
    subir.style.display = "none"
    div2.id = "div2"
    div1.appendChild(div2);
    div1.appendChild(div3);
    div3.appendChild(cargando)
    div3.appendChild(subiendo) 
    div3.id = "div3"
    cargando.src = "Img/loader.svg"
    subiendo.innerHTML = "Estamos subiendo tu GIFO"

    await fetch(`https://upload.giphy.com/v1/gifs?api_key=XkzSLgraLP5ThPfuylPMUg7XS0nlTC7f`, {
        method: 'POST',
        body: form,
    })
    .then((response) => response.json())
    .then((myGif) => {
        let myGifoId = myGif.data.id;
        console.log(myGifoId)
        cargando.src = "Img/check.svg"
        subiendo.innerHTML = "GIFO subido con éxito"
        let div4 = document.createElement('div')
        let download = document.createElement('img')
        let linked = document.createElement('img')
        div1.appendChild(div4)
        div4.appendChild(download)
        div4.appendChild(linked)
        div4.id = "div4"
        download.src = "Img/icon-download.svg"
        download.addEventListener('mouseover', () => download.src="Img/icon-download-hover.svg" )
        download.addEventListener('mouseout', () => download.src="Img/icon-download.svg" )
        linked.src = "Img/icon-link-hover.svg"
        download.addEventListener('click', function(){
            downloadCreatedGif(myGifoId)
        })
        if(localStorage.getItem('myGifs') == null){
            var myGifsArray =[];
        }else{
            myGifsArray =  JSON.parse(localStorage.getItem('myGifs'));
        }
        myGifsArray.push(myGifoId);
        localStorage.setItem('myGifs', JSON.stringify(myGifsArray));
    })
}

//FUNCION PARA DESCARGAR EL GIF CREADO
const downloadCreatedGif = async (myGifId) => {
	let blob = await fetch(
		`https://media.giphy.com/media/${myGifId}/giphy.gif`
	).then((img) => img.blob());
	invokeSaveAsDialog(blob, 'My-Gif.gif');
};

//FUNCION PARA EL TIMER
function timerActive(){   
    segundos++;

    if(segundos < 10){
        segundos = `0` + segundos;
    }

    if(segundos > 59){
        segundos = `00`;
        minutos++;

        if(minutos < 10){
            minutos = `0` + minutos;
        }
    }

    if(minutos > 59){
        minutos = `00`;
        horas++;

        if(horas < 10){
            horas = `0` + horas;
        }
    }
    let contador = document.getElementById('contador')
    contador.innerHTML = `${horas}:${minutos}:${segundos}`
}
