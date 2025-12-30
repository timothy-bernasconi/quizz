document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".themes button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const theme = button.dataset.theme; 
      console.log("Thème choisi :", theme);

      // Redirection vers index.html avec le thème choisi
      window.location.href = `index.html?theme=${theme}`;
    });
  });
});
