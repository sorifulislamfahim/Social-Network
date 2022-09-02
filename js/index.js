
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
    console.log(items);
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    items.forEach(item =>{
        console.log(item)
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
                    <img src="${item.author.image_url}" class="">
                    <div class="ms-3">
                        <h6>${item.author.name ? item.author.name : 'No Information'}</h6>
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
                <div>
                  <h3 class="text-primary"><i class="fa-solid fa-arrow-right"></i></h3>
                </div>
          </div>
        </div>
      </div>
        `;
    cardContainer.appendChild(cardDiv);
    })
}

loadNews();

// <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>