const productContainer = document.querySelector(".product-selection__content");
let url =
  "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";
let productList = [];

async function api(apiURL) {
  try {
    const response = await fetch(apiURL);
    const { nextPage, products } = await response.json();

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

  getProducts(productList);

  url = `http://${nextPage}`;
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

// format currency
function formatCurrency(num) {
  const numberFormatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(num);

  return numberFormatted;
}

function validateField(field) {
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }

    return foundError;
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: "Por favor, preencha este campo",
      },
      email: {
        valueMissing: "E-mail é obrigatório",
        typeMissmatch: "Por favor, preencha um e-mail válido",
      },
      number: {
        valueMissing: "Por favor, preencha este campo",
      },
    };

    return messages[field.type][typeError];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error");

    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove("active");
      spanError.innerHTML = "";
    }
  }

  return function () {
    const error = verifyErrors();

    if (error) {
      const message = customMessage(error);

      field.style.borderColor = "red";
      setCustomMessage(message);
    } else {
      const colorGray = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--dark-gray");

      field.style.borderColor = colorGray;
      setCustomMessage();
    }
  };
}

// custom input validation
function customValidation(event) {
  const field = event.target;
  const validation = validateField(field);

  validation();
}

function handleInvalidInput() {
  const fields = document.querySelectorAll("[required]");

  for (let field of fields) {
    field.addEventListener("invalid", (event) => {
      event.preventDefault();

      customValidation(event);
    });
    field.addEventListener("blur", customValidation);
  }
}

// form submit
function handleShareForm(event) {
  event.preventDefault();
}

function handleAgorithmForm(event) {
  event.preventDefault();
}

async function start() {
  const buttonLoadMore = document.getElementById("loadMore");

  const algorithmForm = document.getElementById("algorithmForm");
  const shareForm = document.getElementById("shareForm");

  // load product card list
  const { products } = await api(url);

  productList.push(...products);

  getProducts(productList);

  buttonLoadMore.addEventListener("click", async () => {
    loadMore(url);
  });

  // input validation & submit
  handleInvalidInput();
  algorithmForm.addEventListener("submit", (event) => handleShareForm(event));
  shareForm.addEventListener("submit", (event) => handleShareForm(event));
}

start();
