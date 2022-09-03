
const loadNews = () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLoadNews(data.data.news_category))
    .catch(error => console.log(error));
}
const displayLoadNews = catagorys => {
    const catagoryContainer = document.getElementById('catagorys-container');

    catagorys.forEach(catagory => {
        const creatDiv = document.createElement('div');
        creatDiv.classList.add('col')
        creatDiv.innerHTML = `
        <p onclick="loadnewsDetails('${catagory.category_id}')">${catagory.category_name} </p>
        `;
        catagoryContainer.appendChild(creatDiv);
    })   
}
const loadnewsDetails = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayLoadDetais(data.data))
    .catch(error = console.log(error))  
}

const displayLoadDetais = items => {
    const cardContainer = document.getElementById('card-container');

    // start spinner 
    toggoleSpinner(true);

    // items = items.slice(0, 3);
    const noDataLoad = document.getElementById('no-data-load');
    if(items.length === 0){
        noDataLoad.classList.remove('d-none');
    }
    else{
        noDataLoad.classList.add('d-none')
    }

    cardContainer.textContent = '';
    items.forEach(item =>{
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('row');
        cardDiv.classList.add('coustom-card');
        cardDiv.innerHTML = `
        <div class="col-md-3">
        <img src="${item.thumbnail_url}" class=" img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-9">
        <div class="card-body mt-4">
          <h5 class="card-title fs-4 mb-3 fw-semibold">${item.title}</h5>
          <p class="card-text">${item.details.slice(0, 400)} ...</p>
          <div class="d-flex justify-content-around pt-3">
                <div class="d-flex align-items-center g-2">
                    <img class="img-fluid person-img rounded-circle" src="${item.author.img}">
                    <div class="ms-2 text-center text-nowrap">
                        <h6 class="fs-5">${item.author.name ? item.author.name : 'No Information'}</h6>
                        <p>${item.author.published_date ? item.author.published_date : 'No Information' }</p>
                    </div>
                </div>
                <div class="d-flex align-items-center me-5">
                    <i class="fa-solid fa-eye"></i>
                    <p class="ms-2 mt-3">${item.total_view ? item.total_view : '0'  }M</p>
                </div>
                <div class="d-flex align-items-center ms-5 me-5">
                <i class="fa-solid fa-star-half-stroke"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                </div>
                <div class="mt-3 ms-5 text-nowrap me-5">
                  <button onclick="loadCardItem('${item._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <i class="fa-sharp fa-solid fa-arrow-right"></i></button>
                </div>
          </div>
        </div>
      </div>
        `;
    cardContainer.appendChild(cardDiv);
    });
    // stop spenner 
    toggoleSpinner(false); 
}

const toggoleSpinner = isLoding => {
    const loderSection = document.getElementById('loding-spinner');
    if(isLoding === true){
        loderSection.classList.remove('d-none')
    }
    else{
        loderSection.classList.add('d-none')
    }
}


const loadCardItem = async(news_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;

    try{
        const res = await fetch(url);
        const data = await res.json();
        displayCardItem(data.data[0]);
    }
    catch{
        error = console.log(error);
    }
}
const displayCardItem = cards => {
    // console.log(cards)
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = cards.title;
    const modalBody = document.getElementById('cards-body');
    modalBody.innerHTML = `
    <p> ${cards.details.slice(0, 200)} <p>
    <h6>${cards.author.name ? cards.author.name : 'No Information'}</h6>
    <p>${cards.author.published_date ? cards.author.published_date : 'No Information' }</p>
      `;
}


loadNews();