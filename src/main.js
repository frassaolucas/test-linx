import { api } from "./api.js";
import { productContainer, buildProductCard } from "./productCard.js";
import { handleInvalidInput } from "./inputValidation.js";

async function start() {
  const url =
    "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";
  let productList = [];

  const buttonLoadMore = document.getElementById("loadMore");

  const algorithmForm = document.getElementById("algorithmForm");
  const shareForm = document.getElementById("shareForm");

  // load product card list
  const { nextPage, products } = await api(url);

  let nextPageURL = `http://${nextPage}`;

  function showProducts(products) {
    products.map((product) => {
      buildProductCard(product);
    });
  }

  async function loadMore(apiURL) {
    const { nextPage, products } = await api(apiURL);

    productContainer.innerHTML = "";
    productList.push(...products);

    showProducts(productList);

    nextPageURL = `http://${nextPage}`;
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
    loadMore(nextPageURL);
  });

  // input validation & submit
  handleInvalidInput();
  algorithmForm.addEventListener("submit", (event) =>
    handleAgorithmForm(event)
  );
  shareForm.addEventListener("submit", (event) => handleShareForm(event));
}

start();
