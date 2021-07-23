//FUNCION PARA VER TUS GIFOS CREADOS
function misGifos(){
    let misGifosGrid = document.getElementById('misGifos-grid')
    let misGifosArray = JSON.parse(localStorage.getItem('myGifs'))
    if(localStorage.getItem('myGifs') == null || misGifosArray.length == 0){
        misGifosGrid.innerHTML = `<div class="sin-contenido">
                                    <div>
                                        <img src="Img/icon-fav-sin-contenido.svg">
                                    </div>
                                    <div>
                                        <h1>"¡Animate a crear tu primer GIFO"</h1>
                                    </div>
                                </div>`
    } else {
        misGifosGrid.innerHTML = `<div class="image-grid">
                                    <div id="grid">
                                    </div>
                                </div>`

        for(var i = 0; i < misGifosArray.length; i++){
            fetch(`https://api.giphy.com/v1/gifs?ids=${misGifosArray[i]}&api_key=XkzSLgraLP5ThPfuylPMUg7XS0nlTC7f`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
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
                let titulo = "My GIF";
                let usuario = "Tu";
                let gif = data.data[0].images.fixed_height.url;
                let downloadGif = data.data[0].images.original.url;
                gridGif.src = gif;
                gridGif.id = data.data[0].id;
                id = gridGif.getAttribute('id')
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
                    removeMyGif(titulo,i);
                })
                if(screen.width < 600) {
                    gifContainer.addEventListener("click", () => {
                        maximizeGif(gif,usuario,titulo,downloadGif);
                    })
                }
            })
        }
    }
}

//SE LLAMA A LA FUNCION
misGifos()