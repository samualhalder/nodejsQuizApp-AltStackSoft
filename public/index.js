// Selecting elements from the DOM
const btn = document.querySelector(".strt"); // Button to start the quiz
const card = document.querySelector(".card"); // Container for the quiz card
const reStart = document.createElement("button"); // Button to restart the quiz

// Setting up the 'Restart' button
reStart.innerText = "Re Start";

// Event listener for the 'Start' button
btn.addEventListener("click", () => {
  // Fetching data from the server
  fetch("/data")
    .then((response) => response.json())
    .then((data) => {
      // Storing fetched data
      mcqData = data;

      // Displaying the first question
      displayQuestion();

      // Hiding the 'Start' button after starting the quiz
      btn.style.display = "none";

      // Adding the 'Restart' button to the card
      card.appendChild(reStart);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

// Initializing variables
let currentQuestionIndex = 0; // Index to track the current question
let totalScore = 0; // Variable to store the total score

// Function to display a question
const questionContainer = document.getElementById("question-container");
function displayQuestion() {
  const questionElement = document.getElementById("question"); // Element to display the question
  const optionsElement = document.getElementById("options"); // Element to display options

  // Getting the current question from the data
  const currentQuestion = mcqData[currentQuestionIndex];

  // Displaying the question
  questionElement.textContent = currentQuestion.question;

  // Clearing the options element
  optionsElement.innerHTML = "";

  // Displaying options for the current question
  currentQuestion.options.forEach((option) => {
    var li = document.createElement("li"); // Creating list item for an option
    li.textContent = option; // Setting option text
    li.addEventListener("click", () => checkAnswer(option)); // Adding event listener to check the answer when clicked
    li.addEventListener("click", () => nextQuestion()); // Adding event listener to move to the next question when clicked
    optionsElement.appendChild(li); // Appending option to the options element
  });
}

// Function to check the selected answer
function checkAnswer(selectedOption) {
  const currentQuestion = mcqData[currentQuestionIndex];
  // Checking if the selected option matches the correct answer
  if (selectedOption === currentQuestion.answer) {
    totalScore++; // Incrementing the total score if the answer is correct
  }
}

// Element to display the final score
const score = document.createElement("h2");

// Function to move to the next question
function nextQuestion() {
  currentQuestionIndex++; // Moving to the next question
  // Checking if there are more questions remaining
  if (currentQuestionIndex < mcqData.length) {
    displayQuestion(); // Displaying the next question
  } else {
    // If all questions are answered, display the final score
    score.textContent = `You score is ${totalScore}`;
    questionContainer.appendChild(score); // Appending the score to the question container
  }
}

// Function to handle restart functionality
function reStartHandler() {
  currentQuestionIndex = 0; // Resetting the current question index
  totalScore = 0; // Resetting the total score
  displayQuestion(); // Displaying the first question
  questionContainer.removeChild(score); // Removing the score display
}

// Adding event listener to the 'Restart' button
reStart.addEventListener("click", () => reStartHandler());
