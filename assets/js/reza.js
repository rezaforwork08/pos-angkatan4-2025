let currentCategory = "all";

function filterCategory(category, event) {
  currentCategory = category;

  let buttons = document.querySelectorAll(".category-btn");
  buttons.forEach((btn) => {
    btn.classList.remove("active");
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline-primary");
  });
  event.classList.add("active");
  event.classList.remove("btn-outline-primary");
  event.classList.add("btn-primary");
  console.log({ currentCategory: currentCategory, category: category, event: event });

  renderProducts();
}

function renderProducts(searchProduct = "") {
  const productGrid = document.getElementById("productGrid");
  productGrid.innerHTML = "";

  // filter
  const filtered = products.filter((p) => {
    // shorthand / ternery
    const matchCategory = currentCategory === "all" || p.category_name === currentCategory;
    const matchSearch = p.product_name.toLowerCase().includes(searchProduct);
    return matchCategory && matchSearch;
  });

  // munculin data dari table products
  filtered.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-md-4 col-sm-6";
    col.innerHTML = `<div class="card product-card">
        <div class="product-img">
            <img src="../${product.product_photo}" alt="" width="100%">
        </div>
        <div class="card-body">
            <span class="badge bg-secondary badge-category">${product.category_name}</span>
            <h6 class="card-title mt-2 mb-2">${product.product_name}</h6>
            <p class="card-text text-primary fw-bold">Rp. ${product.product_price}</p>
        </div>
      </div>`;
    productGrid.appendChild(col);
  });
}

// useEffect(() => {
// }, [])

// DomContentLoaded : akan meload function pertama kali
renderProducts();
document.getElementById("searchProduct").addEventListener("input", function (e) {
  const searchProduct = e.target.value.toLowerCase();
  renderProducts(searchProduct);
});
