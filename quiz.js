const params = new URLSearchParams(window.location.search);
const theme = params.get("theme");

if (!theme || !quizzes[theme]) {
  alert("Thème invalide");
  window.location.href = "themes.html";
}

const selectedQuiz = quizzes[theme];
let currentQuestionIndex = 0;
let selectedAnswerIndex = null;
let userAnswers = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const counterEl = document.getElementById("counter");
const validateBtn = document.getElementById("validateBtn");

function showQuestion() {
  selectedAnswerIndex = null;
  optionsEl.innerHTML = "";

  const q = selectedQuiz[currentQuestionIndex];

  counterEl.textContent = `Question ${currentQuestionIndex + 1} / ${selectedQuiz.length}`;
  questionEl.textContent = q.question;

  q.answers.forEach((answer, index) => {
    const div = document.createElement("div");
    div.classList.add("option-card");
    div.textContent = answer;

    div.addEventListener("click", () => {
      document.querySelectorAll(".option-card")
        .forEach(el => el.classList.remove("selected"));

      div.classList.add("selected");
      selectedAnswerIndex = index;
    });

    optionsEl.appendChild(div);
  });
}

validateBtn.addEventListener("click", () => {
  if (selectedAnswerIndex === null) {
    alert("Choisis une réponse !");
    return;
  }

  userAnswers.push(selectedAnswerIndex);
  currentQuestionIndex++;

  if (currentQuestionIndex < selectedQuiz.length) {
    showQuestion();
  } else {
    localStorage.setItem("quizResults", JSON.stringify({
      theme,
      questions: selectedQuiz,
      userAnswers
    }));

    window.location.href = "resultats.html";
  }
});


showQuestion();
