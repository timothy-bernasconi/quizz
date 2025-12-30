function startQuiz(questions) {
  let current = 0;
  let score = 0;
  let selectedAnswer = null;

  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const validateBtn = document.getElementById("validateBtn");
  const scoreEl = document.getElementById("score");
  const counterEl = document.getElementById("counter");

  // Affiche une question
  function loadQuestion() {
    counterEl.textContent = `${current + 1} / ${questions.length}`;
    const q = questions[current];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.answers.forEach((answer, index) => {
      const option = document.createElement("div");
      option.textContent = answer;
      option.className = "option-card";

      option.onclick = () => {
        selectedAnswer = index;
        [...optionsEl.children].forEach(o => o.classList.remove("selected"));
        option.classList.add("selected");
      };

      optionsEl.appendChild(option);
    });
  }

  // Validation de la réponse
  validateBtn.onclick = () => {
    if (selectedAnswer === null) {
      alert("Sélectionne une réponse !");
      return;
    }

    if (selectedAnswer === questions[current].correct) score++;
    current++;
    selectedAnswer = null;

    if (current < questions.length) {
      loadQuestion();
    } else {
      questionEl.textContent = "Quiz terminé !";
      optionsEl.innerHTML = "";
      validateBtn.style.display = "none";
      scoreEl.textContent = `Score : ${score} / ${questions.length}`;
    }
  };

  loadQuestion();
}

// --- Charger le quiz selon le thème choisi ---
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const theme = params.get("theme");
  let selectedQuiz;

  switch(theme) {
    case "geographie":
      selectedQuiz = quizGeographie; break;
    case "histoire":
      selectedQuiz = quizHistoire; break;
    case "politique":
      selectedQuiz = quizPolitique; break;
    case "sport":
      selectedQuiz = quizSport; break;
    default:
      selectedQuiz = quizGeographie; // par défaut
  }

  startQuiz(selectedQuiz);
});
