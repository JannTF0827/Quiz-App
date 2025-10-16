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
    choices: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "What is the largest ocean on Earth?",
    choices: ["Atlantic Ocean",
      "Indian Ocean", 
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correctAnswer: "Pacific Ocean"
  },
  {
    question: "Which of these is NOT a programming language?",
    choices: [
      "Java",
      "Python",
      "Banana",
      "JavaScript",
    ],
    correctAnswer: "Banana"
  },
  {
    question: "What is the chemical symbol for gold?",
    choices: [
      "Go",
      "Gd",
      "Au",
      "Ag",
    ],
    correctAnswer: "Au"
  },
  {
    question: "What does CPU stand for?",
    choices: [
      "Control Processing Unit",
      "Computer Personal Unit",
      "Central Processing Unit",
      "Centralized Power Unit",
    ],
    correctAnswer: "Central Processing Unit"
  },
  {
    question: "Which of the following is an input device?",
    choices: [
      "Keyboard",
      "Monitor",
      "Printer",
      "Speaker",
    ],
    correctAnswer: "Keyboard"
  },
  {
    question: "What does “www” stand for in a website address?",
    choices: [
      "Web World Wide",
      "World Wide Web",
      "Web Wide World",
      "Wide World Web",
    ],
    correctAnswer: "World Wide Web"
  },
  {
    question: "Which storage device is faster?",
    choices: [
      "Hard Disk Drive",
      "Solid State Drive",
      "USB Flash Drive",
      "CD-ROM",
    ],
    correctAnswer: "Solid State Drive"
  },
  {
    question: "Which software is used to browse the internet?",
    choices: [
      "Word",
      "Visual Studio Code",
      "Git",
      "Google Chrome",
    ],
    correctAnswer: "Google Chrome"
  },
];
// SHUFFLE ANSWERS AND FORMAT QUESTIONS //

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // swap
  }
  return array;
}
// Shuffle the order of questions //
shuffleArray(quizQuestions);

quizQuestions.forEach(q => {
  q.choices = shuffleArray(q.choices);
});

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
    currentQuestion.choices.forEach(choice => {
        const button = document.createElement('button')
        button.textContent = choice
        button.classList.add('answer-btn');
      
        // what is dataset?
        button.dataset.correct = choice === currentQuestion.correctAnswer;

        button.addEventListener('click', selectAnswer);
        answersContainer.appendChild(button);
    });
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