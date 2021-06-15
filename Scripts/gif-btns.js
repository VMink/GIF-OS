//FUNCION PARA EXPANDIR UN GIF
function maximizeGif(gif,user,title,url){
    let maxedGifSection = document.querySelector(".maxed-gif");
    maxedGifSection.innerHTML = `<div class="maxed-gif-container">
                            <div class="close-btn">
                                <img src="Img/close.svg" id="close-max-gif">
                            </div>
                            <div>
                                <img class="maxed-gif-image">
                            </div>
                            <div class="maxed-gif-info-container">
                                <div class="maxed-gif-info">
                                    <p id="maxedUser"></p>
                                    <h1 id="maxedTitle"></h1>
                                </div>
                                <div class="maxed-gif-btns">
                                    <img id="favBtn" src="Img/icon-fav-hover.svg">
                                    <img id="downloadButton" src="Img/icon-download-hover.svg">
                                </div>
                            </div>
                        </div>`;
    let close = document.querySelector("#close-max-gif");
    let maxedGif = document.querySelector(".maxed-gif-image");
    let maxedUser = document.getElementById('maxedUser');
    let maxedTitle = document.getElementById('maxedTitle');
    let maxedDownload = document.getElementById('downloadButton')
    let maxedFav = document.getElementById('favBtn')
    maxedGif.setAttribute("src", gif);
    maxedUser.innerHTML = user;
    if(user == ""){
        maxedUser.innerHTML = "Unknown";
    }
    maxedTitle.innerHTML = title;
    close.addEventListener("click", () => {
        maxedGifSection.innerHTML = "";
    })
    maxedDownload.addEventListener("click", function() {
        downloadgif(url,title);
        maxedGifSection.innerHTML = "";
    })
    if(localStorage.getItem(title)){
        maxedFav.src = "Img/icon-trash-hover.svg"
    } else {
        maxedFav.src = "Img/icon-fav-hover.svg"
        maxedFav.addEventListener("click", function() {
            addTrendingFavorite(title,gif,user,url);
        })
    }
}

//FUNCITON PARA DESCARGAR UN GIF
async function downloadgif(gifFile,gifName){
    let response = await fetch(gifFile)
    let url = await response.blob()
    let a = document.getElementById("downloadButton")
    a.href = window.URL.createObjectURL(url)
    a.download = gifName
    a.click()
}

//FUNCION PARA AGREGAR UN GIF TRENDING A FAVORITOS
if(localStorage.getItem('myFavGifs') == null){
    var myFavGifsArray = [];
}else{
    myFavGifsArray =  JSON.parse(localStorage.getItem('myFavGifs'));
}
if(myFavGifsArray.length == 0){
    localStorage.removeItem('myFavGifs')
}
function addTrendingFavorite(nombre,valor,user,download){
    var gifObject = {
            usuario: user,
            titulo: nombre,
            imagen: valor,
            descargar: download
        }

    myFavGifsArray.push(gifObject);
    localStorage.setItem('myFavGifs', JSON.stringify(myFavGifsArray));
    
    localStorage.setItem(nombre,JSON.stringify(gifObject));
    window.location.reload();
}   

//FUNCION PARA AGREGAR UN GIF NORMAL A FAVORITOS
function addFavorite(nombre,valor,user,download){
    var gifObject = {
            usuario: user,
            titulo: nombre,
            imagen: valor,
            descargar: download
        }

    myFavGifsArray.push(gifObject);
    localStorage.setItem('myFavGifs', JSON.stringify(myFavGifsArray));
    
    localStorage.setItem(nombre,JSON.stringify(gifObject));
}   

//FUMCION PARA BORRAR UN FAVORITO
function removeFavorite(title){
    localStorage.removeItem(title)
    var remove = JSON.parse(localStorage.getItem('myFavGifs'))
    function esRemovido(nombre){
        return nombre.titulo === title
    }
    var encontrar = remove.find(esRemovido);
    var index = remove.indexOf(encontrar)
    remove.splice(index, 1);
    localStorage.setItem('myFavGifs', JSON.stringify(remove))
    window.location.reload();
}

//FUNCION PARA BORRAR UN GIF CREADO
function removeMyGif(id){
    var removeCreatedGif = JSON.parse(localStorage.getItem('myGifs'))
    var indexID = removeCreatedGif.indexOf(id)
    removeCreatedGif.splice(indexID, 1)
    localStorage.setItem('myGifs', JSON.stringify(removeCreatedGif))
    window.location.reload();
}
