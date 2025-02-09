document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os containers de pergunta
  const questionContainers = document.querySelectorAll(".question-container");

  questionContainers.forEach((container) => {
    const options = container.querySelectorAll(".options li");
    const viewAnswerBtn = container.querySelector(".view-answer");
    const feedbackDiv = container.querySelector(".feedback");
    let selectedOption = null;

    // Trata a questão das opções do usuario e clique
    options.forEach((option) => {
      option.addEventListener("click", () => {
        if (container.classList.contains("revealed")) return;
        options.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");
        selectedOption = option;
      });
    });

    // Clicando em "ver resposta"
    viewAnswerBtn.addEventListener("click", () => {
      if (container.classList.contains("revealed")) return;

      container.classList.add("revealed");

      if (selectedOption) {
        if (selectedOption.classList.contains("correct")) {
          feedbackDiv.textContent = "Você acertou :)";
        } else {
          selectedOption.classList.add("incorrect");
          feedbackDiv.textContent = "Resposta incorreta :(";
        }
      } else {
        feedbackDiv.textContent = "Nenhuma opção selecionada, a resposta correta foi marcada.";
      }
    });
  });
});
