$(document).ready(function() {
  const items = {};
  $(".add-item-btn").on("click", (event) => {
    console.log("hello world!");
    console.log(event.target);
    const id = event.target.getAttribute("data-item-id")
    console.log(id);
    if(!items[id]) {
      items[id] = {
        id: id,
        qty: 1
      }
    } else {
      console.log(items)
      items[id].qty++
    }
    // items;
    console.log(items);
  })


$("#checkout-btn").on("click", (event) => {
  console.log("second!");
  event.preventDefault();
  $.ajax({
    method: "POST",
    url: "/orders",
    data: { items: items }
  }).then(() => {
    console.log("order posted");

     });

  })

});
