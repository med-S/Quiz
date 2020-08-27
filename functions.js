const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const qImg = document.getElementById("qImage");
const question = document.getElementById("question");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const progress = document.getElementById("progress");
const scoreContainer = document.getElementById("scoreContainer");
const startAgain = document.getElementById("start-again");





let questions = [{
        question: "What does HTML stand for?",
        imgSrc: "images/html.png",
        choiceA: "Hyper Text Markup Language",
        choiceB: "Hyperlinks and Text Mark Language",
        choiceC: "Home Tool Mark Louis",
        correct: "A"
    },
    {
        question: "Wich one is a Javascript framework?",
        imgSrc: "images/js.png",
        choiceA: "Laravel",
        choiceB: "Bootsrap",
        choiceC: "Angular",
        correct: "C"
    },
    {
        question: "What does CSS stand for?",
        imgSrc: "images/css.png",
        choiceA: "Commun Style Sheet",
        choiceB: "Cascading Style Sheet",
        choiceC: "Cascading Standard Style",
        correct: "B"
    }
];

let lastQuestionIndex = questions.length - 1;
let runningQuestionIndex = 0;
const questionTime = 10; //10s for every question
const gaugeWidth = 150;
let count = 0;
const gaugeProgressUnit = gaugeWidth / questionTime;
let Timer;
let score = 0;

start.addEventListener("click", startQuiz);
startAgain.addEventListener("click", startQuizAgain);

function startQuiz() {
    start.style.display = "none";
    counterRender();
    Timer = setInterval(counterRender, 1000);
    progressRender();
    renderQuestion();
    quiz.style.display = "block";
}

function startQuizAgain() {
    scoreContainer.style.display = "none";
    runningQuestionIndex = 0;
    qIndex = 0;
    score = 0;
    scorePercent = 0;
    scoreContainer.innerHTML = "";
    progress.innerHTML = "";
    startQuiz();
}

function renderQuestion() {
    let q = questions[runningQuestionIndex];
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

function progressRender() {
    for (let qIndex = 0; qIndex <= lastQuestionIndex; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

function answerIsCorrecte() {
    document.getElementById(runningQuestionIndex).style.backgroundColor = "green";
}

function answerIsWrong() {
    document.getElementById(runningQuestionIndex).style.backgroundColor = "red";
}



function counterRender() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = (gaugeProgressUnit * count) + "px";
        count++;
    } else {
        count = 0;
        if (runningQuestionIndex < lastQuestionIndex) {
            runningQuestionIndex++;
            renderQuestion();
        } else {
            clearInterval(Timer);
            scoreRender();
        }
    }
}

function checkAnswer(answer) {
    if (questions[runningQuestionIndex].correct == answer) {
        score++;
        answerIsCorrecte();
    } else {
        answerIsWrong();
    }
    if (runningQuestionIndex < lastQuestionIndex) {
        count = 0;
        runningQuestionIndex++;
        renderQuestion();
    } else {
        clearInterval(Timer);
        scoreRender();
    }
}

function scoreRender() {
    scoreContainer.style.display = "block";
    let scorePercent = Math.round(100 * score / questions.length);
    let img = (scorePercent >= 80) ? "images/5.png" :
        (scorePercent >= 60) ? "images/4.png" :
        (scorePercent >= 40) ? "images/3.png" :
        (scorePercent >= 20) ? "images/2.png" : "images/1.png";

    scoreContainer.insertAdjacentHTML("beforeend", "<img src=" + img + "><p>" + scorePercent + "%</p>");
}