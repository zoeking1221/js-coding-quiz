var startButtonEl = document.querySelector(".start-btn");
var introPageEl = document.querySelector(".intro-page");
var quizContainerEl = document.querySelector(".quiz-container");
var quizQuestionEl = document.getElementById("quiz-question");
var quizAnswer1 = document.getElementById("button1");
var quizAnswer2 = document.getElementById("button2");
var quizAnswer3 = document.getElementById("button3");
var quizAnswer4 = document.getElementById("button4");
var questionNumber = 0;
var timerEl = document.getElementById("timer");
var timeLeft = 60;
var initialPageEl = document.getElementById("initials-page");
var initialTextEl = document.getElementById("initials-text");
var highScorePageEl = document.getElementById("high-scores")
var submitButtonEl = document.getElementById("submit-btn");
var goBackButtonEl = document.getElementById("go-back")
var clearHSButtonEl = document.getElementById("clear-hs")
var score;
var timeInterval;
var initialForm = document.getElementById("initials-input")


// the array of questions for the game 
var quizArray = [
    {
       title: "Global variables should be defined in which section of the js file?",
       choices: [
           "The top",
           "The middle/within functions",
           "The bottom",
           "Anywhere"
       ],
       answer: "The top"
    },
    {
        title: "Elements within an array are separated by what symbol?",
        choices: [
            "Commas",
            "Ampersands",
            "Colons",
            "Semi colons"
        ],
        answer: "Commas"
     },
     {
        title: "In order to comment out code in a js file, type the following code before the text you'd like to comment out",
        choices: [
            "//",
            "!!",
            "--",
            "Comment:"
        ],
        answer: "//"
     },
     {
        title: "In an indexed array, the first element is known as index __.",
        choices: [
            "1",
            "0",
            "[i]",
            "i"
        ],
        answer: "0"
     }
]

// function for timer/score
var timerScore = function() {
    timeInterval = setInterval(function() {
        if (timeLeft >= 0) {
            timerEl.textContent = "Time: " + timeLeft;
            timeLeft--;
        }
 
        else if (timeLeft < 0) {
            timeLeft = 0;
            quizContainerEl.classList.add('hide');
            initialPageEl.classList.remove('hide');
            score = 0;
            initialTextEl.textContent = "Your final score is " + score + "."
        }
        else {
            clearInterval(timeInterval);
            quizContainerEl.classList.add('hide');
            initialPageEl.classList.remove('hide');
            score = 0;
            initialTextEl.textContent = "Your final score is " + score + "."
        }
    }, 1000);
}   


// function for when user clicks 'submit' after entering initials
var submitHandler = function (event) {
    event.preventDefault();
    var initials = initialForm.value;
    if (!initialForm.value) {
        window.alert("Please enter your initials!");
    }

    else {
        var userScore = {
            initials: initials,  
            score: score
         }
         if (localStorage !=="undefined") {
             var firstScoreArray = [];
             firstScoreArray.push(userScore);
             localStorage.setItem('initials and score', JSON.stringify(firstScoreArray));
         }
         else {
             var subScoreArray = [] ;
             subScoreArray.push(userScore);
             var highScoresArray = firstScoreArray.concat(subScoreArray);
             localStorage.setItem ('initials and score', JSON.stringify(highScoresArray));
         }
    pageRedirect();
    }
};

// function to take user to high score page
var pageRedirect = function () {
    window.location.href = "./high-score.html"
};

// function to determine whether answer was correct and alert user, deduct time if incorrect
var answerHandler = function (event) {

    var buttonAnswer = event.target.textContent;
    var arrayAnswer = quizArray[questionNumber].answer;


    if (buttonAnswer ===  arrayAnswer) {
        alert("Correct!");
    }
    else {
        alert("Incorrect!");
        timeLeft = timeLeft - 10;
    }

    if (questionNumber < quizArray.length - 1) {
        questionNumber++;
        loadQuestions(questionNumber);
    }
    else {
        quizContainerEl.classList.add('hide');
        initialPageEl.classList.remove('hide');
        score = timeLeft + 1;
        clearInterval(timeInterval);
        initialTextEl.textContent = "Your final score is " + score + "."
    }
}

// function to begin quiz and timer when user clicks start button
var takeQuiz = function() {
    quizContainerEl.classList.remove('hide');
    loadQuestions(questionNumber);
    timerScore();
}

// function to load questions into grid
var loadQuestions = function(index) {
    quizQuestionEl.textContent = quizArray[index].title;
    quizAnswer1.textContent = quizArray[index].choices[0];
    quizAnswer2.textContent = quizArray[index].choices[1];
    quizAnswer3.textContent = quizArray[index].choices[2];
    quizAnswer4.textContent = quizArray[index].choices[3];
};


// function to go to quiz if user clicks on start button
if (startButtonEl) {
startButtonEl.addEventListener("click", function() {
    introPageEl.classList.add('hide');
    takeQuiz(); 
});
}

var startOver = function () {
    window.location.href = "./index.html"
}

// event listeners 
if (quizAnswer1) {
quizAnswer1.addEventListener("click", answerHandler);
quizAnswer2.addEventListener("click", answerHandler);
quizAnswer3.addEventListener("click", answerHandler);
quizAnswer4.addEventListener("click", answerHandler);
};
if (submitButtonEl) {
submitButtonEl.addEventListener("click", submitHandler);
}
if (goBackButtonEl) {
goBackButtonEl.addEventListener("click", startOver);
}