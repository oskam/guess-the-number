var response = 0;
var lowBoundry = 1;
var highBoundry = 10000;
var guessNumber = 0;

$(function() {
    $("#reset").click(function() {
        reset();
    });
    reset();
});

function guess(){
    console.log("Range: " + lowBoundry + "-" + highBoundry);
    guessNumber = lowBoundry + Math.floor((highBoundry - lowBoundry)/2);
    var msg = $("<p>" + guessNumber + "</p>").addClass("client msg");
    $("#log").append(msg);
    console.log("Guessing:" + guessNumber);
    //blah
    $.ajax({
        url: "/",
        type: "POST",
        data: { number: guessNumber },
        success: function(r) {
            response = parseInt(r);

            if(response > 0) {
                var msg = $("<p> Too high! </p>").addClass("server msg")
                $("#log").append(msg);
                console.log("Too high");
                highBoundry = guessNumber;
                guess();
            } else if(response < 0) {
                var msg = $("<p> Too low! </p>").addClass("server msg")
                $("#log").append(msg);
                console.log("Too low");
                lowBoundry = guessNumber;
                guess();
            } else if(response === 0){
                var msg = $("<p> Bravo! The number is " + guessNumber + "</p>").addClass("server msg");
                $("#log").append(msg);
                console.log("Correct");
            }
        }
    });   
}

function reset(){
    lowBoundry = 1;
    highBoundry = 10000;
    $("#log").empty();
    var msg = $("<p> Give me a number. </p>").addClass("server msg");
    $("#log").append(msg);
    guess();
}