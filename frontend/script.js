let questions = [];
let current = 0;
let score = 0;

async function loadQuestions() {
  const res = await fetch("http://127.0.0.1:8000/questions");
  questions = await res.json();
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  document.getElementById("question").innerText = q.question;
  const optionsBox = document.getElementById("options");
  optionsBox.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => {
      if (opt === q.answer) score++;
      nextQuestion();
    };
    optionsBox.appendChild(btn);
  });
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    document.getElementById("quiz-box").style.display = "none";
    const scoreBox = document.getElementById("score-box");
    scoreBox.innerText = `Your score: ${score}/${questions.length}`;
    scoreBox.style.display = "block";
  }
}

document.getElementById("next-btn").onclick = nextQuestion;

loadQuestions();
