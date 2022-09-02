const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    const category = data.data.news_category;
    return category;
}

const categoryHolder = document.getElementById('category-holder');
const setCategoryMenu = async () => {
    const category = await loadCategory()
    category.forEach(categoryObj => {
        const { category_name } = categoryObj;
        const categoryName = document.createElement('div');
        categoryName.classList.add('col', 'hover-color', 'text-center', 'fw-semibold');
        categoryName.innerHTML = `
            <p class="d-inline-block text-center">${category_name} </p>
        `
        categoryHolder.appendChild(categoryName)
    });
}

setCategoryMenu()



loadCategory()