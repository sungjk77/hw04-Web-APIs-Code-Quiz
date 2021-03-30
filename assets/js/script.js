//Global Variables
var timeEl = document.querySelector(".time");
var scoresEl = document.getElementById("scores");
var currentScoreEl = document.getElementById("currentScoreTitle");
var currentScoreClass = document.querySelector(".currentscore");
var currentscoreID = document.getElementById("currentscoreID");
var mainscreen = document.getElementById("mainscreen")
var btnStart = document.querySelector("#btnStart");
var scorelist = document.querySelector("#scorelist");
var progressbar = document.querySelector(".progressbar");
var showscore = false;
var defaultSeconds = 100;
var secondsLeft;
var FinalScore = {
    initials: "",
    time: 0,
    correct: 0
}
var varQuiz = [{
    "question":"Commonly used data types DO NOT include",
    "choice1":"strings",
    "choice2":"booleans",
    "choice3":"alerts",
    "choice4":"numbers",
    "correct": 3,
    "answered":false
},
{
    "question":"The condition in an if/else statement is enclosed within _____",
    "choice1":"quotes",
    "choice2":"curly brackets",
    "choice3":"parentheses",
    "choice4":"square brackets",
    "correct": 3,
    "answered":false
},
{
    "question":"Arrays in JavaScript can be used to store ________",
    "choice1":"numbers and strings",
    "choice2":"other arrays",
    "choice3":"booleans",
    "choice4":"all of the above",
    "correct": 4,
    "answered":false
},
{
    "question":"String values must be enclosed within _______ when being assigned to variables.",
    "choice1":"commas",
    "choice2":"curly brackets",
    "choice3":"quotes",
    "choice4":"parentheses",
    "correct": 3,
    "answered":false
},
{
    "question":"A very useful tool used during development and debugging for printing content to the debugger is:",
    "choice1":"JavaScript",
    "choice2":"terminal/bash",
    "choice3":"for loops",
    "choice4":"console.log",
    "correct": 4,
    "answered":false
}
];

var varHighScore = ["34 AB","24 AC","14 AD","54 AA", "90 GD"];

function sendMessage(varMessage) {
    timeEl.textContent = varMessage;
    console.log(varMessage);
}

function startTime(valSeconds) {
    // Sets interval in variable
    console.log("start timer")
    var timerInterval = setInterval(function() {
      valSeconds--;
      secondsLeft = valSeconds;
      timeEl.textContent = secondsLeft + " seconds left";
      secondsleft = valSeconds;
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
        sendMessage("Times Up!");
      }
    }, 1000);
    return(secondsLeft);
  }

function printScore() {
    FinalScore.time = secondsLeft;
    FinalScore.correct = 0;

    for (var i = 0; i < varQuiz.length; i++) {
        if(varQuiz[i].answered == varQuiz[i].correct) {
            FinalScore.correct++;
        }
    }

    var varText =  
    `<h2>Congratulations!</h2>
        <div>
            You completed the Quiz in time!
        </div>
        <p>You got `+FinalScore.correct+` out of `+varQuiz.length+` correct
        <p>Your did it with `+FinalScore.time+` seconds left
        <p>Please enter your initials to enter your highscore:
        <p><input type="text" class="form-input" name="initials" placeholder="Your initials here" />
        `;


    mainscreen.innerHTML = varText;
}

function printQuestion (varNumber) {
    if(varNumber < varQuiz.length) {
    var varText =  `<h2>`+varQuiz[varNumber].question+`</h2>`+
        `<div>
            <ol>
                <li class = "choice" id = "choice1" data-value="1">`+varQuiz[varNumber].choice1+`</li>
                <li class = "choice" id = "choice2" data-value="1">`+varQuiz[varNumber].choice2+`</li>
                <li class = "choice" id = "choice3" data-value="1">`+varQuiz[varNumber].choice3+`</li>
                <li class = "choice" id = "choice4" data-value="1">`+varQuiz[varNumber].choice4+`</li>
            </ol>
        </div>`;
    mainscreen.innerHTML = varText;
    } else {printScore()}
}

function printProgress () {
    var qRight = `<span style="color:green;">Correct</span>`;
    var qWrong = `<span style="color:red;">Wrong</span>`;
    var qNotDone = `unanswered`;
    var qProgress = 0;

    currentscoreID.innerHTML = "";
    for (var i=0; i<varQuiz.length; i++) {
        if (!varQuiz[i].answered) {score = qNotDone;} 
        else if (varQuiz[i].answered == varQuiz[i].correct) {
            score = qRight;
            qProgress++;
        } else {
            score = qWrong;
            qProgress++;
        }  
        var li = document.createElement("li");
        li.innerHTML = score;
        currentscoreID.appendChild(li);
   }
   console.log(100/varQuiz.length);
   currentscoreID.style.height = 50 * varQuiz.length +10+"px";
   progressbar.style.width = qProgress * (100/varQuiz.length)+"%";
   console.log(qProgress);
   progressbar.textContent = qProgress * (100/varQuiz.length)+"%";
}

function getAnswer(i) {
    var choice1El = document.getElementById("choice1"); 
    var choice2El = document.getElementById("choice2"); 
    var choice3El = document.getElementById("choice3"); 
    var choice4El = document.getElementById("choice4"); 
    
    if (i < varQuiz.length) {
        console.log("awaiting response for "+i);
        choice1El.addEventListener("click", function() {
            varQuiz[i].answered = 1;
            if (i<varQuiz.length) {
                i++;
                printQuestion(i);
                getAnswer(i);
                printProgress();
            } else {printScore();}        });
        choice2El.addEventListener("click", function() {
            varQuiz[i].answered = 2;
            if (i<varQuiz.length) {
                i++;
                printQuestion(i);
                getAnswer(i);
                printProgress();
            } else {printScore();}
        });
        choice3El.addEventListener("click", function() {
                varQuiz[i].answered = 3;
                if (i<varQuiz.length) {
                    i++;
                    printQuestion(i);
                    getAnswer(i);
                    printProgress();
                } else {printScore();}
        });
        choice4El.addEventListener("click", function() {
                    varQuiz[i].answered = 4;
                    if (i<varQuiz.length) {
                        i++;
                        printQuestion(i);
                        getAnswer(i);
                        printProgress();
                    } else {printScore();}        });
    } else {printScore();}
}

function checkAnswer(i) {
    if (varQuiz[i].correct = varQuiz[i].answered) {
        return true;
    } else {return false;}
}

function startQuiz() {
    currentScoreEl.style.display = "block";
    currentScoreClass.style.display ="block";
    btnStart.style.display="none";
    currentScoreClass.style.height = 20 * varQuiz.length +"px";
    console.log(varQuiz.length);
    var i = 0;
        printQuestion(i);
        getAnswer(i);
        console.log (secondsLeft);
}

function showDefault() {
    location.reload();
}
btnStart.addEventListener("click", function() {
    startTime(defaultSeconds);
    //start quiz
    startQuiz();
    printProgress();

    //print score and enter initials
//    printScore();
    //show High scores, option to [go back] & [clear highscores]

  });

btnHighScore.addEventListener("click", function() {
    var varMessage = "";
    varHighScore.sort();
    varHighScore.reverse(); 

    console.log(varHighScore);
    if (showscore) {
        showscore=false;
        scoresEl.style.display = "none";
    } else {
        showscore=true;
        scorelist.textContent = "";
        for (var i = 0; i < varHighScore.length; i++) {
            var score = varHighScore[i];
            var li = document.createElement("li");
            li.textContent = score;
            scorelist.appendChild(li);
        }
        scoresEl.style.display = "block";
        scoresEl.style.height = 50 * varHighScore.length +10+"px";
    }
});

console.log(varQuiz)
