$(document).ready(function () {

  //helper

  const caculateDisplayTotal = (items) => {
    let sum = 0;
    for (let itemId in items) {
      let item = items[itemId];
      sum += Number(item.price) * item.qty;
    }
    let total = (sum / 100).toFixed(2)
    $(".total-price").text(`$${total}`);
  }



  //------------------------------//

  const items = {};
  $(".add-item-btn").on("click", (event) => {
    console.log("hello world!");
    console.log(event.target);
    const id = event.target.getAttribute("data-item-id")
    const price = event.target.getAttribute("data-item-price")
    console.log(id);
    if (!items[id]) {
      items[id] = {
        price: price,
        id: id,
        qty: 1
      }
    } else {
      console.log(items)
      items[id].qty++
    }
    // items;
    console.log(items);
    caculateDisplayTotal(items)

  })




});
