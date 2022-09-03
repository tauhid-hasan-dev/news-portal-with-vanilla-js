//category data loading
const loadCategory = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url);
        const data = await res.json();
        const category = data.data.news_category;
        return category;
    }
    catch (error) {
        console.log(error);
    }

}
//dynamically category added here
const categoryHolder = document.getElementById('category-holder');
const setCategoryMenu = async () => {
    const category = await loadCategory()
    category.forEach(categoryObj => {
        const { category_id, category_name } = categoryObj;
        const categoryName = document.createElement('div');
        categoryName.classList.add('col', 'hover-color', 'text-center', 'fw-semibold');
        categoryName.innerHTML = `
            <p class="d-inline-block text-center" onclick = "loadNewsByCategory('${category_id}', '${category_name}')">${category_name} </p>
        `
        categoryHolder.appendChild(categoryName)
    });
}

//function for loading new data by id and receving catergory name for dynamic error handling
const loadNewsByCategory = async (id, category_name) => {
    //console.log(id);
    //console.log(category_name);
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`
        //console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        const dataById = data.data
        showNewsByCategory(dataById, category_name);
    }
    catch (error) {
        console.log(error);
    }
}

const newsContainer = document.getElementById('news-container');
const newsNumberContainer = document.getElementById('category-news');

//function for showing news by category
const showNewsByCategory = async (data, category_name) => {
    const newsdataByCategory = data;
    newsContainer.innerHTML = '';

    //'No item found' showing if category has no news to show
    newsNumberContainer.innerHTML = '';
    const newsNumber = document.createElement('h6');
    newsNumber.innerHTML = `
    ${newsdataByCategory.length === 0 ? 'No' : newsdataByCategory.length} items found for ${category_name}
    `
    //error handling if category has no data
    newsNumberContainer.appendChild(newsNumber)
    if (newsdataByCategory.length === 0) {
        newsContainer.innerHTML = `
        <div class="alert alert-danger fs-1 bg-red p-5" role="alert">
            No news available in this category!
        </div>
        `
        return
    }

    newsdataByCategory.forEach(news => {
        const { total_view, title, thumbnail_url, author, details, _id } = news;
        const { name, img } = author;
        //console.log(_id);
        //console.log(newsContainer);
        const newsCard = document.createElement('div');
        newsCard.classList.add('row', 'mt-5')
        newsCard.innerHTML = `
        <div class="col-12">
                    <div class="card ">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="${thumbnail_url}"
                                    class="img-fluid rounded-start w-100 h-full w-sm-100" alt="...">
                            </div>
                            <div class="col-md-9 d-flex flex-column justify-content-between  py-3 ps-4 pe-5  ">
                                <div class="row ">
                                    <div class="card-body mt-4">
                                        <h5 class="card-title fw-bold ">${title} </h5>
                                        <p class="card-text mt-4 ">${details.slice(0, 600) + '...'}
                                        </p>
                                    </div>
                                </div>
                                <div class="row d-flex mt-2">
                                    <div class=" col align-items-end ">
                                        <div class="row align-items-center justify-content-start">
                                            <div class="col d-flex align-items-center">
                                                <img src="${img}"
                                                    class="rounded-circle image" alt="...">
                                                <p class="card-title fw-semibold mx-2 ">${!name ? 'No Data Found!' : name}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" col d-flex align-items-end justify-content-center ">
    <h6 class="text-secondary"><i class="fa-regular fa-eye mx-2 "></i>${!total_view ? 'No Data Found!' : total_view}</h6>
                                    </div>
                                    <div class=" col  d-flex justify-content-end align-items-center  ">
                                        <div >
                                            <button type="button" class="btn btn-sm mt-3 text-white btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "loadDetails('${_id}')">
                                            Read more...
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
        //console.log(newsCard);
        newsContainer.appendChild(newsCard);
    })

}

const loadDetails = async (newsId) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${newsId}`
        const res = await fetch(url);
        const data = await res.json();
        const newsData = data.data[0]
        showDetails(newsData);
    }
    catch (error) {
        console.log(error);
    }
}

const showDetails = async (newsData) => {
    const { details, image_url } = newsData;
    const modalHolder = document.getElementById('modal-holder');
    modalHolder.innerHTML = `
    <div class="card ">
        <img src="${image_url}" class="card-img-top" alt="...">
        <div class="card-body ">
            <p class="card-text fw-regular ">Catagory: ${details}</p>
        </div>
    </div>
    `
}


//loadNewsByCategory();
setCategoryMenu();
loadCategory();