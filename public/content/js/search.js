const searchInput = document.querySelector(".search-input")

//? take search datas from url
const takeDatasFromUrl = () => {
    const params = new URLSearchParams(location.search)
    const search_query = params.get('search_query')
    const search_by = params.get('search_by')
    
    if (!search_query) location.href = "index.html"

    searchInput.value = search_query
}

window.addEventListener("load", takeDatasFromUrl)