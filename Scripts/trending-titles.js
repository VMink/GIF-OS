//FUNCTION PARA SELECCIONAR LAS CATEGORIAS MÁS TRENDING DEL MOMENTO
function trending() {
    let trendingUrl = `https://api.giphy.com/v1/gifs/categories?api_key=XkzSLgraLP5ThPfuylPMUg7XS0nlTC7f`;

    fetch(trendingUrl)
    .then(response => response.json())
    .then(data => {
        let trendingTitles = document.getElementById('trending-titles');
        trendingTitles.innerHTML = data.data[0].name + ", " + data.data[1].name + ", " + data.data[2].name + ", " + data.data[3].name + ", " + data.data[4].name;
    })
}

trending();