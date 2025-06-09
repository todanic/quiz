import './style.css'

async function loadQuiz() {
  const response = await fetch('/data.json');
  const questions = await response.json();
  const app = document.querySelector('#app');
  app.innerHTML = '';
  questions.forEach((q, index) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'question';

    const qTitle = document.createElement('p');
    qTitle.textContent = `${index + 1}. ${q.text}`;
    qDiv.appendChild(qTitle);

    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt.text;
      btn.className = 'option';
      btn.addEventListener('click', () => {
        if (btn.classList.contains('answered')) return;
        btn.classList.add('answered');
        if (opt.isCorrect) {
          btn.classList.add('correct');
        } else {
          btn.classList.add('wrong');
        }
      });
      qDiv.appendChild(btn);
    });

    app.appendChild(qDiv);
  });
}

loadQuiz();
