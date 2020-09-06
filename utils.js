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

export { appendChildren, formatCurrency };
