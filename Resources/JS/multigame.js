var problem = document.getElementById('problem');
var box = document.getElementsByClassName('box');

var firstNum;
var secondNum;
var correctAnswer;
var answers = new Array();
var difficulty = true;
var numOfAnswers;

document.getElementById('newProblem').addEventListener('click', function() {
	randomInt();
});

document.getElementById('easy').addEventListener('click', function() {
	difficulty = false
	randomInt();
});

document.getElementById('hard').addEventListener('click', function() {
	difficulty = true
	randomInt();
});

for (var i = 0; i < box.length; i++) {
	box[i].addEventListener('click', function() {
		var num = this.innerHTML;
		if (num == correctAnswer) {
			problem.innerHTML = '<div id="correct">Correct!</div>';
			problem.innerHTML += firstNum + " x " + secondNum + " = " + correctAnswer;
		} else {
			this.style.visibility = "hidden";
		}
	});
}

(window.randomInt = function() {
	answers = [];
	reset();
	firstNum = Math.floor((Math.random() * 10) + 1);
	secondNum = Math.floor((Math.random() * 10) + 1);
	problem.innerHTML = firstNum + " x " + secondNum + " = ?";
	addAnswers();
	displayAnswers();
})();

function reset () {
	for (var i = 0; i < box.length; i++) {
		box[i].style.visibility = '';
	}
}

function addAnswers () {
	correctAnswer = firstNum*secondNum;

	if (difficulty == true) {
		numOfAnswers = 6;
		hardMode();
	} else {
		numOfAnswers = 3;
		easyMode(numOfAnswers);
	}

	answers.push(correctAnswer);

	for (var i = 1; i < numOfAnswers; i++) {
		var randomAnswer = Math.floor((Math.random() * 100) + 1);

		if (randomAnswer != correctAnswer && answers.indexOf(randomAnswer) == -1) {
			answers.push(randomAnswer);
		} else {
			i--
		}
	}
}

function displayAnswers () {
	var tempArray = new Array();
	for (var i = 0; i < answers.length; i++) {
		var randomOrder = Math.floor(Math.random()*answers.length);

		if (tempArray.indexOf(answers[randomOrder]) == -1) {
			box[i].innerHTML = answers[randomOrder];
			tempArray.push(Number(box[i].textContent));
		} else {
			i--
		}
		
	}
}

function easyMode (x) {
	for (var i = x; i < box.length; i++) {
		box[i].style.display = 'none';
	}
}

function hardMode () {
	for (var i = 0; i < box.length; i++) {
		box[i].style.display = 'inline-block';
	}
}
