document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".themes button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const theme = button.dataset.theme; // récupère le thème
      console.log("Thème choisi :", theme);

      // Redirige vers index.html et passe le thème en paramètre dans l'URL
      window.location.href = `index.html?theme=${theme}`;
    });
  });
});
