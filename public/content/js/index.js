const wallpaper_wrap = document.getElementById("wallpaper-wrap")

const API = {
    client_id: "QctSFB0DBMdKf-hcrj4HtE2s7HSl3313mvrRUa8Iauw",
    location: "https://api.unsplash.com/",
    current_page: 1 ,
    limit: 30,
}

//? fetch api to get responses ( images )
const callApi = () => {
    const API_Link = `${API.location}photos?client_id=${API.client_id}&per_page=${API.limit}&page=${API.current_page}`

    fetch(API_Link)
        
        .then(response => {
            if (response.status === 200) return response.json()
            else throw new Error("something went wrong")
        })
        
        .then(response => {
            const Fragment = new DocumentFragment()
            Array.from(response).forEach(obj => Fragment.append(createWallpaper_box(obj)))
            wallpaper_wrap.appendChild(Fragment)
        })
        
        .catch(err => console.error(err))
}

//? create wallpaper box 
const createWallpaper_box = (responseObject) => {
    //? create box as a text 
    const new_wallpaper_box = `
        <div>
            <img src="${responseObject.urls.regular}" loading="lazy"  alt="" class="wallpaper">
        </div>
        <div>
            <div class="wallpaper-desc d-flex justify-content-between align-items-center">
                <div class="user-profile-box d-flex align-items-center">
                    <div class="user-prof">
                        <a href="${responseObject.user.links.self}">
                            <img src="${responseObject.user.profile_image.medium}" alt="">
                        </a>
                    </div>
                    <a href="${responseObject.user.links.self}" class="text-capitalize user-prof-name">
                        ${responseObject.user.name}
                    </a>
                </div>
                <div class="wallpaper-buttons d-flex">
                    <button class="like-wallpaper-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21.788" height="21.788" viewBox="0 0 21.788 18.788"><g id="vuesax_broken_heart" data-name="vuesax/broken/heart" transform="translate(-236 -188)"><g id="heart" transform="translate(236 188)"><path id="Vector" d="M16.877,1.7a5.058,5.058,0,0,1,1.28,3.377c0,6.355-5.883,10.1-8.516,11.012a1.98,1.98,0,0,1-1.126,0C5.883,15.179,0,11.43,0,5.075A5.06,5.06,0,0,1,5.048,0,5.007,5.007,0,0,1,9.078,2.034,5.02,5.02,0,0,1,13.109,0" transform="translate(1.816 2.814)" fill="none" stroke="var(--white)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path id="Vector-2" data-name="Vector" d="M0,0H21.788V21.788H0Z" fill="none" opacity="0"/></g></g></svg>
                    </button>
                    <button class="download-wallpaper-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23.608" height="23.608" viewBox="0 0 19.608 19.608"><g id="vuesax_broken_import" data-name="vuesax/broken/import" transform="translate(-607 -446)"><g id="import" transform="translate(607 446)"><path id="Vector" d="M5.114,10.286C1.462,10.286,0,8.824,0,5.172V5.065C0,1.781,1.185.27,4.077,0" transform="translate(2.026 7.279)" fill="none" stroke="var(--primary-blue)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path id="Vector-2" data-name="Vector" d="M2.8,0C5.743.253,6.944,1.765,6.944,5.074V5.18c0,3.652-1.462,5.114-5.114,5.114H0" transform="translate(10.629 7.271)" fill="none" stroke="var(--primary-blue)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path id="Vector-3" data-name="Vector" d="M0,0V10.523" transform="translate(9.804 1.634)" fill="none" stroke="var(--primary-blue)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path id="Vector-4" data-name="Vector" d="M5.474,0,2.737,2.737,0,0" transform="translate(7.067 10.335)" fill="none" stroke="var(--primary-blue)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path id="Vector-5" data-name="Vector" d="M0,0H19.608V19.608H0Z" fill="none" opacity="0"/></g></g></svg>
                    </button>
                </div>
            </div>
        </div>
    `
    //? create section
    const section = document.createElement("div")
    section.classList.add("wallpaper-box")
    //? append box before end of section
    section.insertAdjacentHTML("beforeend", new_wallpaper_box)
    return section
}

//? check scroll of document to load new images
const checkScroll = () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        API.current_page++
        callApi()
    }
}

window.addEventListener("load", callApi)
window.addEventListener("scroll", checkScroll)