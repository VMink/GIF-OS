//URL AL QUE LLAMAREMOS PARA LA FUNCION DE LOS TRENDING GIFOS
const trendingGifosUrl = `https://api.giphy.com/v1/gifs/trending?api_key=XkzSLgraLP5ThPfuylPMUg7XS0nlTC7f&limit=25&rating=g`;

//FUNCION PARA LLENAR EL CARRUSEL
function trendingGifos() {
    var carrouselSlide = document.getElementById("carrousel-slide");
    
    //SE REALIZA EL FETCH CORRESPONDIENTE
    fetch(trendingGifosUrl)
    .then(response => response.json())
    .then(data => {

        //SE CREA UN GIF CLON DEL ULTIMO GIF
        let carrouselImageClone = document.createElement("img");
        let carrouselImageCloneUrl = data.data[20].images.fixed_height.url;
        let carrouselImageDiv = document.createElement("div");
        let trendingGifo = document.createElement("div");
        carrouselImageClone.setAttribute("id", "lastClone")
        carrouselImageClone.setAttribute("src", carrouselImageCloneUrl); 
        carrouselImageClone.setAttribute("class", "carrousel-image");
        carrouselImageDiv.setAttribute("class", "trendingGif-container");
        trendingGifo.setAttribute("class", "trending-gif");
        trendingGifo.append(carrouselImageClone);
        carrouselImageDiv.append(trendingGifo);
        carrouselSlide.append(carrouselImageDiv);

        //SE LLENA EL CARRUSEL
        for(var i = 0; i < 21; i++){
            let carrouselImage = document.createElement("img");
            let carrouselImageDiv = document.createElement("div");
            let carrouselImageUrl = data.data[i].images.fixed_height.url;
            let trendingGifo = document.createElement("div");
            carrouselImage.setAttribute("class", "carrousel-image")
            carrouselImage.setAttribute("src", carrouselImageUrl);
            carrouselImageDiv.setAttribute("class", "trendingGif-container");
            trendingGifo.setAttribute("class", "trending-gif");
            trendingGifo.append(carrouselImage);
            carrouselImageDiv.append(trendingGifo);
            carrouselSlide.appendChild(carrouselImageDiv);
        }

        //SE CREA UN GIF CLON DEL PRIMER GIF
        let carrouselImageCloneLast = document.createElement("img");
        let carrouselImageCloneUrlLast = data.data[0].images.fixed_height.url;
        let carrouselImageDivLast = document.createElement("div");
        let trendingGifoLast = document.createElement("div");
        carrouselImageDivLast.append(trendingGifoLast);
        carrouselImageCloneLast.setAttribute("src", carrouselImageCloneUrlLast); 
        carrouselSlide.appendChild(carrouselImageDivLast);
        carrouselImageCloneLast.setAttribute("id", "firstClone")
        carrouselImageCloneLast.setAttribute("class", "carrousel-image")
        trendingGifoLast.append(carrouselImageCloneLast);
        carrouselImageDivLast.setAttribute("class", "trendingGif-container");
        trendingGifoLast.setAttribute("class", "trending-gif");

        //LOS GIFS CLON SE CREAN PARA PODER DAR EL EFECTO DE ESPEJO AL CARRUSEL

        //SE LLAMA A LA FUNCION QUE HACE FUNCIONAR EL CARRUSEL
        carrousel();

        //SE LLAMA A LA FUNCION QUE HACE FUNCIONAR A LOS HOVER DE LOS TRENDING GIS
        gifHover(357,275);
    })
}

//FUNCION PARA HACER FUNCIONAR EL CARRUSEL
function carrousel() {
    const carrouselSlide = document.querySelector('.carrousel-slide');
    const prevBtn = document.querySelector('#btn-left');
    const nextBtn = document.querySelector('#btn-right');
    let carrouselImages = document.getElementsByClassName('carrousel-image');
    let size = (carrouselImages[0].clientWidth) + 29;
    let contador = 1;

    carrouselSlide.style.transform = 'translateX(' + (-size * contador) + 'px)';

    //MOVIMIENTO HACIA LA DERECHA
    nextBtn.addEventListener('click', () => {
        if(contador >= carrouselImages.length -1) return;
        contador++;
        carrouselSlide.style.transform = 'translateX(' + (-size * contador) + 'px)';
        carrouselSlide.style.transition = "all .5s ease-in-out"
    })

    //MOVIMIENTO HACIA LA IZQUIERDA
    prevBtn.addEventListener('click', () => {
        if(contador <= 0) return;
        contador--;
        carrouselSlide.style.transform = 'translateX(' + (-size * contador) + 'px)';
        carrouselSlide.style.transition = "all .5s ease-in-out"
    })

    //EFECTO DE ESPEJO PARA LOS CLONES
    carrouselSlide.addEventListener('transitionend', () =>{
        if(carrouselImages[contador].id === 'lastClone'){
            carrouselSlide.style.transition = "none";
            contador = carrouselImages.length -2;
            carrouselSlide.style.transform = 'translateX(' + (-size * contador) + 'px)';
        }
        if(carrouselImages[contador].id === 'firstClone'){
            carrouselSlide.style.transition = "none";
            contador = carrouselImages.length - contador;
            carrouselSlide.style.transform = 'translateX(' + (-size * contador) + 'px)';
        }
    })
}

//FUNCION PARA DARLE FUNCIONALIDAD A LOS HOVERS DE LOS GIFS
async function gifHover(width,height){
    let gif2Hover = await document.querySelectorAll('.trendingGif-container');
    
    //DETECTAMOS EL ANCHO DE LA PANTALLA
    if(screen.width > 1200) {
        fetch(trendingGifosUrl)
        .then(response => response.json())
        .then(data => {

            //PRIMERO GENERAMOS TODOS LOS BOTONES EN TODOS LOS GIFS
            for(var i = 0; i < gif2Hover.length; i++){
                let gifHover = document.createElement("div");
                let gifBtns = document.createElement("div");
                let favBtn = document.createElement("img");
                let expandBtn = document.createElement("img");
                let downloadBtn = document.createElement("img");
                let downloadBtnContainer = document.createElement("a");
                let gifInfo = document.createElement("div");
                let gifUserContainer = document.createElement("p");
                let gifTitleContainer = document.createElement("h1");
                gifHover.style.width = width + "px";
                gifHover.style.height = height + "px";
                gif2Hover[i].appendChild(gifHover);
                gif2Hover[i].appendChild(gifBtns);
                gif2Hover[i].appendChild(gifInfo);
                gifBtns.setAttribute("class", "gif-buttons");
                gifBtns.appendChild(favBtn);
                gifBtns.appendChild(downloadBtnContainer);
                gifBtns.appendChild(expandBtn);
                gifBtns.style.width = width + "px";
                downloadBtnContainer.appendChild(downloadBtn);
                downloadBtnContainer.setAttribute("id","downloadButton");
                downloadBtn.setAttribute("class", "downloadButton")
                favBtn.setAttribute("class", "fav-button")
                downloadBtn.setAttribute("src", "Img/icon-download.svg")
                downloadBtn.setAttribute("class", "downloadButton")
                expandBtn.setAttribute("src", "Img/icon-max-normal.svg");
                expandBtn.setAttribute("class", "expand-button");
                gifInfo.setAttribute("class", "trendingGif-info");
                gifInfo.appendChild(gifUserContainer);
                gifInfo.appendChild(gifTitleContainer);
                gifUserContainer.setAttribute("class", "trendingGif-user");
                gifTitleContainer.setAttribute("class", "trendingGif-title");
        
                gif2Hover[i].addEventListener("mouseover", () => {
                    gifHover.setAttribute("class", "gif-hover");
                    gifBtns.style.display = "flex";
                })
        
                gif2Hover[i].addEventListener("mouseout", () => {
                    gifHover.setAttribute("class", "");
                    gifBtns.style.display ="none";
                })

                downloadBtn.addEventListener("mouseover", () => {
                    downloadBtn.setAttribute("src", "Img/icon-download-hover.svg");
                })
        
                downloadBtn.addEventListener("mouseout", () => {
                    downloadBtn.setAttribute("src", "Img/icon-download.svg");
                })
        
                expandBtn.addEventListener("mouseover", () => {
                    expandBtn.setAttribute("src", "Img/icon-max-hover.svg");
                })
        
                expandBtn.addEventListener("mouseout", () => {
                    expandBtn.setAttribute("src", "Img/icon-max-normal.svg");
                })
        
                gif2Hover[i].addEventListener("mouseover", () => {
                    gifInfo.style.display = "block";
                })
        
                gif2Hover[i].addEventListener("mouseout", () => {
                    gifInfo.style.display = "none";
                })
            }

            //SE AGRUPAN TODOS LOS BOTONES EN ARREGLOS PARA DARLE FUNCIONALIDAD UNO A UNO
            let gifUserArray = document.querySelectorAll(".trendingGif-user");
            let gifTitleArray = document.querySelectorAll(".trendingGif-title");
            let downloadBtnArray = document.querySelectorAll(".downloadButton");
            let maxedBtnArray = document.querySelectorAll(".expand-button");
            let favoriteBtnArray = document.querySelectorAll(".fav-button")
            let trendingGifMobile = document.querySelectorAll(".trendingGif-container")
            let downloadGifClone = data.data[20].images.original.url;
            let downloadGifCloneName = data.data[20].title;
                    
            //SE LE DA FUNCIONALIDAD AL PRIMERO CLON DEL CARUSEL
            gifUserArray[0].innerHTML = data.data[20].username;
            if(data.data[20].username == ""){
                gifUserArray[0].innerHTML = "Unknown";
            }

            if(localStorage.getItem(downloadGifCloneName)){
                favoriteBtnArray[0].src = "Img/fav-icon-active.jpg"
                favoriteBtnArray[0].style.opacity = 1;
            } else {
                favoriteBtnArray[0].src = "Img/icon-fav-hover.svg"
            }
                        
            gifTitleArray[0].innerHTML = data.data[20].title;
            
            downloadBtnArray[0].addEventListener("click", function() {
                downloadgif(downloadGifClone,downloadGifCloneName);
            })
            
            maxedBtnArray[0].addEventListener("click", function() {
                maximizeGif(data.data[20].images.fixed_height.url,data.data[20].username,downloadGifCloneName,downloadGifClone)
            })
            
            //SE LE DA FUNCIONALIDAD A TODOS LOS BOTONES DE LOS GIFS DEL CARUSEL
            for(var e = 1; e < gifUserArray.length-1; e++){
                let gifUser = data.data[e-1].username;
                let downloadGif = data.data[e-1].images.original.url;
                let downloadGifName = data.data[e-1].title;
                let maxGif = data.data[e-1].images.fixed_height.url;

                favoriteBtnArray[e].addEventListener("click", function() {
                    addTrendingFavorite(downloadGifName,maxGif,gifUser,downloadGif)
                })

                if(localStorage.getItem(downloadGifName)){
                    favoriteBtnArray[e].src = "Img/fav-icon-active.jpg"
                    favoriteBtnArray[e].style.opacity = 1;
                } else {
                    favoriteBtnArray[e].src = "Img/icon-fav-hover.svg"
                }

                gifUserArray[e].innerHTML = gifUser;
                if(gifUser == ""){
                    gifUserArray[e].innerHTML = "Unknown";
                }
            
                let gifTitle = data.data[e-1].title;
                gifTitleArray[e].innerHTML = gifTitle;
            
                downloadBtnArray[e].addEventListener("click", function() {
                    downloadgif(downloadGif,downloadGifName);
                })

                maxedBtnArray[e].addEventListener("click", function() {
                    maximizeGif(maxGif,gifUser,downloadGifName,downloadGif);
                })
            }
            
            //SE LE DA FUNCIONALIDAD AL ULTIMO CLON DEL CARUSEL
            let downloadGifCloneLast = data.data[0].images.original.url;
            let downloadGifCloneNameLast = data.data[0].title;
            
            if(localStorage.getItem(downloadGifCloneNameLast)){
                favoriteBtnArray[22].src = "Img/fav-icon-active.jpg"
                favoriteBtnArray[22].style.opacity = 1;
            } else {
                favoriteBtnArray[22].src = "Img/icon-fav-hover.svg"
            }

            gifUserArray[22].innerHTML = data.data[0].username;
            if(data.data[0].username == ""){
                gifUserArray[22].innerHTML = "Unknown";
            }
            
            gifTitleArray[22].innerHTML = data.data[0].title;
                    
            downloadBtnArray[22].addEventListener("click", function() {
                downloadgif(downloadGifCloneLast,downloadGifCloneNameLast);
            })
            
            maxedBtnArray[22].addEventListener("click", function() {
                maximizeGif(data.data[0].images.fixed_height.url,data.data[0].username,downloadGifCloneNameLast,downloadGifCloneLast)
            })
        })

    }
}

//SE LLAMA A LA FUNCION TRENDINGGIFOS
trendingGifos();