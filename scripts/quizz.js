// Quiz questions
const questions = {
    math: [
      { question: "What is 5 + 7?", options: ["10", "12", "14"], correct: 1 },
      { question: "What is 8 × 3?", options: ["24", "21", "26"], correct: 0 },
      { question: "Square root of 81?", options: ["7", "8", "9"], correct: 2 }
    ],
    science: [
      { question: "What planet is known as the red planet?", options: ["Earth", "Mars", "Venus"], correct: 1 },
      { question: "Water's formula is?", options: ["H2O", "CO2", "O2"], correct: 0 },
      { question: "The gas we breathe?", options: ["Oxygen", "Nitrogen", "Helium"], correct: 0 }
    ]
  };
  
  const selectedQuiz = localStorage.getItem("selectedQuiz");
  const quizData = questions[selectedQuiz]?.slice(0, 3);
  const form = document.getElementById("quiz-form");
  const title = document.getElementById("quiz-title");
  const timeLeft = document.getElementById("time-left");
  const submitBtn = document.querySelector(".submit-btn");
  const scoreDisplay = document.getElementById("score-display");
  const timeDisplay = document.getElementById("time-display");
  const mistakesList = document.getElementById("mistakes-list");
  const resultBox = document.getElementById("result-box");
  const progressCount = document.getElementById("progress-count");
  
  let timer = 180;
  let timerInterval;
  let startTime = new Date();
  
  title.textContent = `${selectedQuiz.charAt(0).toUpperCase() + selectedQuiz.slice(1)} Quiz`;
  
  // Display questions
  quizData.forEach((q, index) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
    q.options.forEach((opt, i) => {
      const inputId = `q${index}_opt${i}`;
      wrapper.innerHTML += `
        <label>
          <input type="radio" name="q${index}" value="${i}" id="${inputId}"/>
          ${opt}
        </label><br>`;
    });
    form.insertBefore(wrapper, submitBtn);
  });
  
  // Timer countdown
  function startTimer() {
    timerInterval = setInterval(() => {
      timer--;
      const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
      const seconds = String(timer % 60).padStart(2, '0');
      timeLeft.textContent = `${minutes}:${seconds}`;
      if (timer <= 0) {
        clearInterval(timerInterval);
        submitQuiz();
      }
    }, 1000);
  }
  startTimer();
  
  // Submit logic
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    submitQuiz();
  });
  const home_btn = document.getElementById("home-btn");
  home_btn.addEventListener("click", function () {
    window.location.href = "../pages/quiz.html";
  });

  
  function submitQuiz() {
    clearInterval(timerInterval);
  
    let score = 0;
    let mistakes = [];
  
    quizData.forEach((q, i) => {
      const selected = form.querySelector(`input[name="q${i}"]:checked`);
      if (selected) {
        if (parseInt(selected.value) === q.correct) {
          score++;
        } else {
          mistakes.push({ question: q.question, wrongAnswer: q.options[selected.value], correctAnswer: q.options[q.correct] });
        }
      } else {
        mistakes.push({ question: q.question, wrongAnswer: "No answer", correctAnswer: q.options[q.correct] });
      }
    });
  
    const endTime = new Date();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
  
    const user = localStorage.getItem("loggedInUser") || "guest";
    const quizResults = JSON.parse(localStorage.getItem("quizResults") || "{}");
  
    if (!quizResults[user]) quizResults[user] = {};
    const submissionDate = new Date().toLocaleString(); // Get readable date & time
 
quizResults[user][selectedQuiz] = {
  score,
  timeTaken,
  mistakes,
  submissionDate // ← Add this
};
  
    localStorage.setItem("quizResults", JSON.stringify(quizResults));
  
    scoreDisplay.textContent = `Score: ${score} / ${quizData.length}`;
    timeDisplay.textContent = `Time Taken: ${timeTaken} seconds`;
    mistakesList.innerHTML = mistakes.length
      ? mistakes.map(m => `<li><strong>Q:</strong> ${m.question}<br><strong>Your answer:</strong> ${m.wrongAnswer}<br><strong>Correct:</strong> ${m.correctAnswer}</li>`).join('')
      : "<p>No mistakes! 🎉</p>";
  
    resultBox.classList.remove("hidden");
    submitBtn.disabled = true;
  
    const answeredCount = quizData.filter((_, i) => form.querySelector(`input[name="q${i}"]:checked`)).length;
    progressCount.textContent = `${answeredCount}/${quizData.length}`;

    // Hide the quiz form after submission
    form.classList.add("hidden");
  }
