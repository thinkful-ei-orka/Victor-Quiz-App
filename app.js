/**
 * background idea: https://wallpaperaccess.com/full/1547801.jpg
 * Stretch goal: use Stardew Valley font
 * Stretch goal 2: gather images for each question
 * 
 * Example store structure
 */

// 5 or more questions are required

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
      correctAnswer: 'Lewis',
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
      correctAnswer: '1 month',
      incorrectDesc: 'Each season is one month long.',
      factoid: `You can check the calender outside of Pierre's store to keep up with each months events!`
    },    
    {
      question: 'Who do you inherit your farm from?',
      answers: [
        'Your dad',
        'Your grandfather',
        'Gus',
        'Elliot'
      ],
      correctAnswer: 'Your grandfather',
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
      correctAnswer: 'Gus',
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
      correctAnswer: 'The Community Center',
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
  // Generate a question in the quiz
  html = `<section class='js-main-screen'>
            <h2 class='js-question-box'>${store.questions[store.questionNumber].question}</h2>
            <form action='' id='js-answer-form' class='js-answer-box'>`;
  
  let i = 1;
  store.questions[store.questionNumber].answers.forEach(quizAnswer => {
    console.log(quizAnswer);
    html += `<div class='input-container'>
    <input type="radio" name="answer" id='answer${i}' value='${quizAnswer}'>
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

// beautify below this line vvv
function generateQuizFeedback() {
  let html = '';
  let incorrectFlag = false;
  let correct = store.questions[store.questionNumber].correctAnswer;
  console.log(store.answer);
  html += `<section class='js-main-screen'>
              <h2 class='js-question-box'>${store.questions[store.questionNumber].question}</h2>
              <form action='' id='js-answer-form' class='js-answer-box'>`
  
  let i = 1;
  store.questions[store.questionNumber].answers.forEach(quizAnswer => {
    
    if (quizAnswer != correct && quizAnswer === store.answer) {
      console.log('incorrect flag hit');
      incorrectFlag = !incorrectFlag;
      html += `<div class='input-container incorrect'>`;
    } else {
      if (quizAnswer === correct) {
        console.log('correct flag hit');
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
    Incorrect!</strong> ${store.questions[store.questionNumber].incorrectDesc} ${store.questions[store.questionNumber].factoid}
    </section>`;
  } else {
    html += `<section class='js-answer-eval correct'><strong>
    Correct!</strong> ${store.questions[store.questionNumber].factoid}
    </section>`;
  }

  html += `<button type ='submit' class='js-continue-button'>Continue</button>`;
  html += generateQuizCount();        
  html += `</form>
          </section>`;

  store.questionNumber++;
  return html;
}
// beautify above this line ^^^

function generateQuizCount() {
  // current question, total questions, and total questions right
  return `<h3>Question ${(store.questionNumber + 1)}/${store.questions.length}. ${store.score} correct.</h3>`;
};

// function

function generateTitleScreen(){
//generate our title screen and restart
  return `<section class = 'js-main-screen'>
              <h2>Test your Stardew Valley knowledge with this quiz!</h2> 
              <button type='submit' class = 'js-start-button'>Start!</button>
          </section>`
};

function generateEndScreen() {
  // generate our quiz results
  return `<section class='js-main-screen'>
            <div class='results-container'>
              <h2 class='js-results-text'>Results</h2>
              <h3 class='js-results-text'>You got ${store.score} questions correct out of ${store.questions.length}!</h2>
              <h3 class='js-results-text'>Your score is ${Math.floor((store.score / store.questions.length) * 100)}%</h2>
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
  console.log('renderQuizScreen called')
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
    console.log('Start button pressed');
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