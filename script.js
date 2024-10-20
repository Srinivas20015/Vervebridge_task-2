const quizData = [
    {
        question: "What is the default value of a local variable in Java?",
        options: { a: "Null", b: "0", c: "Garbage value", d: "No default value" },
        correct: "d"
    },
    {
        question: "Which of these is a correct method signature for the main method?",
        options: { a: "public static void main()", b: "public static void main(String[] args)", c: "public void main(String args)", d: "public void static main(String[] args)" },
        correct: "b"
    },
{
        question: "Which of the following is not a primitive data type in Java?",
        options: { a: "int", b: "boolean", c: "float", d: "String" },
        correct: "d"
    },
{
        question: "What is the size of an int data type in Java?",
        options: { a: "16 bits", b: "32 bits", c: "64 bits", d: "Platfoorm-dependent" },
        correct: "b"
    },
{
        question: "Which of the following is true about constructors in Java?",
        options: { a: "Constructors can return a value.", b: "Constructors are invoked using new keyword.", c: "Constructors must have the same name as the class.", d: "Both b and c" },
        correct: "d"
    },
{
        question: "Which of these access modifiers can be used for an interface?",
        options: { a: "private", b: "protected", c: "public", d: "static" },
        correct: "c"
    },

];

let currentQuiz = 0;
let score = 0;
let userAnswers = [];

const quizContainer = document.getElementById('quiz');
const resultSection = document.getElementById('result-section');
const resultText = document.getElementById('result');
const submitBtn = document.getElementById('submit');
const restartBtn = document.getElementById('restart');

function loadQuiz() {
    const currentData = quizData[currentQuiz];
    quizContainer.innerHTML = `
        <div class="question">${currentData.question}</div>
        <ul class="answers">
            <li><input type="radio" name="answer" value="a" id="a"> ${currentData.options.a}</li>
            <li><input type="radio" name="answer" value="b" id="b"> ${currentData.options.b}</li>
            <li><input type="radio" name="answer" value="c" id="c"> ${currentData.options.c}</li>
            <li><input type="radio" name="answer" value="d" id="d"> ${currentData.options.d}</li>
        </ul>
    `;
}

function getSelected() {
    const answerEls = document.querySelectorAll('input[name="answer"]');
    let selected = null;
    answerEls.forEach(el => {
        if (el.checked) {
            selected = el.value;
        }
    });
    return selected;
}

submitBtn.addEventListener('click', () => {
    const selected = getSelected();
    if (selected) {
        userAnswers.push(selected);
        if (selected === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            showResults();
        }
    } else {
        alert('Please select an answer!');
    }
});

function showResults() {
    quizContainer.classList.add('hidden');
    resultSection.classList.remove('hidden');
    resultText.innerText = `You scored ${score} out of ${quizData.length}`;
}

restartBtn.addEventListener('click', () => {
    currentQuiz = 0;
    score = 0;
    userAnswers = [];
    quizContainer.classList.remove('hidden');
    resultSection.classList.add('hidden');
    loadQuiz();
});
loadQuiz();

