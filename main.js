const productContainer = document.querySelector(".product-selection__content");
let url =
  "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";
let productList = [];

async function api(apiURL) {
  try {
    const response = await fetch(apiURL);
    const { nextPage, products } = await response.json();

    console.log(apiURL);

    return { nextPage, products };
  } catch (err) {
    console.log(err);
  }
}

function getProducts(products) {
  products.map((product) => {
    buildProductCard(product);
  });
}

function buildProductCard(productInfo) {
  const productCard = document.createElement("article"),
    productImage = document.createElement("img"),
    textInfo = document.createElement("div"),
    productName = document.createElement("p"),
    productDescription = document.createElement("p"),
    productFullPrice = document.createElement("p"),
    productDiscountPrice = document.createElement("p"),
    productInstallment = document.createElement("p"),
    loadMoreProducts = document.createElement("div");

  const productInformationList = [
    productName,
    productDescription,
    productFullPrice,
    productDiscountPrice,
    productInstallment,
    loadMoreProducts,
  ];

  productCard.classList.add("product-card");

  productImage.src = productInfo.image;

  productName.classList.add("product-card__name");
  productDescription.classList.add("product-card__description");
  productFullPrice.classList.add("product-card__full-price");
  productDiscountPrice.classList.add("product-card__discount-price");
  productInstallment.classList.add("product-card__installment");

  productName.textContent = productInfo.name;
  productDescription.textContent = productInfo.description;
  productFullPrice.textContent = `de ${formatCurrency(productInfo.oldPrice)}`;
  productDiscountPrice.textContent = `Por: ${formatCurrency(
    productInfo.price
  )}`;
  productInstallment.textContent = `ou ${
    productInfo.installments.count
  }x de ${formatCurrency(productInfo.installments.value)}`;

  loadMoreProducts.textContent = "Comprar";
  loadMoreProducts.classList.add("btn");

  appendChildren(textInfo, productInformationList);

  appendChildren(productCard, [productImage, textInfo]);

  productContainer.appendChild(productCard);
}

function appendChildren(parent, children) {
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}

function formatCurrency(num) {
  const numberFormatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(num);

  return numberFormatted;
}

async function start() {
  const { products } = await api(url);

  productList.push(...products);

  getProducts(productList);
}

start();
