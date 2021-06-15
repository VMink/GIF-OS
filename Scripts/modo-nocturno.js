let modoNocturno = document.getElementById('modo-nocturno')

if(localStorage.getItem('modo-nocturno')){
    modoNocturno.innerHTML = "MODO DIURNO"

    let css = document.createElement('link')
    css.setAttribute('rel',"stylesheet")
    css.setAttribute('href',"Styles/nocturno.css")
    document.head.appendChild(css)

    let logo = document.getElementById('logo');
    logo.src = "Img/Logo-modo-noc.svg"

    if(screen.width < 768){
        logo.src = "Img/logo-mobile-modo-noc.svg";
    }

    modoNocturno.addEventListener('click', () =>{
        localStorage.removeItem('modo-nocturno')
        window.location.reload()
    })
} else {
    modoNocturno.addEventListener('click', () =>{
        modoNocturno.innerHTML = "MODO NOCTURNO"
        localStorage.setItem('modo-nocturno','true')
        window.location.reload();
    })
}
