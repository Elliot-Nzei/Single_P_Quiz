let questions = [];
let current = 0;
let score = 0;
let playerName = localStorage.getItem('playerName') || "Player";

document.getElementById("playerDisplay").innerText = playerName;

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
            document.getElementById("next-btn").classList.remove("hidden");
        };
        optionsBox.appendChild(btn);
    });
}

document.getElementById("next-btn").onclick = () => {
    current++;
    document.getElementById("next-btn").classList.add("hidden");
    if (current < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
};

function endGame() {
    document.getElementById("quiz-box").classList.add("hidden");
    const scoreBox = document.getElementById("score-box");
    scoreBox.innerHTML = `<h2>🎉 ${playerName}, you scored ${score}/${questions.length}</h2>`;
    scoreBox.classList.remove("hidden");
}

loadQuestions();
