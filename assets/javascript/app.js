var questions=[
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
        correct: "Super Mario Bros."
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


var gameIsOn = false;
var tbody=$("tbody");
var questionNumber = 0;
var thead=$("thead");
var questionTime = 30;
var questionInterId;
var betweenQuestionInterId;



function questionTimeStart(){
    clearInterval(questionInterId);
    questionInterId = setInterval(decrement, 1000);
}
function decrement(){
    questionTime--;
    $("#gameinfo").text("Time Remaing: " + questionTime + " Seconds");
    if (questionTime === 0){
        stopTime(questionInterId);
        $("#gameinfo").text("Time's Up!");
    }
}
function stopTime(interval){
    clearInterval(interval);
}

$("#startbutton").on("click", function(){
    startGame();
    this.remove();
})

function startGame(){
    gameIsOn = true;
    nextQuestion(questionNumber);
    $("#gameinfo").text("Time Remaing: " + questionTime + " Seconds");
}
function nextQuestion(number){
    questionTimeStart();
    var questionDiv = $("<div>");
    questionDiv.attr("id", "questionDiv")
    var questionH =$("<h3>");
        questionH.text(questions[number]["question"]);
        console.log(questions[number].question);
        questionH.appendTo(questionDiv);
        $("#question").append(questionDiv);
        for(options in questions[number].answers){
            var answerRow = $("<tr>");
            var answerTD = $("<td>");
            answerTD.addClass("align-middle");
            answerTD.text(questions[number].answers[options]);
            answerTD.appendTo(answerRow);
            console.log("answer: " + questions[number].answers[options]);
            tbody.append(answerRow);
        }

}
$("body").on("click", "#answertable tr td", function(){
    console.log("This was clicked: " + this.innerHTML);
    console.log("Question Number: " + questionNumber)
    if(this.innerHTML == questions[questionNumber]["correct"]){
        console.log("correct answer");
        questionNumber++;
        nextQuestion(questionNumber);
    }
})