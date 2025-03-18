document.getElementById("productForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = {
        name: this.name.value,
        category: this.category.value,
        supplier: this.supplier.value,
        quantity: this.quantity.value,
        price: this.price.value
    };

    fetch("http://localhost:5000/addProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("responseMessage").innerText = data.message;
        this.reset();
        fetchProducts();  // Refresh the product list
    })
    .catch(error => console.error("Error:", error));
});

// Fetch products from the database
function fetchProducts() {
    fetch("http://localhost:5000/products")
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById("productList");
        productList.innerHTML = "";  // Clear the list
        data.forEach(product => {
            let li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = `${product.name} - ${product.quantity_in_stock} pcs - $${product.price}`;
            productList.appendChild(li);
        });
    })
    .catch(error => console.error("Error fetching products:", error));
}

fetchProducts();  // Load products on page load
