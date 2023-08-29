// Get the necessary elements
const daytext = document.querySelector(".daytext")
const dateText = document.querySelector(".dateText")
const monthText= document.querySelector(".monthText")
const yearText = document.querySelector(".yearText")

const monthYearText = document.querySelector(".monthYear");
const weekDays = document.querySelector(".weekdays");
const daysContainer = document.querySelector("#daysContainer");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");

// Creating weekdays and month array
const months = [
  "January",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

// Initialize the current date
let currentDate = new Date();

// Render UI 
renderUI()
function renderUI(){
  dateText.innerText = currentDate.getDate()
  daytext.innerText =  weekdays[currentDate.getDay()]
  monthText.innerText = months[currentDate.getMonth()].toUpperCase()
  yearText.innerText = currentDate.getFullYear()
  console.log(currentDate.getFullYear())
}

// Create weak days
for (let i = 0; i < weekdays.length; i++) {
  const weekElement = document.createElement("div");
  weekElement.innerText += weekdays[i];
  weekDays.appendChild(weekElement);
}

// Initial calendar render
renderCalendar(currentDate);

// Render the calendar for a specific month
function renderCalendar(date) {
  const month = date.getMonth();
  const year = date.getFullYear();

  // Update the month and year display
  monthYearText.textContent = `${months[month]}   ${year}`;

  // Clear previous days
  daysContainer.innerHTML = "";

  // Calculate the starting day of the month and the total days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

  // Fill in empty days before the first day of the month
  for (let i = firstDay.getDay(); i > 0; i--) {
    const emptyDays = document.createElement("div");
    emptyDays.textContent += lastDateOfPrevMonth + 1 - i;
    emptyDays.classList.add("inactive");
    daysContainer.appendChild(emptyDays);
  }
  // Fill in days for the month
  for (let i = 1; i <= daysInMonth; i++) {
    const daysElement = document.createElement("div");
    daysElement.innerText += i;
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    ) {
      daysElement.classList.add("active");
    }
    daysContainer.appendChild(daysElement);
  }
  // Fill in empty days after the last day of the month
  for (let i = 1; i < lastDay.getDay(); i++) {
    const emptyDays = document.createElement("div");
    emptyDays.innerText += i;
    emptyDays.classList.add("inactive");
    daysContainer.appendChild(emptyDays);
  }
}

// Add eventListers to the previous and next buttons
prevButton.addEventListener("click", showPrevMonth);
nextButton.addEventListener("click", showNextMonth);

function showPrevMonth() {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  renderCalendar(currentDate);
}
function showNextMonth() {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  renderCalendar(currentDate);
}
