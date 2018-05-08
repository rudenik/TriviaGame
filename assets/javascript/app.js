var questions = [
    {
        question: "What year was the Nintendo Entertainment Console released in North American?",
        answers: [
            "1991", "1981", "1985", "1986"
        ],
        correct: "1985"
    },
    {
        question: "What was the best selling game for the NES?",
        answers: [
            "Duck Hunt", "The Legend of Zelda", "Super Mario Bros.", "Metroid"
        ],
        correct: "Super Mario Bros.",
        winImage: "assets/images/win1.gif"
    },
    {
        question: "what is the high score for the game tetris?",
        answers: [
            "999, 999", "1, 000, 000", "723, 083", "443, 220"
        ],
        correct: "999, 999"
    },
    {
        question: "Which of the following games did Mario creator Shigeru Miyamoto NOT design?",
        answers: [
            "Donkey Kong", "Kid Icarus", "Excitebike", "The Legend of Zelda"
        ],
        correct: "Kid Icarus"
    },
    {
        question: "What is the first Nintendo game to feature Mario in it?",
        answers: [
            "Tennis", "Mario Bros.", "Donkey Kong", "Wrecking Crew"
        ],
        correct: "Donkey Kong"
    },
    {
        question: "Which film inspired the enemies in Nintendo's Metroid series?",
        answers: [
            "Star Wars", "Galaxy of Terror", "Predator", "Alien"
        ],
        correct: "Alien"
    },
    {
        question: "What was the first NES game to use the 'Konami Code'?",
        answers: [
            "Contra", "Life Force", "Gradius", "R-Type"
        ],
        correct: "Gradius"
    },
    {
        question: "What is the hardest game for the NES",
        answers: [
            "Ninja Gaiden III: The Ancient Ship of Doom", "Battletoads", "Castlevania III: Dracula's Curse", "Ghosts 'n Goblins"
        ],
        correct: "Ghosts 'n Goblins"
    }]



var tbody = $("tbody");
var questionNumber = 0;
var thead = $("thead");
var questionTime = 30;
var questionInterId;
var interludeInterId;
var interludeTime = 5;
var qDiv = $("#questionDiv");
var correctCount = 0;
var incorrectCount = 0;
var timeoutCount = 0;
var audio;




function startGame() {
    nextQuestion(questionNumber);

}

$("#startbutton").on("click", function () {
    startGame();
    playAudio("gamestart.wav");
    this.remove();
})

$("#question").on("click", "#restartbutton", function () {
    console.log("restart clicked");
    $("#gameinfo").empty();
    $("#question").empty();
    this.remove();
    correctCount = 0;
    incorrectCount = 0;
    timeoutCount = 0;
    questionNumber = 0;
    playAudio("restart.wav");
    startGame();
})

$("body").on("click", "#answertable tr td", function () {
    playAudio("click.wav");
    if (this.innerHTML == questions[questionNumber]["correct"]) {
        console.log("correct answer");
        stopTime(questionInterId);
        setTimeout(function () {
            playAudio("correct.wav");
            correctlyAnswered();
            $("#gameinfo").text("");
            correctCount++;
        }, 500);
    }
    else {
        stopTime(questionInterId);
        setTimeout(function () {
            playAudio("incorrect.wav");
            incorrectCount++;
            poorlyAnswered();
        }, 500);
    }
});


function nextQuestion(number) {
    if (questionNumber >= questions.length) {
        console.log("end game splash");
        stopTime(questionInterId);
        playAudio("gamefinished.wav");
        $("#gameinfo").empty();
        $("#gameinfo").text("That's it, here's how you did!");
        $("#question").empty();
        $("#question").html("<h5> Correctly Answered: " + correctCount + "<br>" +
            "Answered Incorrectly: " + incorrectCount + "<br>" +
            "Question Time Outs: " + timeoutCount + "<br><br>" +
            "Would you like to play again?<br></h5>"
        );
        var restartButton = $("<button>");
        restartButton.text("Start Over?");
        restartButton.addClass("btn str-btn");
        restartButton.attr("id", "restartbutton");
        $("#question").append(restartButton);
    } else {
        questionTime = 30;
        $("#question").empty();
        $("#gameinfo").text("Time Remaing: " + questionTime + " Seconds");
        questionTimeStart();
        var questionDiv = $("<div>");
        questionDiv.attr("id", "questionDiv")
        var questionH = $("<h3>");
        questionH.text(questions[number]["question"]);
        questionH.appendTo(questionDiv);
        $("#question").append(questionDiv);
        shuffleArray(questions[number].answers);
        for (options in questions[number].answers) {
            var answerRow = $("<tr>");
            var answerTD = $("<td>");
            answerTD.addClass("align-middle");
            answerTD.text(questions[number].answers[options]);
            answerTD.appendTo(answerRow);
            tbody.append(answerRow);
        }
    }
}


function correctlyAnswered() {
    var imageStr = "assets/images/win" + questionNumber + ".gif";
    tbody.empty();
    $("#questionDiv").empty();
    $("#questionDiv").html("Correct!<br>");
    var image = $("<img>");
    image.attr("src", imageStr);
    image.appendTo($("#questionDiv"));
    questionNumber++;
    setTimeout(function () {
        $("#questionDiv").empty();
        nextQuestion(questionNumber)
    }, 5000);
}
function poorlyAnswered() {
    tbody.empty();
    $("#questionDiv").empty();
    $("#questionDiv").html("DING DONG YA WRONG!<br>The Correct Answer is " + questions[questionNumber].correct + "<br><br>");
    var image = $("<img>");
    image.attr("src", "assets/images/lose2.gif").attr("height", 288).attr("width", 384);
    image.appendTo($("#questionDiv"));
    questionNumber++;
    setTimeout(function () {
        $("#questionDiv").empty();
        nextQuestion(questionNumber)
    }, 5000);
}

function questionTimeStart() {
    clearInterval(questionInterId);
    questionInterId = setInterval(decrement, 1000);
}

function stopTime(interval) {
    clearInterval(interval);
}

function decrement() {
    questionTime--;
    $("#gameinfo").text("Time Remaing: " + questionTime + " Seconds");
    if (questionTime === 0) {
        stopTime(questionInterId);
        $("#gameinfo").text("Time's Up!");
        timeoutCount++;
        playAudio("timesup.wav");
        poorlyAnswered();
    }
}

function playAudio(audioFile) {
    audio = new Audio("assets/audio/" + audioFile);
    audio.play();
}

function shuffleArray(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
