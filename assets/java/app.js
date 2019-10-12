// values
let counter = 10;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

// display question and choices 

function nextQuestion(){

const isQuestionOver = (quizQuestion.length - 1) === currentQuestion;

    if (isQuestionOver){
        console.log("game over");
        displayResult();

    } else {
        currentQuestion++;
        loadQuestion();
    }
}


function timeUp(){
    clearInterval(timer);
    
    lost++;

    preloadImage("lost");
    setTimeout(nextQuestion, 3 * 1000);

}


function countDown(){
    counter--;

    $("#time").html("Timer: " + counter);

    if (counter === 0){
        timeUp();
    }
}

function loadQuestion() {

    counter = 10;

    timer = setInterval(countDown, 1000);

    const question = quizQuestion[currentQuestion].question; //
    const choices = quizQuestion[currentQuestion].choices; //

    $("#time").html("Timer: " + counter);
    $("#game").html(`
        <h4> ${question} </h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
        `);
}

function loadChoices(choices){
    let result = " ";

    for (let i = 0; i < choices.length; i++){
        result += `<p class="choice" data-answer="${choices[i]}"> ${choices[i]} </p>`;
    }

    return result;
}

// go to the next question if right/wrong
// event delegation


$(document).on("click", ".choice", function(){
    clearInterval(timer);
    const selectedAnswer = $(this).attr("data-answer");
    const correctAnswer = quizQuestion[currentQuestion].correctAnswer;

    if ( correctAnswer === selectedAnswer){
        // wins
        score++;
        preloadImage("win");
        setTimeout(nextQuestion, 5 * 1000);
        
    }
    else {
        lost++;
        preloadImage("lost");
        setTimeout(nextQuestion, 5 * 1000);
        
    }
});


function displayResult(){
    const result= `
    <p> You got ${score} question(s) right </p>
    <p> You got ${lost} question(s) wrong </p>
    <p> Total Questions ${quizQuestion.length} question(s) right </p>
    <button class="btn btn-primary" id="reset"> Reset Game </button>

    `;
    $("#game").html(result);
}


$(document).on("click", "#reset", function(){
    counter = 10;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
});


function loadRemainingQuestion(){
    const remainingQuestion = quizQuestion.length - (currentQuestion + 1);
    const totalQuestion = quizQuestion.length;

    return `Remaining Question:  ${remainingQuestion}/${totalQuestion}`;



}

// images

function image(images){
    const random = Math.floor(Math.random() * images.length);
    const image = images[random];
    return image;

}

function preloadImage(status) {
    const correctAnswer = quizQuestion[currentQuestion].correctAnswer;
    
    if (status === "win"){
        $("#game").html(`
        <p class="preload-image"> Correct! </p>
        <p class="preload-image"> the correct answer is <b>${correctAnswer}</b> </p>
        <img src="${image(yesImage)}"/>
        `)
    } else {
        $("#game").html(`
        <p class="preload-image"> Correct answer was <b>${correctAnswer}</b> </p>
        <p class="preload-image"> get gud ur trash ked </p>
        <img src="${image(oopsImage)}"/>
        `)


    }
}





$("#start").click(function(){
    $("#start").remove();
    $("#time").html(counter);
    loadQuestion();
});;