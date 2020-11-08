var startButtonEl = document.querySelector(".start-btn");
var introPageEl = document.querySelector(".intro-page");
var quizContainerEl = document.querySelector(".quiz-container");
var quizQuestionEl = document.getElementById("quiz-question");
var quizAnswer1 = document.getElementById("button1");
var quizAnswer2 = document.getElementById("button2");
var quizAnswer3 = document.getElementById("button3");
var quizAnswer4 = document.getElementById("button4");
var questionNumber = 0;


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


    

var answerHandler = function (event) {

    var buttonAnswer = event.target.textContent;
    var arrayAnswer = quizArray[questionNumber].answer;


    if (buttonAnswer ===  arrayAnswer) {
        alert("Correct!");
    }
    else {
        alert("Incorrect!");
    }

    if (questionNumber < quizArray.length - 1) {
        questionNumber++;
        loadQuestions(questionNumber);
    }
    else {
        alert("Done")
    }
}


var takeQuiz = function() {
    quizContainerEl.classList.remove('hide');
    loadQuestions(questionNumber);
    
}

var loadQuestions = function(index) {
    quizQuestionEl.textContent = quizArray[index].title;
    quizAnswer1.textContent = quizArray[index].choices[0];
    quizAnswer2.textContent = quizArray[index].choices[1];
    quizAnswer3.textContent = quizArray[index].choices[2];
    quizAnswer4.textContent = quizArray[index].choices[3];
}

startButtonEl.addEventListener("click", function() {
    introPageEl.classList.add('hide');
    takeQuiz(); 
});


quizAnswer1.addEventListener("click", answerHandler);
quizAnswer2.addEventListener("click", answerHandler);
quizAnswer3.addEventListener("click", answerHandler);
quizAnswer4.addEventListener("click", answerHandler);

