//FUNCION PARA EL AUITOCOMPLETADO DE LOS GIFS EN EL INPUT
if(localStorage.getItem('modo-nocturno')){
    let lupa = document.getElementById('lupa');
    lupa.src = "Img/icon-search-modo-noct.svg"
} else {
    let lupa = document.getElementById('lupa');
    lupa.src = "Img/icon-search.svg";
}
function autocompleteSection() {
    let inputValue = document.getElementById('input').value;
    let buscador = document.getElementById('buscador');
    let input = document.getElementById('input');
    let lupa = document.getElementById('lupa');
    let lupaSearch = document.getElementById('lupa-search');
    let autocompleteSection = document.getElementById('autocomplete-section');
    let autocompleteUrl = `https://api.giphy.com/v1/gifs/search/tags?api_key=XkzSLgraLP5ThPfuylPMUg7XS0nlTC7f&q=${inputValue}&limit=50&rating=g`
    let grid = document.getElementById('gif-grid');
    let trendingTitles = document.querySelector(".trending");

    //SE HACE EL CAMBIO A LAS CLASES DEL INPUT CUANDO SE ESTA BUSCANDO
    input.classList.add('inputV2');
    input.classList.remove('input')
    buscador.classList.add('buscadorV2');
    buscador.classList.remove('buscador')
    if(localStorage.getItem('modo-nocturno')){
        lupa.src = "Img/close-modo-noct.svg"
    } else {
        lupa.src = "Img/close.svg";
    }
    lupaSearch.style.display = "block";
    autocompleteSection.style.display = "flex";

    //SE HACE EL CAMBIO A LAS CLASES DEL INPUT CUANDO SE ELIMINA LA BUSQUEDA
    lupa.addEventListener('click', () => {
        input.classList.remove('inputV2');
        input.classList.add('input')
        buscador.classList.remove('buscadorV2');
        buscador.classList.add('buscador')
        if(localStorage.getItem('modo-nocturno')){
            lupa.src = "Img/icon-search-modo-noct.svg"
        } else {
            lupa.src = "Img/icon-search.svg";
        }
        lupaSearch.style.display = "none";
        autocompleteSection.style.display = "none";
        input.value = "";
        grid.innerHTML = "";
        trendingTitles.style.display = "block";
    })

    //FETCH HACIA EL ENDPOINT DE AUTOCOMPLETADO
    fetch(autocompleteUrl)
    .then(response => response.json())
    .then(data => {
        let option1 = document.getElementById("option1")
        let option2 = document.getElementById("option2")
        let option3 = document.getElementById("option3")
        let option4 = document.getElementById("option4")
        option1.innerHTML = '<img src="Img/icon-search.svg"></img>' + data.data[0].name;
        option2.innerHTML = '<img src="Img/icon-search.svg"></img>' + data.data[1].name;
        option3.innerHTML = '<img src="Img/icon-search.svg"></img>' + data.data[2].name;
        option4.innerHTML = '<img src="Img/icon-search.svg"></img>' + data.data[3].name;
        option1.addEventListener("click", () =>{
            input.value = data.data[0].name;
        })
        option2.addEventListener("click", () =>{
            input.value = data.data[1].name;
        })
        option3.addEventListener("click", () =>{
            input.value = data.data[2].name;
        })
        option4.addEventListener("click", () =>{
            input.value = data.data[3].name;
        })
    })
}

//FUNCION MAIN DE LA BUSQUEDA DE GIFS
function sendApiRequest(){
    let userInput = document.getElementById('input').value;
    let url = `https://api.giphy.com/v1/gifs/search?api_key=XkzSLgraLP5ThPfuylPMUg7XS0nlTC7f&q=${userInput}&limit=50&offset=0&rating=g&lang=en`;
    let grid = document.getElementById('gif-grid');
    let trendingTitles = document.querySelector(".trending");

    fetch(url)
    .then(response => response.json())
    .then(data => {

        //ESTO ES PARA QUE A LA HORA DE HACER UNA BUSQUEDA NUEVA EL GRID QUEDE VACIO
        if(grid.innerHTML != ""){
            grid.innerHTML == ""
        } 

        //ESTO ES PARA DETECTAR LA BUSQUEDA SIN RESULTADOS
        if(data.data.length == 0){
            grid.innerHTML = `<div class="noResults">
                                <hr>
                                <h1>Lorem Ipsum</h1>
                                <img src="img/icon-busqueda-sin-resultado.svg">
                                <h2>Intenta con otra búsqueda</h2>
                            </div>`;
        } else { //AQUI YA ES LA BUSQUEDA CON RESULTADOS
            //SE HACE DISPLAY DEL GRID Y SE ELEIMINAN LOS TRENDING TITLES
            trendingTitles.style.display = "none";
            grid.innerHTML = `<div class="image-grid">
                                <hr>
                                <h1 id="grid-title"></h1>
                                <div id="grid"></div>
                                <a id="btn-verMas">Ver Más</a>
                            </div>`
            let gridTitle = document.getElementById("grid-title")
            gridTitle.innerHTML = userInput;

            //SE CREAN UNO A UNO LOS GIFS CON SUS RESPECTIVOS BOTONES Y FUNCIONALIDADES
            for(var i = 0; i < 12; i++){
                let imageGrid = document.getElementById("grid");
                let gifContainer = document.createElement("div")
                let gridGif = document.createElement("img")
                let hover = document.createElement("div");
                let gifInfo = document.createElement("div");
                let gifUser = document.createElement("p");
                let gifTitle = document.createElement("h1");
                let gifBtns = document.createElement("div");
                let fav = document.createElement("img")
                let download = document.createElement("img")
                let expand = document.createElement("img");
                let downloadGif = data.data[i].images.original.url;
                let title = data.data[i].title;
                let user = data.data[i].username;
                let gif = data.data[i].images.fixed_height.url;
                gridGif.src = gif;
                imageGrid.appendChild(gifContainer);
                gifContainer.appendChild(gridGif);
                gifContainer.appendChild(hover);   
                gifContainer.appendChild(gifInfo);
                gifContainer.appendChild(gifBtns);
                gifInfo.appendChild(gifUser);
                gifInfo.appendChild(gifTitle);
                gifBtns.appendChild(fav)
                gifBtns.appendChild(download)
                gifBtns.appendChild(expand)
                gifContainer.setAttribute("class", "gif-container")
                hover.setAttribute("id", "hover")
                fav.setAttribute("class", "fav")
                gifInfo.setAttribute("class", "gif-info");
                gifBtns.setAttribute("class", "gifBtns");
                gifUser.innerHTML = user;
                if(user == ""){
                    gifUser.innerHTML = "Unknown";
                }
                gifTitle.innerHTML = title;
                download.src = "Img/icon-download.svg"
                expand.src = "Img/icon-max-normal.svg"
                fav.addEventListener("click", () =>{
                    fav.src = "Img/fav-icon-active.jpg"
                    fav.style.opacity = 1
                    addFavorite(title,gif,user,downloadGif)
                })
                download.addEventListener("mouseover", () => {
                    download.src = "Img/icon-download-hover.svg"
                })
                expand.addEventListener("mouseover", () => {
                    expand.src = "Img/icon-max-hover.svg"
                })
                download.addEventListener("mouseout", () => {
                    download.src = "Img/icon-download.svg"
                })
                expand.addEventListener("mouseout", () => {
                    expand.src = "Img/icon-max-normal.svg"
                })
                download.addEventListener("click", function() {
                    downloadgif(downloadGif,gifTitle.innerHTML);
                })
                expand.addEventListener("click", function() {
                    maximizeGif(gridGif.src,gifUser.innerHTML,gifTitle.innerHTML,downloadGif);
                })
                if(screen.width < 600) {
                    gifContainer.addEventListener("click", () => {
                        maximizeGif(gridGif.src,gifUser.innerHTML,gifTitle.innerHTML,downloadGif);
                    })
                }
                if(localStorage.getItem(title)){
                    fav.src = "Img/fav-icon-active.jpg"
                    fav.style.opacity = 1
                } else {
                    fav.src = "Img/icon-fav-hover.svg"
                }
            }
            
            //SE DETECTA EL BOTON DE VER MAS Y AL DARSE CLICK SE REPETIRA LA ACCION Y ASI SUCESIVAMENTE
            let verMas = document.getElementById("btn-verMas");
            verMas.addEventListener("click", () => {
                for(var i = 12; i < 24; i++){
                    let imageGrid = document.getElementById("grid");
                    let gifContainer = document.createElement("div")
                    let gridGif = document.createElement("img")
                    let hover = document.createElement("div");
                    let gifInfo = document.createElement("div");
                    let gifUser = document.createElement("p");
                    let gifTitle = document.createElement("h1");
                    let gifBtns = document.createElement("div");
                    let fav = document.createElement("img")
                    let download = document.createElement("img")
                    let expand = document.createElement("img");
                    let downloadGif = data.data[i].images.original.url;
                    let title = data.data[i].title;
                    let user = data.data[i].username;
                    let gif = data.data[i].images.fixed_height.url;
                    gridGif.src = gif;
                    imageGrid.appendChild(gifContainer);
                    gifContainer.appendChild(gridGif);
                    gifContainer.appendChild(hover);   
                    gifContainer.appendChild(gifInfo);
                    gifContainer.appendChild(gifBtns);
                    gifInfo.appendChild(gifUser);
                    gifInfo.appendChild(gifTitle);
                    gifBtns.appendChild(fav)
                    gifBtns.appendChild(download)
                    gifBtns.appendChild(expand)
                    gifContainer.setAttribute("class", "gif-container")
                    hover.setAttribute("id", "hover")
                    fav.setAttribute("class", "fav")
                    gifInfo.setAttribute("class", "gif-info");
                    gifBtns.setAttribute("class", "gifBtns");
                    gifUser.innerHTML = user;
                    if(user == ""){
                        gifUser.innerHTML = "Unknown";
                    }
                    gifTitle.innerHTML = title;
                    download.src = "Img/icon-download.svg"
                    expand.src = "Img/icon-max-normal.svg"
                    fav.addEventListener("click", () =>{
                        fav.src = "Img/fav-icon-active.jpg"
                        fav.style.opacity = 1
                        addFavorite(title,gif,user,downloadGif)
                    })
                    download.addEventListener("mouseover", () => {
                        download.src = "Img/icon-download-hover.svg"
                    })
                    expand.addEventListener("mouseover", () => {
                        expand.src = "Img/icon-max-hover.svg"
                    })
                    download.addEventListener("mouseout", () => {
                        download.src = "Img/icon-download.svg"
                    })
                    expand.addEventListener("mouseout", () => {
                        expand.src = "Img/icon-max-normal.svg"
                    })
                    download.addEventListener("click", function() {
                        downloadgif(downloadGif,gifTitle.innerHTML);
                    })
                    expand.addEventListener("click", function() {
                        maximizeGif(gridGif.src,gifUser.innerHTML,gifTitle.innerHTML,downloadGif);
                    })
                    if(screen.width < 600) {
                        gifContainer.addEventListener("click", () => {
                            maximizeGif(gridGif.src,gifUser.innerHTML,gifTitle.innerHTML,downloadGif);
                        })
                    }
                    if(localStorage.getItem(title)){
                        fav.src = "Img/fav-icon-active.jpg"
                        fav.style.opacity = 1
                    } else {
                        fav.src = "Img/icon-fav-hover.svg"
                    }
                }

                verMas.addEventListener("click", () => {
                    for(var i = 24; i < 36; i++){
                        let imageGrid = document.getElementById("grid");
                        let gifContainer = document.createElement("div")
                        let gridGif = document.createElement("img")
                        let hover = document.createElement("div");
                        let gifInfo = document.createElement("div");
                        let gifUser = document.createElement("p");
                        let gifTitle = document.createElement("h1");
                        let gifBtns = document.createElement("div");
                        let fav = document.createElement("img")
                        let download = document.createElement("img")
                        let expand = document.createElement("img");
                        let downloadGif = data.data[i].images.original.url;
                        let title = data.data[i].title;
                        let user = data.data[i].username;
                        let gif = data.data[i].images.fixed_height.url;
                        gridGif.src = gif;
                        imageGrid.appendChild(gifContainer);
                        gifContainer.appendChild(gridGif);
                        gifContainer.appendChild(hover);   
                        gifContainer.appendChild(gifInfo);
                        gifContainer.appendChild(gifBtns);
                        gifInfo.appendChild(gifUser);
                        gifInfo.appendChild(gifTitle);
                        gifBtns.appendChild(fav)
                        gifBtns.appendChild(download)
                        gifBtns.appendChild(expand)
                        gifContainer.setAttribute("class", "gif-container")
                        hover.setAttribute("id", "hover")
                        fav.setAttribute("class", "fav")
                        gifInfo.setAttribute("class", "gif-info");
                        gifBtns.setAttribute("class", "gifBtns");
                        gifUser.innerHTML = user;
                        if(user == ""){
                            gifUser.innerHTML = "Unknown";
                        }
                        gifTitle.innerHTML = title;
                        download.src = "Img/icon-download.svg"
                        expand.src = "Img/icon-max-normal.svg"
                        fav.addEventListener("click", () =>{
                            fav.src = "Img/fav-icon-active.jpg"
                            fav.style.opacity = 1
                            addFavorite(title,gif,user,downloadGif)
                        })
                        download.addEventListener("mouseover", () => {
                            download.src = "Img/icon-download-hover.svg"
                        })
                        expand.addEventListener("mouseover", () => {
                            expand.src = "Img/icon-max-hover.svg"
                        })
                        download.addEventListener("mouseout", () => {
                            download.src = "Img/icon-download.svg"
                        })
                        expand.addEventListener("mouseout", () => {
                            expand.src = "Img/icon-max-normal.svg"
                        })
                        download.addEventListener("click", function() {
                            downloadgif(downloadGif,gifTitle.innerHTML);
                        })
                        expand.addEventListener("click", function() {
                            maximizeGif(gridGif.src,gifUser.innerHTML,gifTitle.innerHTML,downloadGif);
                        })
                        if(screen.width < 600) {
                            gifContainer.addEventListener("click", () => {
                                maximizeGif(gridGif.src,gifUser.innerHTML,gifTitle.innerHTML,downloadGif);
                            })
                        }
                        if(localStorage.getItem(title)){
                            fav.src = "Img/fav-icon-active.jpg"
                            fav.style.opacity = 1
                        } else {
                            fav.src = "Img/icon-fav-hover.svg"
                        }
                    }

                    verMas.addEventListener("click", () => {
                        for(var i = 36; i < 48; i++){
                            let imageGrid = document.getElementById("grid");
                            let gifContainer = document.createElement("div")
                            let gridGif = document.createElement("img")
                            let hover = document.createElement("div");
                            let gifInfo = document.createElement("div");
                            let gifUser = document.createElement("p");
                            let gifTitle = document.createElement("h1");
                            let gifBtns = document.createElement("div");
                            let fav = document.createElement("img")
                            let download = document.createElement("img")
                            let expand = document.createElement("img");
                            let downloadGif = data.data[i].images.original.url;
                            let title = data.data[i].title;
                            let user = data.data[i].username;
                            let gif = data.data[i].images.fixed_height.url;
                            gridGif.src = gif;
                            imageGrid.appendChild(gifContainer);
                            gifContainer.appendChild(gridGif);
                            gifContainer.appendChild(hover);   
                            gifContainer.appendChild(gifInfo);
                            gifContainer.appendChild(gifBtns);
                            gifInfo.appendChild(gifUser);
                            gifInfo.appendChild(gifTitle);
                            gifBtns.appendChild(fav)
                            gifBtns.appendChild(download)
                            gifBtns.appendChild(expand)
                            gifContainer.setAttribute("class", "gif-container")
                            hover.setAttribute("id", "hover")
                            fav.setAttribute("class", "fav")
                            gifInfo.setAttribute("class", "gif-info");
                            gifBtns.setAttribute("class", "gifBtns");
                            gifUser.innerHTML = user;
                            if(user == ""){
                                gifUser.innerHTML = "Unknown";
                            }
                            gifTitle.innerHTML = title;
                            download.src = "Img/icon-download.svg"
                            expand.src = "Img/icon-max-normal.svg"
                            fav.addEventListener("click", () =>{
                                fav.src = "Img/fav-icon-active.jpg"
                                fav.style.opacity = 1
                                addFavorite(title,gif,user,downloadGif)
                            })
                            download.addEventListener("mouseover", () => {
                                download.src = "Img/icon-download-hover.svg"
                            })
                            expand.addEventListener("mouseover", () => {
                                expand.src = "Img/icon-max-hover.svg"
                            })
                            download.addEventListener("mouseout", () => {
                                download.src = "Img/icon-download.svg"
                            })
                            expand.addEventListener("mouseout", () => {
                                expand.src = "Img/icon-max-normal.svg"
                            })
                            download.addEventListener("click", function() {
                                downloadgif(downloadGif,gifTitle.innerHTML);
                            })
                            expand.addEventListener("click", function() {
                                maximizeGif(gridGif.src,gifUser.innerHTML,gifTitle.innerHTML,downloadGif);
                            })
                            if(screen.width < 600) {
                                gifContainer.addEventListener("click", () => {
                                    maximizeGif(gridGif.src,gifUser.innerHTML,gifTitle.innerHTML,downloadGif);
                                })
                            }
                            if(localStorage.getItem(title)){
                                fav.src = "Img/fav-icon-active.jpg"
                                fav.style.opacity = 1
                            } else {
                                fav.src = "Img/icon-fav-hover.svg"
                            }
                        }

                        //DESAPARECE EL BOTON AL YA NO HABER MÁS RESULTADOS
                        verMas.style.display="none";
                    //ESTO SE HACE PARA QUE LOS EVENTOS SOLO OCURRAN UNA VEZ AL PRESIONAR EL BOTON
                    }, { once:true })
                }, { once:true })
            }, { once:true })
        }
    })
}