//FUNCION PARA PODER DESPLEGAR LOS FAVORITOS
function favoritos(){
    let favoriteGrid = document.getElementById('favorite-grid')

    //SE DETECTA SI HAY GIFS GUARDADOS
    if(localStorage.getItem('myFavGifs') == null){
        favoriteGrid.innerHTML = `<div class="sin-contenido">
                                    <div>
                                        <img src="Img/icon-fav-sin-contenido.svg">
                                    </div>
                                    <div>
                                        <h1>"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"</h1>
                                    </div>
                                </div>`
    } else {
        favoriteGrid.innerHTML = `<div class="image-grid">
                                    <div id="grid">
                                    </div>
                                </div>`

        //SE CREA EL GRID CON LOS GIFS Y SUS DIFERENTES FUNCIONALIDADES
        let gifObject = JSON.parse(localStorage.getItem('myFavGifs'))
        for(var i = 0; i < gifObject.length; i++){
            let grid = document.getElementById('grid')
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
            let titulo = gifObject[i].titulo;
            let usuario = gifObject[i].usuario;
            let gif = gifObject[i].imagen;
            let downloadGif = gifObject[i].descargar;
            gridGif.src = gif;
            grid.appendChild(gifContainer);
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
            gifUser.innerHTML = usuario;
            if(usuario == ""){
                gifUser.innerHTML = "Unknown";
            }                  
            gifTitle.innerHTML = titulo;
            download.src = "Img/icon-download.svg"
            expand.src = "Img/icon-max-normal.svg"
            fav.src = "Img/icon-trash-normal.svg"
            fav.addEventListener("mouseover", () => {
                fav.src = "Img/icon-trash-hover.svg"
            })
            download.addEventListener("mouseover", () => {
                download.src = "Img/icon-download-hover.svg"
            })
            expand.addEventListener("mouseover", () => {
                expand.src = "Img/icon-max-hover.svg"
            })
            fav.addEventListener("mouseout", () => {
                fav.src = "Img/icon-trash-normal.svg"
            })
            download.addEventListener("mouseout", () => {
                download.src = "Img/icon-download.svg"
            })
            expand.addEventListener("mouseout", () => {
                expand.src = "Img/icon-max-normal.svg"
            })
            download.addEventListener("click", function() {
                downloadgif(downloadGif,titulo)
            })
            expand.addEventListener("click", function() {
                maximizeGif(gif,usuario,titulo,downloadGif)
            })
            fav.addEventListener("click", function() {
                removeFavorite(titulo,i);
            })
            if(screen.width < 600) {
                gifContainer.addEventListener("click", () => {
                    maximizeGif(gif,usuario,titulo,downloadGif);
                })
            }
        }
    }
}

//SE LLAMA A LA FUNCION
favoritos()