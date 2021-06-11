// BS js files, not needed for now
/* import "bootstrap";

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown'; */

import "./scss/index.scss";

import "./img/GOKU.png";
import "./img/NARU.png";
import "./img/LUF.png";

const $ = require("jquery");

let cart = {
  checkoutItems: 0,
  checkoutPrice: 0,
  discountOneTotal: 0,
  discountTwoTotal: 0,
  checkoutTotalCost: 0,
};

let products = [
  {
    code: "GOKU",
    name: "Goku POP",
    price: 5,
  },
  {
    code: "NARU",
    name: "Naruto POP",
    price: 20,
  },
  {
    code: "LUF",
    name: "Luffy POP",
    price: 7.5,
  },
];

// Initialize product items
products.forEach((el) => {
  $(`#${el.code} .cart-item-img`).attr("src", `assets/img/${el.code}.png`);
  $(`#${el.code} .cart-item-name`).text(el.name);
  $(`#${el.code} .cart-item-code span:nth-child(2)`).text(el.code);
  $(`#${el.code} .cart-item-price span`).text(el.price);
  $(`#${el.code} .cart-item-total span`).text(0);
});

$(".cart-item-quantity button").on("click", function () {
  const $button = $(this);

  let oldQuantityVal = $button.parent().find("input").val();
  let newQuantityVal = 0;

  let price = $button
    .parent()
    .parent()
    .find(".cart-item-price")
    .find("span")
    .text();

  if ($button.text() == "+") {
    newQuantityVal = parseFloat(oldQuantityVal) + 1;
    cart.checkoutItems++;
  } else {
    if (oldQuantityVal > 0) {
      newQuantityVal = parseFloat(oldQuantityVal) - 1;
      cart.checkoutItems--;
    }
  }

  // Calculate item total price
  let itemTotalPrice = newQuantityVal * price;

  // Update input value (item quantity)
  $button.parent().find("input").val(newQuantityVal);

  // Update item total price
  $button
    .parent()
    .parent()
    .find(".cart-item-total")
    .find("span")
    .text(itemTotalPrice);

  updateSummaryQuantity();
  updateSummaryPrice();
  updateSummaryCost();

  if ($("#GOKU .cart-item-quantity-input").val() >= 2) {
    calculateDiscountOne();
  } else {
    cart.discountOneTotal = 0;
    $("#discount-1 .total span").text(cart.discountOneTotal);
  }

  if ($("#NARU .cart-item-quantity-input").val() >= 3) {
    calculateDiscountTwo();
  } else {
    cart.discountTwoTotal = 0;
    $("#discount-2 .total span").text(cart.discountTwoTotal);
  }
});

// Update summary number of items
function updateSummaryQuantity() {
  $("#summary-price-quantity span").text(cart.checkoutItems);
}

// Update summary total price of items
function updateSummaryPrice() {
  cart.checkoutPrice =
    parseFloat($("#GOKU .cart-item-total span").text()) +
    parseFloat($("#NARU .cart-item-total span").text()) +
    parseFloat($("#LUF .cart-item-total span").text());

  $("#summary-price span").text(cart.checkoutPrice);
}

// Update summary total cost of items (with discounts)
function updateSummaryCost(discount) {
  if (discount) {
    cart.checkoutTotalCost = cart.checkoutTotalCost - discount;
  } else {
    cart.checkoutTotalCost = cart.checkoutPrice;
  }
  $("#summary-price-total-cost span").text(cart.checkoutTotalCost);
}

// Discount 1 (GOKU)
function calculateDiscountOne() {
  let itemQuantity = $("#GOKU .cart-item-quantity-input").val();
  let itemPrice = parseInt($("#GOKU .cart-item-price").text());

  cart.discountOneTotal = Math.floor(itemQuantity / 2) * itemPrice;
  $("#discount-1 .total span").text("-" + cart.discountOneTotal);

  // Apply discount to total cost
  updateSummaryCost(cart.discountOneTotal);
}

// Discount 2 (NARU)
function calculateDiscountTwo() {
  let itemQuantity = $("#NARU .cart-item-quantity-input").val();

  cart.discountTwoTotal = Math.floor(itemQuantity / 3) * 3;
  $("#discount-2 .total span").text("-" + cart.discountTwoTotal);

  // Apply discount to total cost
  updateSummaryCost(cart.discountTwoTotal);
}
