const params = new URLSearchParams(window.location.search);
const theme = params.get("theme");


if (!theme || !quizzes[theme]) {
  alert("Thème invalide");
  window.location.href = "themes.html";
}


document.addEventListener("DOMContentLoaded", () => {
  const themeNames = {
    geographie: "Quiz Géographie 🌍",
    histoire: "Quiz Histoire 📜",
    politique: "Quiz Politique 🏛️",
    sport: "Quiz Sport ⚽",
    litterature: "Quiz Littérature 📚",
    cinema: "Quiz Cinéma 🎬"
  };

  const quizTitle = document.getElementById("quizTitle");
  if (themeNames[theme] && quizTitle) {
    quizTitle.textContent = themeNames[theme];
    document.title = themeNames[theme];
  }
});


const selectedQuiz = quizzes[theme];
let userAnswers = new Array(selectedQuiz.length).fill(null);

const quizEl = document.getElementById("quiz");
const validateBtn = document.getElementById("validateBtn");

selectedQuiz.forEach((q, questionIndex) => {
  const questionCard = document.createElement("div");
  questionCard.classList.add("question-card");

  questionCard.innerHTML = `
    <div class="question-header">
      <span class="question-counter">
        Question ${questionIndex + 1} / ${selectedQuiz.length}
      </span>
    </div>

    <div class="question-text">
      ${q.question}
    </div>

    <div class="answers"></div>
  `;

  const answersEl = questionCard.querySelector(".answers");

  q.answers.forEach((answer, answerIndex) => {
    const answerCard = document.createElement("div");
    answerCard.classList.add("answer-card");
    answerCard.textContent = answer;

    answerCard.addEventListener("click", () => {
      answersEl.querySelectorAll(".answer-card")
        .forEach(el => el.classList.remove("selected"));

      answerCard.classList.add("selected");
      userAnswers[questionIndex] = answerIndex;
    });

    answersEl.appendChild(answerCard);
  });

  quizEl.appendChild(questionCard);
});


validateBtn.addEventListener("click", () => {
  if (userAnswers.includes(null)) {
    alert("Réponds à toutes les questions !");
    return;
  }

  localStorage.setItem("quizResults", JSON.stringify({
    theme,
    questions: selectedQuiz,
    userAnswers
  }));

  window.location.href = "resultats.html";
});
