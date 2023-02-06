"use strict";

// elements
const selectEl = document.getElementById("movie-options");
// const seatsEl=document.querySelectorAll('.')
const screenContainer = document.querySelector(".seat-container");
const countEl = document.getElementById("count");
const totalEl = document.getElementById("total");

// global variables
let ticketPrize = Number(selectEl.value);
let seatCount = 0;
let totalPrize = 0;

// functions
// respective movie image
function showImage() {
  let movieImage = document.querySelector(".movie-img");
  ticketPrize = Number(selectEl.value);
  if (ticketPrize === 120) {
    movieImage.src = "./images/Kaithi.avif";
  } else if (ticketPrize === 150) {
    movieImage.src = "./images/master.jpg";
  } else if (ticketPrize === 200) {
    movieImage.src = "./images/vikram.jpg";
  } else if (ticketPrize === 220) {
    movieImage.src = "./images/leo.jpg";
  }
}

function populateUI() {
  countEl.innerText = seatCount;
  totalEl.innerText = seatCount * ticketPrize;
}

// event listneres
// selecting movie
selectEl.addEventListener("change", () => {
  // calling show image function
  showImage();
  ticketPrize = Number(selectEl.value);
  populateUI();
});

// selecting seats
screenContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat")) {
    if (!e.target.classList.contains("sold")) {
      e.target.classList.toggle("selected");
      const selectedSeatsEl = document.querySelectorAll(
        ".seats .seat.selected"
      );
      seatCount = selectedSeatsEl.length;
      populateUI();
    }
  }
});
