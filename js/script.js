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
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    //console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    showNewsByCategory(data.data);
}

const showNewsByCategory = async (data) => {
    const newdata = data
    console.log(newdata);
}




//loadNewsByCategory();
setCategoryMenu();
loadCategory();