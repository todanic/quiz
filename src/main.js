import "./style.css";

let submitted = false;

async function loadQuiz() {
  const response = await fetch("/data.json");
  const questions = await response.json();
  const app = document.querySelector("#app");
  app.innerHTML = "";

  questions.forEach((q, index) => {
    const qDiv = document.createElement("div");
    qDiv.className = "question";

    const single = q.options.filter((o) => o.isCorrect).length === 1;
    qDiv.dataset.single = single;

    const qTitle = document.createElement("p");
    qTitle.textContent = `${index + 1}. ${q.text}`;
    qDiv.appendChild(qTitle);

    const btns = [];

    q.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.textContent = opt.text;
      btn.className = "option";
      btn.dataset.correct = opt.isCorrect;
      btn.addEventListener("click", () => {
        if (submitted) return;

        if (single) {
          btns.forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
        } else {
          btn.classList.toggle("selected");
        }
      });
      qDiv.appendChild(btn);
      btns.push(btn);
    });

    app.appendChild(qDiv);
  });

  const submitBtn = document.createElement("button");
  submitBtn.id = "submit";
  submitBtn.textContent = "Submit Quiz";
  submitBtn.addEventListener("click", () => {
    if (submitted) return;
    submitted = true;

    const qDivs = document.querySelectorAll(".question");
    let correctCount = 0;

    qDivs.forEach((div) => {
      const buttons = div.querySelectorAll("button.option");
      let questionCorrect = true;

      buttons.forEach((b) => {
        const isCorrect = b.dataset.correct === "true";
        const isSelected = b.classList.contains("selected");

        if (isCorrect) {
          b.classList.add("correct");
        }
        if (isSelected && !isCorrect) {
          b.classList.add("wrong");
        }

        if ((isCorrect && !isSelected) || (!isCorrect && isSelected)) {
          questionCorrect = false;
        }

        b.disabled = true;
      });

      if (questionCorrect) correctCount++;
    });

    const score = Math.round((correctCount / qDivs.length) * 100);
    const scoreEl = document.getElementById("score");
    scoreEl.textContent = `Score: ${score}%`;
    submitBtn.disabled = true;
  });

  const scoreEl = document.createElement("p");
  scoreEl.id = "score";

  app.appendChild(submitBtn);
  app.appendChild(scoreEl);
}

loadQuiz();
