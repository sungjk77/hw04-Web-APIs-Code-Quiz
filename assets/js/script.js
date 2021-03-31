//Global Variables
var timeEl = document.querySelector(".time");
var scoresEl = document.getElementById("scores");
var currentScoreEl = document.getElementById("currentScoreTitle");
var currentScoreClass = document.querySelector(".currentscore");
var currentscoreID = document.getElementById("currentscoreID");
var mainscreen = document.getElementById("mainscreen")
var btnStart = document.querySelector("#btnStart");
// var btnSave = document.querySelector("#btnSave");
var scorelist = document.querySelector("#scorelist");
var progressbar = document.querySelector(".progressbar");
var HighScoreForm = document.querySelector("#varHighScore");
var showscore = false;
var defaultSeconds = 75;
var penaltySeconds = 20;
var secondsLeft;
var FinalScore = {
    initials: "",
    time: 0,
    correct: 0
}
var finishGame=false;
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
varHighScore = JSON.parse(localStorage.getItem("varHighScore"));

function sendMessage(varMessage) {
    if (varMessage == "finish") {
        finishGame = true;
    }
    if (finishGame) {
          timeEl.textContent = "";
    } else {
          timeEl.textContent = varMessage;
          console.log(varMessage);
    }
}

function printFail() {
    FinalScore.time = secondsLeft;
    FinalScore.correct = 0;

    for (var i = 0; i < varQuiz.length; i++) {
        if(varQuiz[i].answered == varQuiz[i].correct) {
            FinalScore.correct++;
        }
    }
    var varText =  
    `<h2>GAME OVER</h2>
        <div>
            You failed to complete the Quiz in the time allowed!
        </div>
        <p>You got `+FinalScore.correct+` out of `+varQuiz.length+` correct
        <input type="button" value="Try again" onclick="location.reload()">
        `;
    mainscreen.innerHTML = varText;
}
function startTime(valSeconds) {
    // Sets interval in variable
    console.log("start timer")
    var timerInterval = setInterval(function() {
      valSeconds--;
      secondsLeft = valSeconds;
      timeEl.textContent = secondsLeft + " seconds left";
      if(secondsLeft < 1 || finishGame) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
        sendMessage("Game Over");
        if(secondsLeft < 1) {
            printFail();
        }
      }
    }, 1000);
    return(secondsLeft);
}



function saveScore() {
    console.log("saving score...");
    var tempText = initialsInput.value.trim();
 
    if (tempText === "") { return; }
    FinalScore.initials = tempText;
    varHighScore.push(FinalScore.time+"s "+FinalScore.initials+" "+FinalScore.correct+"/"+varQuiz.length);
    localStorage.setItem("varHighScore", JSON.stringify(varHighScore));
}

function clearScore() {
    varHighScore=[];
    localStorage.setItem("varHighScore", JSON.stringify(varHighScore));
}
function printScore() {
    FinalScore.time = secondsLeft;
    if (secondsLeft < 1) {
        printFail();
        return;
    }
    FinalScore.correct = 0;

    for (var i = 0; i < varQuiz.length; i++) {
        if(varQuiz[i].answered == varQuiz[i].correct) {
            FinalScore.correct++;
        }
    }
    sendMessage("finish");
    var varText =  
    `<h2>🏆 Congratulations! 🏆</h2>
        <div>
            You completed the Quiz in time!
        </div>
        <p>You got `+FinalScore.correct+` out of `+varQuiz.length+` correct
        <p>Your did it with `+FinalScore.time+` seconds left
        <p>Please enter your initials to save your highscore:
        <p><input type="text" name="initials" id="initialsInput" placeholder="Your initials here" />
        <p><span class="start margin:10px;" Id="btnSave" onclick="saveScore()">SAVE</span>
        <p><a href="javascript:clearScore()" Id="btnClear">clear scores</a>
        <p><a href="javascript:location.reload()" Id="btnClear">Start Over</a>
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
            if (varQuiz[i].answered != varQuiz[i].correct) {secondsLeft -= penaltySeconds;}
            if (i<varQuiz.length) {
                i++;
                printQuestion(i);
                getAnswer(i);
                printProgress();
            } else {printScore();}        
        });
        choice2El.addEventListener("click", function() {
            varQuiz[i].answered = 2;
            if (varQuiz[i].answered != varQuiz[i].correct) {secondsLeft -= penaltySeconds;}
            if (i<varQuiz.length) {
                i++;
                printQuestion(i);
                getAnswer(i);
                printProgress();
            } else {printScore();}
        });
        choice3El.addEventListener("click", function() {
            varQuiz[i].answered = 3;
            if (varQuiz[i].answered != varQuiz[i].correct) {secondsLeft -= penaltySeconds;}
            if (i<varQuiz.length) {
                i++;
                printQuestion(i);
                getAnswer(i);
                printProgress();
            } else {printScore();}
        });
        choice4El.addEventListener("click", function() {
            varQuiz[i].answered = 4;
            if (varQuiz[i].answered != varQuiz[i].correct) {secondsLeft -= penaltySeconds;}
            if (i<varQuiz.length) {
                i++;
                printQuestion(i);
                getAnswer(i);
                printProgress();
            } else {printScore();}        
        });
    } else {printScore();}
}

function checkAnswer(i) {
    if (varQuiz[i].correct == varQuiz[i].answered) {
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

btnHighScore.addEventListener("click", function() {
    console.log(varHighScore);
    if(varHighScore !== null) {
        varHighScore.sort();
        varHighScore.reverse(); 

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
    } else {varHighScore=[];}
});

btnStart.addEventListener("click", function() {
    startTime(defaultSeconds);
    //start quiz
    startQuiz();
    printProgress();

    //print score and enter initials
    //show High scores, option to [go back] & [clear highscores]
});



