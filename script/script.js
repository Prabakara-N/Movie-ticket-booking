"use strict";

// elements
const selectEl = document.getElementById("movie-options");
const screenContainer = document.querySelector(".seat-container");
const countEl = document.getElementById("count");
const totalEl = document.getElementById("total");
const unSelectedSeatsEl = document.querySelectorAll(".seats .seat:not(.sold)");

populateUI();
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

// save selected movie index and price
function setMovieData(movieIndex, moviePrize) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrize", moviePrize);
}

// updating count & ticket price respectively
function updatePrize() {
  const selectedSeatsEl = document.querySelectorAll(".seats .seat.selected");
  seatCount = selectedSeatsEl.length;
  // displaying count & prize when change
  countEl.innerText = seatCount;
  totalEl.innerText = seatCount * ticketPrize;

  // adding local storage
  const seatIndex = [...selectedSeatsEl].map((seat) => {
    return [...unSelectedSeatsEl].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));
}

// getting data from local storage & display to the UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    unSelectedSeatsEl.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    selectEl.selectedIndex = selectedMovieIndex;
  }
}

// event listneres
// selecting movie
selectEl.addEventListener("change", (e) => {
  // calling show image function
  showImage();
  ticketPrize = Number(selectEl.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updatePrize();
});

// selecting seats
screenContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat")) {
    if (!e.target.classList.contains("sold")) {
      e.target.classList.toggle("selected");
      // calling update count & prize function
      updatePrize();
    }
  }
});

// whenever page loads count & prize will show
updatePrize();
