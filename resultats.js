
const data = JSON.parse(localStorage.getItem("quizResults"));

if (!data || !data.questions || !data.userAnswers) {
  alert("Aucun résultat trouvé, retourne au quiz !");
  window.location.href = "themes.html";
}

const { questions, userAnswers } = data;
const resultsEl = document.getElementById("results");

let score = 0;


questions.forEach((q, index) => {
  const userAnswer = userAnswers[index];
  const isCorrect = userAnswer === q.correct;
  if (isCorrect) score++;

  const div = document.createElement("div");
  div.classList.add("result");
  div.style.marginBottom = "1.5rem";

  div.innerHTML = `
    <p><strong>Question ${index + 1} :</strong> ${q.question}</p>
    <p>Ta réponse : <span style="color:${isCorrect ? "green" : "red"}">
      ${q.answers[userAnswer]}
    </span></p>
    ${!isCorrect ? `<p>Bonne réponse : <strong>${q.answers[q.correct]}</strong></p>` : ""}
    <hr>
  `;

  resultsEl.appendChild(div);
});

const title = document.getElementById("result-title");
title.textContent = `Score final : ${score} / ${questions.length}`;
