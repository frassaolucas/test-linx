import { appendChildren } from "./utils.js";
import { formatCurrency } from "./utils.js";

const productContainer = document.querySelector(".product-selection__content");

function buildProductCard(productInfo) {
  const { productCard, textInfo } = createProductCardStructure();

  const {
    productImage,
    productName,
    productDescription,
    productFullPrice,
    productDiscountPrice,
    productInstallment,
    buyProduct,
  } = populateProductCard(productInfo);

  const productInformationList = [
    productName,
    productDescription,
    productFullPrice,
    productDiscountPrice,
    productInstallment,
    buyProduct,
  ];

  appendChildren(textInfo, productInformationList);

  appendChildren(productCard, [productImage, textInfo]);

  productContainer.appendChild(productCard);
}

function createProductCardStructure() {
  const productCard = document.createElement("article"),
    productImage = document.createElement("img"),
    textInfo = document.createElement("div"),
    productName = document.createElement("p"),
    productDescription = document.createElement("p"),
    productFullPrice = document.createElement("p"),
    productDiscountPrice = document.createElement("p"),
    productInstallment = document.createElement("p"),
    buyProduct = document.createElement("div");

  productCard.classList.add("product-card");
  productName.classList.add("product-card__name");
  productDescription.classList.add("product-card__description");
  productFullPrice.classList.add("product-card__full-price");
  productDiscountPrice.classList.add("product-card__discount-price");
  productInstallment.classList.add("product-card__installment");
  buyProduct.classList.add("btn");

  return {
    productCard,
    productImage,
    textInfo,
    productName,
    productDescription,
    productFullPrice,
    productDiscountPrice,
    productInstallment,
    buyProduct,
  };
}

function populateProductCard(productInfo) {
  const {
    productImage,
    productName,
    productDescription,
    productFullPrice,
    productDiscountPrice,
    productInstallment,
    buyProduct,
  } = createProductCardStructure();

  productImage.src = productInfo.image;
  productName.textContent = productInfo.name;
  productDescription.textContent = productInfo.description;
  productFullPrice.textContent = `de ${formatCurrency(productInfo.oldPrice)}`;
  productDiscountPrice.textContent = `Por: ${formatCurrency(
    productInfo.price
  )}`;
  productInstallment.textContent = `ou ${
    productInfo.installments.count
  }x de ${formatCurrency(productInfo.installments.value)}`;

  buyProduct.textContent = "Comprar";

  return {
    productImage,
    productName,
    productDescription,
    productFullPrice,
    productDiscountPrice,
    productInstallment,
    buyProduct,
  };
}

export { productContainer, buildProductCard };
