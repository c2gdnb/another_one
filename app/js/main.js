"use strict";

if ("NodeList" in window && !NodeList.prototype.forEach) {
  console.info("polyfill for IE11");
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

const dropdownButton = document.querySelector(".profile-dropdown-button");
const dropdownArea = document.querySelector(".profile-dropdown");
dropdownButton.addEventListener("click", function (event) {
  event.preventDefault();
  dropdownArea.classList.toggle("is-active");
}); 

//Switcher

const switcherButton = document.querySelectorAll(".mode-switcher__control");
const toggler = document.querySelector(".mode-switcher__toggler");

switcherButton.forEach(function (btn) {
  btn.addEventListener("click", function (event) {
    event.preventDefault();

    if (event.target.classList.contains("js-public")) {
      toggler.classList.add("is-public");
      toggler.classList.remove("is-private");
    }

    if (event.target.classList.contains("js-private")) {
      toggler.classList.add("is-private");
      toggler.classList.remove("is-public");
    }
  });
});

toggler.addEventListener("click", function (event) {
  if (event.target.classList.contains("is-private")) {
    event.target.classList.add("is-public");
    event.target.classList.remove("is-private");
  } else {
    event.target.classList.remove("is-public");
    event.target.classList.add("is-private");
  }
});