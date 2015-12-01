$(document).ready(function() {
  var cards = document.getElementsByClassName("extra-info");
  var buttons = document.getElementsByClassName("arrow");

  var button_left = buttons[0];
  var button_right = buttons[1];

  function nextCard() {
    alert("I've been clicked!");
  }

  button_left.addEventListener("click", nextCard, false);
  button_right.addEventListener("click", nextCard, false);

  $(cards[0]).removeClass("show");
  //$(cards[0]).addClass("hide");

  console.log(cards[0]);
})
