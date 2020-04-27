'use strict';
const store = {
  questions: [
    {
      question: 'Who is the mayor of Pelican Town?',
      answers: [
        'Emily',
        'Gus',
        'Lewis',
        'Marnie'
      ],
      correctAnswer: 2,
      incorrectDesc: 'The mayor of Pelican Town is Lewis.',
      factoid: 'Lewis is one of the first to greet you when you move to Stardew Valley!'
    },
    {
      question: 'How long is each season?',
      answers: [
        '1 month',
        '2 months',
        '3 months',
        '4 months'
      ],
      correctAnswer: 0,
      incorrectDesc: 'Each season is one month long.',
      factoid: 'You can check the calender outside of Pierre\'s store to keep up with each months events!'
    },
    {
      question: 'Who do you inherit your farm from?',
      answers: [
        'Your dad',
        'Your grandfather',
        'Gus',
        'Elliot'
      ],
      correctAnswer: 1,
      incorrectDesc: 'You inherit your farm from your grandfather.',
      factoid: 'You receive it after quitting your job at Joja Corporation!'
    },
    {
      question: 'Who runs the Stardrop Saloon?',
      answers: [
        'Linus',
        'Emily',
        'Gus',
        'Marnie'
      ],
      correctAnswer: 2,
      incorrectDesc: 'Gus runs the Stardrop Saloon.',
      factoid: 'Check the arcade for playable games like Junimo Kart!'
    },
    {
      question: 'Where do you give items to the Junimos?',
      answers: [
        'The Caves',
        'The Community Center',
        'JojaMart',
        'The Beach'
      ],
      correctAnswer: 1,
      incorrectDesc: 'You give items to the Junimos at The Community Center.',
      factoid: 'Make sure to complete all bundles to fully restore each room!'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  answer: ''
};

/*
 * 
 * Technical requirements:
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * [See your course material, consult your instructor, and reference the slides for more details.]
 * NO additional HTML elements should be added to the index.html file.
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary.
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING.
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates

function generateQuizQuestion() {
  let html = '';
  html = `<section class='js-main-screen'>
            <h2 class='js-question-box'>${store.questions[store.questionNumber].question}</h2>
            <form action='' id='js-answer-form' class='js-answer-box'>`;

  let i = 1;
  store.questions[store.questionNumber].answers.forEach(quizAnswer => {

    html += `<div class='input-container'>
    <input type="radio" required name="answer" id='answer${i}' value='${quizAnswer}'>
    <label for='answer${i}'>${quizAnswer}</label>
  </div>`;
    i++;
  })

  html += `<section class='js-answer-eval'></section>
         <button type ='submit' class='js-answer-button'>Submit</button>`
  html += generateQuizCount();
  html += `</form>
         </section>`;
  return html;
};


function generateQuizFeedback() {
  let html = '';
  let incorrectFlag = false;
  let currentQuestion = store.questions[store.questionNumber];
  let correct = currentQuestion.answers[currentQuestion.correctAnswer];
  html += `<section class='js-main-screen'>
              <h2 class='js-question-box'>${currentQuestion.question}</h2>
              <form action='' id='js-answer-form' class='js-answer-box'>`

  let i = 1;
  currentQuestion.answers.forEach(quizAnswer => {

    if (quizAnswer != correct && quizAnswer === store.answer) {

      incorrectFlag = !incorrectFlag;
      html += `<div class='input-container incorrect'>`;
    } else {
      if (quizAnswer === correct) {

        html += `<div class='input-container correct'>`;
        if (correct === store.answer) {
          store.score++;
        }
      } else {
        html += `<div class = 'input-container'>`
      }
    }
    html += `<input disabled ${store.answer === quizAnswer ? `checked` : ``} type="radio" name="answer" id='answer${i} value='${quizAnswer}'>`;
    html += `<label for='answer${i}'>${quizAnswer}</label>`;
    html += `</div>`;
    i++;
  })

  if (incorrectFlag) {
    html += `<section class='js-answer-eval incorrect'><strong>
    Incorrect!</strong> ${currentQuestion.incorrectDesc} ${currentQuestion.factoid}
    </section>`;
  } else {
    html += `<section class='js-answer-eval correct'><strong>
    Correct!</strong> ${currentQuestion.factoid}
    </section>`;
  }

  html += `<button type ='submit' class='js-continue-button'>Continue</button>`;
  html += generateQuizCount();
  html += `</form>
          </section>`;

  store.questionNumber++;
  return html;
}


function generateQuizCount() {
  // current question, total questions, and total questions right
  return `<h3>Question ${(store.questionNumber + 1)}/${store.questions.length}. ${store.score} correct.</h3>`;
};

function generateTitleScreen() {
  //generate our title screen and restart
  return `<section class = 'js-main-screen'>
              <h2 class = 'center-text'>Test your Stardew Valley knowledge with this quiz!</h2> 
              <button type='submit' class = 'js-start-button'>Start!</button>
          </section>`
};

function generateEndScreen() {
  // generate our quiz results
  return `<section class='js-main-screen'>
            <div class='results-container'>
              <h2 class='js-results-text'>Your Results</h2>
              <h3 class='js-results-text'>You got ${store.score} out of ${store.questions.length} right!</h2>
              <h3 class='js-results-text'>${Math.floor((store.score / store.questions.length) * 100)}%</h2>
              <button type='submit' class='js-end-button'>Play again!</button>    
            </div>
          </section>`
}

/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuizScreen() {
  // render what we've generated to the screen
  // if our quiz started flag is false // generate our title screen else
  // if our question number > questions.length // generate end screen
  // else // generate our quiz question

  let generateString = '';
  // title screen // question screen // correct screen // incorrect screen
  if (!store.quizStarted) {
    generateString = generateTitleScreen();
  } else if (store.questionNumber >= store.questions.length) {
    generateString = generateEndScreen();
  } else {
    if (store.answer) {
      generateString = generateQuizFeedback();
    } else {
      generateString = generateQuizQuestion();
    }
  }
  $('main').html(generateString);
}

/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)

// Retrieve answer identifier of user-checked radio btn
// Perform check: User answer === Correct answer? 
function handleAnswerSubmitted() {
  $('main').on('submit', '#js-answer-form', (event) => {
    event.preventDefault();
    store.answer = $('input[name="answer"]:checked').val();
    renderQuizScreen();
  });
}

// render appropriate section (event listener)
function handleNextQuestion() {
  $('main').on('click', '.js-continue-button', (event) => {
    store.answer = '',
      renderQuizScreen();
  });
}

// start our quiz
function handleStartQuiz() {
  $('main').on('click', '.js-start-button', (event) => {
    event.preventDefault();
    store.quizStarted = !store.quizStarted;
    renderQuizScreen();

  });
}

// reset score// reset questionNumber// reset quizStarted// return to start screen
function handleEndQuiz() {
  $('main').on('click', '.js-end-button', (event) => {
    store.score = 0;
    store.questionNumber = 0;
    store.quizStarted = false;
    renderQuizScreen();
  });
}

function handleQuizApp() {
  renderQuizScreen();
  handleStartQuiz();
  handleAnswerSubmitted();
  handleNextQuestion();
  handleEndQuiz();
}

// on page load, call this function that attaches event listeners
$(handleQuizApp);