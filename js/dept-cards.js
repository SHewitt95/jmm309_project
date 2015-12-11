$(document).ready(function() {
  var cards = document.getElementsByClassName("extra-info");
  var buttons = document.getElementsByClassName("arrow");

  var button_left = buttons[0];
  var button_right = buttons[1];

  var index = 0;

  function nextCard() {
    $(cards[index]).removeClass("show");
    $(cards[index]).addClass("hide");

    // Slides through cards of different departments.
    if ($(this).hasClass("left-arrow")) {
      index--;
      // Sets slider to end of slide.
      if (index < 0) {index = (cards.length-1)}
    } else {
      index++;
      // Sets slider to start of slide.
      if (index > (cards.length-1)) {index = 0}
    }

    $(cards[index]).removeClass("hide");
    $(cards[index]).addClass("show");
  }

  button_left.addEventListener("click", nextCard, false);
  button_right.addEventListener("click", nextCard, false);

})
