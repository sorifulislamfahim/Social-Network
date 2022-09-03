
const loadNews = () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLoadNews(data.data.news_category))
}
const displayLoadNews = catagorys => {
    // console.log(catagorys);
    const catagoryContainer = document.getElementById('catagorys-container');

    catagorys.forEach(catagory => {
        // console.log(catagory)
        const creatDiv = document.createElement('div');
        creatDiv.innerHTML = `
        <p onclick="loadnewsDetails('${catagory.category_id}')">${catagory.category_name} </p>
        `;
        catagoryContainer.appendChild(creatDiv);
    })  
    
}
const  loadnewsDetails = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    // console.log(category_id)
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayLoadDetais(data.data))
}

const displayLoadDetais = items => {
    // console.log(items);
    const cardContainer = document.getElementById('card-container');

    items = items.slice(0, 3);
    const noDataLoad = document.getElementById('no-data-load');
    if(items.length === 0){
        noDataLoad.classList.remove('d-none');
    }
    else{
        noDataLoad.classList.add('d-none')
    }

    cardContainer.textContent = '';
    items.forEach(item =>{
        // console.log(item._id)
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('row');
        cardDiv.classList.add('coustom-card');
        cardDiv.innerHTML = `
        <div class="col-md-4">
        <img src="${item.thumbnail_url}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body mt-4">
          <h5 class="card-title fs-4 mb-3 fw-semibold">${item.title}</h5>
          <p class="card-text">${item.details.slice(0, 400)} ...</p>
          <div class="d-flex justify-content-between">
                <div class="d-flex">
                    <img src="${item.author.image_url}">
                    <div class="ms-3 text-center">
                        <h6 class="fs-5">${item.author.name ? item.author.name : 'No Information'}</h6>
                        <p>${item.author.published_date ? item.author.published_date : 'No Information' }</p>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <i class="fa-solid fa-eye"></i>
                    <p class="ms-2 mt-3">${item.total_view ? item.total_view : '0'  }M</p>
                </div>
                <div class="d-flex align-items-center">
                <i class="fa-solid fa-star-half-stroke"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                </div>
                <div class="mt-3">
                  <button onclick="loadCardItem('${item._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  ->></button>
                </div>
          </div>
        </div>
      </div>
        `;
    cardContainer.appendChild(cardDiv);
    })
}

const loadCardItem = async(news_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;

    const res = await fetch(url);
    const data = await res.json();
    displayCardItem(data.data[0]);
}
const displayCardItem = cards => {
    console.log(cards)
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = cards.title;
    const modalBody = document.getElementById('cards-body');
    modalBody.innerHTML = `
    <p> ${cards.details.slice(0, 200)} <p>
    <h6>${cards.author.name ? cards.author.name : 'No Information'}</h6>
    <p>${cards.author.published_date ? cards.author.published_date : 'No Information' }</p>
      `
}
loadNews();