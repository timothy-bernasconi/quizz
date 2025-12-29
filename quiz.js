// Variables globales
let current = 0;
let score = 0;
let selectedAnswer = null;

// Récupération des éléments du DOM
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const validateBtn = document.getElementById("validateBtn");
const scoreEl = document.getElementById("score");
const counterEl = document.getElementById("counter");

// Fonction pour afficher la question
function loadQuestion() {
    counterEl.textContent = `${current + 1} / ${questions.length}`;

  const q = questions[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const option = document.createElement("div");
    option.textContent = answer;
    option.className = "option-card"; // classe CSS

    option.onclick = () => {
      selectedAnswer = index;

      // retirer "selected" de toutes les options
      Array.from(optionsEl.children).forEach(b => b.classList.remove("selected"));

      // ajouter "selected" à l'option cliquée
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

// Charger la première question
loadQuestion();
