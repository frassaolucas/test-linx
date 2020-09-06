import { url, api } from "./api.js";
import { productContainer, buildProductCard } from "./productCard.js";
import { handleInvalidInput } from "./inputValidation.js";

let productList = [];

async function start() {
  const buttonLoadMore = document.getElementById("loadMore");

  const algorithmForm = document.getElementById("algorithmForm");
  const shareForm = document.getElementById("shareForm");

  // load product card list
  const { products } = await api(url);

  function showProducts(products) {
    products.map((product) => {
      buildProductCard(product);
    });
  }

  async function loadMore(apiURL) {
    if (
      apiURL ===
      "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1"
    ) {
      apiURL =
        "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=2";
    }

    const { nextPage, products } = await api(apiURL);

    productContainer.innerHTML = "";
    productList.push(...products);

    showProducts(productList);

    url = `http://${nextPage}`;
  }

  // form submit
  function handleShareForm(event) {
    event.preventDefault();
  }

  function handleAgorithmForm(event) {
    event.preventDefault();
  }

  // load products
  productList.push(...products);

  showProducts(productList);

  // load more products
  buttonLoadMore.addEventListener("click", async () => {
    loadMore(url);
  });

  // input validation & submit
  handleInvalidInput();
  algorithmForm.addEventListener("submit", (event) =>
    handleAgorithmForm(event)
  );
  shareForm.addEventListener("submit", (event) => handleShareForm(event));
}

start();
