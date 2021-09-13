// API Call Here
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const { rate, count } = product.rating;
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    const rating1 = (rate > 4) ? 'topRate' : 'noRating';
    const rating2 = (rate > 3 && rate <= 4) ? 'topMediumRate' : 'noRating';
    const rating3 = (rate > 2 && rate <= 3) ? 'lowMediumRate' : 'noRating';
    const rating4 = (rate > 1 && rate <= 2) ? 'normalRate' : 'noRating';
    // Dynamically Data Load 
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <p>Rating:${rate}</p> 
      <div class="my-3"> 
       <i class="fas fa-star rating ${rating1} ${rating2} ${rating3} ${rating4}"></i>
      <i class="fas fa-star rating ${rating1} ${rating2} ${rating3} ${rating4}"></i>
      <i class="fas fa-star rating ${rating1} ${rating2} ${rating3}"></i>
      <i class="fas fa-star rating ${rating1} ${rating2}"></i>
      <i class="fas fa-star rating ${rating1} "></i>
      </div>
      <p>Counting:${count}</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">add to cart</button>
      <button id="details-btn" class="btn btn-info">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// Total Added Products Count
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
    updateTotal();
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
    updateTotal();
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
    updateTotal();
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
