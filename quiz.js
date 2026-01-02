const params = new URLSearchParams(window.location.search);
const theme = params.get("theme");

if (!theme || !quizzes[theme]) {
  alert("Thème invalide");
  window.location.href = "themes.html";
}

const selectedQuiz = quizzes[theme];
let userAnswers = new Array(selectedQuiz.length).fill(null);

const quizEl = document.getElementById("quiz");
const validateBtn = document.getElementById("validateBtn");

// === Ici on remplace tout l'ancien showQuestion() ===
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
