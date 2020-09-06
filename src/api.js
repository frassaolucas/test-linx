async function api(apiURL) {
  try {
    const response = await fetch(apiURL);
    const { nextPage, products } = await response.json();

    return { nextPage, products };
  } catch (err) {
    console.log(err);
  }
}

export { api };
