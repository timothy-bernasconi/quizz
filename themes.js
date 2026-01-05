document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".themes button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const theme = button.dataset.theme; 
      console.log("Thème choisi :", theme);

     
      window.location.href = `index.html?theme=${theme}`;
    });
  });
});

const buttons = document.querySelectorAll(".themes button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const theme = button.dataset.theme;

    window.location.href = `quiz.html?theme=${theme}`;
  });
});

