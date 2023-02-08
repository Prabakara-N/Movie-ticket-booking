"use strict";

// elements
const selectEl = document.getElementById("movie-options");
const screenContainer = document.querySelectorAll(".seat-container");
const countEl = document.getElementById("count");
const totalEl = document.getElementById("total");
const unSelectedSeatsEl = document.querySelectorAll(".seats .seat:not(.sold)");

// global variables
let ticketPrize = Number(selectEl.value);
let seatCount = 0;
let totalPrize = 0;

populateUI();
// whenever page loaded it matches to respective movie image
showImage();

// functions
// respective movie image
function showImage() {
  let movieImage = document.querySelector(".movie-img");
  let screenNumber = document.querySelector(".screen-no p");
  ticketPrize = Number(selectEl.value);

  // four screen
  let screenOne = document.getElementById("screen-one");
  let screenTwo = document.getElementById("screen-two");
  let screenThree = document.getElementById("screen-three");
  let screenFour = document.getElementById("screen-four");

  // selected seats only for respective screen
  let screenOneCount = document.querySelectorAll(
    ".screen-one-count .seats .seat.selected"
  );
  let screenTwoCount = document.querySelectorAll(
    ".screen-two-count .seats .seat.selected"
  );
  let screenThreeCount = document.querySelectorAll(
    ".screen-three-count .seats .seat.selected"
  );
  let screenFourCount = document.querySelectorAll(
    ".screen-four-count .seats .seat.selected"
  );

  // updating count & total for every screen respectively
  // screen 1
  if (ticketPrize === 120) {
    screenOne.classList.add("active");
    movieImage.src = "./images/Kaithi.avif";
    screenNumber.innerText = "Screen - 1";
    countEl.innerText = screenOneCount.length;
    totalEl.innerText = screenOneCount.length * ticketPrize;
  } else {
    screenOne.classList.remove("active");
  }

  // screen 2
  if (ticketPrize === 150) {
    screenTwo.classList.add("active");
    movieImage.src = "./images/master.jpg";
    screenNumber.innerText = "Screen - 2";
    countEl.innerText = screenTwoCount.length;
    totalEl.innerText = screenTwoCount.length * ticketPrize;
  } else {
    screenTwo.classList.remove("active");
  }

  // screen 3
  if (ticketPrize === 200) {
    screenThree.classList.add("active");
    movieImage.src = "./images/vikram.jpg";
    screenNumber.innerText = "Screen - 3";
    countEl.innerText = screenThreeCount.length;
    totalEl.innerText = screenThreeCount.length * ticketPrize;
  } else {
    screenThree.classList.remove("active");
  }

  // screen 4
  if (ticketPrize === 220) {
    screenFour.classList.add("active");
    movieImage.src = "./images/leo.jpg";
    screenNumber.innerText = "Screen - 4";
    countEl.innerText = screenFourCount.length;
    totalEl.innerText = screenFourCount.length * ticketPrize;
  } else {
    screenFour.classList.remove("active");
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
      if (selectedSeats.indexOf(index) >= 0) {
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

  setMovieData(e.target.selectedIndex, e.target.value);
  updatePrize();
});

// selecting seats
screenContainer.forEach((seats) => {
  seats.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat")) {
      if (!e.target.classList.contains("sold")) {
        e.target.classList.toggle("selected");
        // calling update count & prize function
        updatePrize();
        showImage();
      }
    }
  });
});

// whenever page loads count & prize will show
// updatePrize();
