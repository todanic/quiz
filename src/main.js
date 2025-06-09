import './style.css'

async function loadQuiz() {
  const response = await fetch('/data.json');
  const questions = await response.json();
  const app = document.querySelector('#app');
  app.innerHTML = '';
  questions.forEach((q, index) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'question';

    const single = q.options.filter(o => o.isCorrect).length === 1;
    qDiv.dataset.single = single;

    const qTitle = document.createElement('p');
    qTitle.textContent = `${index + 1}. ${q.text}`;
    qDiv.appendChild(qTitle);

    const btns = [];
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt.text;
      btn.className = 'option';
      btn.addEventListener('click', () => {
        if (single && qDiv.classList.contains('answered')) return;
        if (btn.classList.contains('answered')) return;
        btn.classList.add('answered');
        if (opt.isCorrect) {
          btn.classList.add('correct');
        } else {
          btn.classList.add('wrong');
        }
        if (single) {
          qDiv.classList.add('answered');
          btns.forEach(b => (b.disabled = true));
          btn.disabled = false;
        }
      });
      qDiv.appendChild(btn);
      btns.push(btn);
    });

    app.appendChild(qDiv);
  });
}

loadQuiz();
