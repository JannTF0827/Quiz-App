// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress');

// Quiz questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
        answers: ["London", "Paris", "Berlin", "Rome"],
        correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: ["Java", "Python", "Banana", "JavaScript"],
    correctAnswer: "Banana"
    
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  }, 
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listeners

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
// reset vars
  currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    

    showQuestion();
}

function showQuestion() {
  // reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";
    //50%
    questionText.textContent = currentQuestion.question;
    // todo: explain this in a second
    answersContainer.innerHTML = '';
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.textContent = answer.text
        button.classList.add('answer-btn');
      
        // what is dataset?
        button.dataset.correct = answer.correct;

        button.addEventListener('click', selectAnswer);
        answersContainer.appendChild(button);
    });
}    

function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
      return array;
    }

function selectAnswer(event) {
  if (answersDisabled) return;
    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    Array.from(answersContainer.children).forEach(button => {
      if(button.dataset.correct ==="true"){
        button.classList.add('correct');  
      } else if (button === selectedButton) {
        button.classList.add('incorrect');
      }
    });

    if(isCorrect) {
      score++;
      scoreSpan.textContent = score;
    }

    setTimeout(() => {currentQuestionIndex++;
    if(currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);

}

function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active'); 

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
      resultMessage.textContent = "Perfect Score! 🎉";
    } else if (percentage >= 80) {
      resultMessage.textContent = "Great Job! 👍";
    } else if (percentage >= 60) {
      resultMessage.textContent = "Good Effort! 😎";
    } else if (percentage >= 40) {
      resultMessage.textContent = "Not Bad! 🙂";
    } else {
      resultMessage.textContent = "Better luck next time! 😢";
    }
}

function restartQuiz() {
  resultScreen.classList.remove('active');
  
  startQuiz();
}