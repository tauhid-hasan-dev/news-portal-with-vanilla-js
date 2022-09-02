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
            <p class="d-inline-block text-center" onclick = "loadNewsByCategory('${category_id}')">${category_name} </p>
        `
        categoryHolder.appendChild(categoryName)
    });
}


const loadNewsByCategory = async (id) => {
    console.log(id);
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`
        //console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        showNewsByCategory(data.data);
    }
    catch (error) {
        console.log(error);
    }
}
const newsContainer = document.getElementById('news-container');

const showNewsByCategory = async (data) => {
    const newsdataByCategory = data;
    newsContainer.innerHTML = '';
    console.log(data);
    //error handling if category has no data
    if (newsdataByCategory.length === 0) {
        newsContainer.innerHTML = `
        <div class="alert alert-danger fs-1 bg-red" role="alert">
            No new available in this category!
        </div>
        `
        return
    }

    newsdataByCategory.forEach(news => {
        const { total_view, title, thumbnail_url, author, details } = news;
        const { name, img } = author;
        console.log(newsContainer);
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
                                                <p class="card-title fw-semibold mx-2 ">${name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class=" col d-flex align-items-end justify-content-center ">
                                        <h6 class="text-secondary"><i class="fa-regular fa-eye mx-2 "></i>${total_view}</h6>
                                    </div>

                                    <div class=" col  d-flex justify-content-end align-items-center  ">
                                        <div>
                                            <a href="#" class="btn btn-info btn-sm mt-3 text-white">
                                                <i class="bi bi-chevron-right text-white"></i>
                                                more
                                            </a>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
        `
        console.log(newsCard);
        newsContainer.appendChild(newsCard)
    })

}




//loadNewsByCategory();
setCategoryMenu();
loadCategory();