document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.997 },
    { id: 2, name: "Product 2", price: 10.994 },
    { id: 3, name: "Product 3", price: 49.992 },
  ];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const CardItems = document.getElementById("cart-items");
  const emptyCardMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceMessage = document.getElementById("total-price");
  const CheckOutButton = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const prodDiv = document.createElement("div");
    prodDiv.classList.add("product"); // to fixed is used to make the number round off to 2 decimal places
    prodDiv.innerHTML = `
        <span>${product.name}:$ ${product.price.toFixed(2)}</span>   
        <button data-id="${product.id}">Add to Cart</button>
        `;

    productList.appendChild(prodDiv);
      saveTask();

  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      // console.log("clicked");
      const productID = parseInt(e.target.getAttribute("data-id")); // converts this data-id as it is in string to int
      const product = products.find((p) => p.id === productID); // method to find somehting in array like searching in the array
      cart.push(product);
      saveTask();
      // console.log(cart);
      renderCart();
    }
  });

  //  CardItems.addEventListener("click", (e) => {
  //   if(e.target.tagName==="BUTTON"){
  //     // console.log(cart);
  //       const removeID=parseInt(e.target.getAttribute("data-id"));
  //       console.log(removeID);
  //   cart =cart.filter((item)=>  item.id !==removeID)
  //   // console.log(cart);

  //   renderCart();
  //   // updateCarttotal();

  //   }
  //  });
  CardItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const removeID = parseInt(e.target.getAttribute("data-id"));
      const index = cart.findIndex((item) => item.id === removeID);
      if (index !== -1) {
        cart.splice(index, 1); // Remove only one instance of the product
        saveTask();

        renderCart();
      }
    }
  });

  function renderCart() {
    CardItems.innerText = "";
    let totalCost = 0;

    if (cart.length > 0) {
      cartTotalMessage.classList.remove("hidden");
      emptyCardMessage.classList.add("hidden");
      CardItems.classList.add("removeBtn");
      cart.forEach((item) => {
        totalCost += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
          ${item.name} : $ ${item.price.toFixed(2)}
          <button data-id="${item.id}">Remove</button>
          `;
        CardItems.appendChild(cartItem);
        saveTask();
      });
      // console.log(totalCost.toFixed(2));
      totalPriceMessage.innerText = `$ ${totalCost}`;
    } else {
      saveTask();

      emptyCardMessage.classList.remove("hidden");
      totalPriceMessage.innerText = `$ 0`;
    }
  }

  CheckOutButton.addEventListener("click", () => {
    cart.length = 0;
    saveTask();
    alert("chekout succesfull");
    renderCart();
  });

  function saveTask() {
    localStorage.setItem("cart", JSON.stringify(cart));
    //  any name you can use as key        and stringify means convert to strings her this is array
  }
  renderCart();
});
