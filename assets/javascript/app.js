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
        question: "What is the worst selling game for the Nintendo Entertainment System",
        answers: [
            "Bible Adventures", "Deadly Towers", "Gilligan's Island", "Barbie"
        ],
        correct: "Barbie"
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
var correctCount=0;
var incorrectCount=0;
var timeoutCount=0;




function questionTimeStart() {
    clearInterval(questionInterId);
    questionInterId = setInterval(decrement, 1000);
}
function decrement() {
    questionTime--;
    $("#gameinfo").text("Time Remaing: " + questionTime + " Seconds");
    if (questionTime === 0) {
        stopTime(questionInterId);
        $("#gameinfo").text("Time's Up!");
        timeoutCount++;
        poorlyAnswered();
    }
}
function stopTime(interval) {
    clearInterval(interval);
}

$("#startbutton").on("click",  function () {
    startGame();
    this.remove();
})
$("#question").on("click", "#restartbutton", function(){
    console.log("restart clicked");
    $("#gameinfo").empty();
    $("#question").empty();
    this.remove();
    questionNumber = 0;
    startGame();
})

function startGame() {
    nextQuestion(questionNumber);
    
}

function nextQuestion(number) {
    // console.log("Question Number, next Question() : " + number + "QN" + questionNumber);
    // console.log("questions.length: " + questions.length);
    if(questionNumber >= 1/*questions.length*/){
        console.log("end game splash");
        stopTime(questionInterId);
        $("#gameinfo").empty();
        $("#gameinfo").text("That's it, here's how you did!");
        $("#question").empty();
        $("#question").html("Correctly Answered: " + correctCount + "<br>" +
                             "Answered Incorrectly: " + incorrectCount + "<br>" +
                             "Question Time Outs: " + timeoutCount + "<br>" +
                             "Would you like to play again?"
                            );
        var restartButton = $("<button>");
        restartButton.text("Start Over?");
        restartButton.addClass("btn str-btn");
        restartButton.attr("id", "restartbutton");
        $("#question").append(restartButton);                  


    } else {
    questionTime=30;
    $("#question").empty();
    $("#gameinfo").text("Time Remaing: " + questionTime + " Seconds");
    questionTimeStart();
    var questionDiv = $("<div>");
    questionDiv.attr("id", "questionDiv")
    var questionH = $("<h3>");
    questionH.text(questions[number]["question"]);
    questionH.appendTo(questionDiv);
    $("#question").append(questionDiv);
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
$("body").on("click", "#answertable tr td", function () {
    if (this.innerHTML == questions[questionNumber]["correct"]) {
        console.log("correct answer");
        correctlyAnswered();
        stopTime(questionInterId);
        $("#gameinfo").text("");
        correctCount++;
    }
    else{
        stopTime(questionInterId);
        incorrectCount++;
        poorlyAnswered();

    }
})
function correctlyAnswered() {
    var imageStr = "assets/images/win"+questionNumber+".gif";
    tbody.empty();
    $("#questionDiv").empty();
    $("#questionDiv").html("Correct!<br>");
    var image = $("<img>");
    image.attr("src", imageStr);
    image.appendTo($("#questionDiv"));
    questionNumber++;
    setTimeout(function(){
        $("#questionDiv").empty();
        nextQuestion(questionNumber)
    }, 5000);
}
function poorlyAnswered(){
    tbody.empty();
    $("#questionDiv").empty();
    $("#questionDiv").html("DING DONG YA WRONG!<br>The Correct Answer is " + questions[questionNumber].correct + "<br>");
    var image = $("<img>");
    image.attr("src", "assets/images/lose2.gif");
    image.appendTo($("#questionDiv"));
    questionNumber++;
    setTimeout(function(){
        $("#questionDiv").empty();
        nextQuestion(questionNumber)
    }, 5000);
}
