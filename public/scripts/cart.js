$(document).ready(function() {
  const itemsArray = [];
  $(".add-item-btn").on("click", (event) => {
    console.log("hello world!");
    console.log(event.target);
    const id = event.target.getAttribute("data-item-id")
    console.log(id);
    array.push(id);
    console.log(itemsArray);
  })


$("#checkout-btn").on("click", (event) => {
  console.log("second!");

  $.ajax({
    method: "POST",
    url: "/orders",
    data: { items: itemsArray }
  }).then(() => {
    console.log("order posted");

  });




})



});
