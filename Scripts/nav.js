const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    //CUANDO LE DAS CLICK AL MENU HAMBURGUESA OCURRE EL CAMBIO DE CLASES PARA LA VISUALIZACION ADEMÁS DE LA ANIMACION
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if(link.style.animation){
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFades 0.5s ease forwards ${index / 7 + 1.5}s`
            }
        })

        burger.classList.toggle('toggle');
    });
}

//SE DETECTA EL WIDTH DE LA PANTALLA PARA QUE SE SELECCIONE EL LOGO DE LA VERSION MOVILE
const toggleLogo = () => {
    let deviceWidth = screen.width;
    const logo = document.getElementById("logo");
    if(deviceWidth < 768){
        logo.src = "Img/logo-mobile.svg";
    }
}

//SE FHACE STICKY LA BARRA DE NAVEGACION
const fixedNav = () => {
    const navbar = document.querySelector('nav')
    window.addEventListener('scroll', () =>{
        let scrolled = window.scrollY;
        if(scrolled > 0){
            navbar.style.position = "fixed";
            navbar.style.boxShadow = "0 2px 4px 1px rgba(156,175,195,0.55)";
        } else {
            navbar.style.position = "relative";
            navbar.style.boxShadow = "";
        }
    })
}

//CONSTRUCTOR DE NUESTRA NAV
const App = () => {
    navSlide();
    toggleLogo();
    fixedNav();
}

App();