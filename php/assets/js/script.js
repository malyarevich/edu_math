var elem = {
	pick: function(mode) {
		var picked = new Array(20);
		picked = elements;
		var randArr = elem.genRandArr();
		var disordered = new Array(20);
		for (var i = 0; i < 20; i++) {
			disordered[i] = Math.floor(Math.random() * picked.length);
		}
		return disordered;
	},

	pickSign: function(level) {
		var picked = new Array(20);
		switch (level) {
			case 2:
				picked = sign.slice(0, 2);
				break;
			case 3:
				picked = sign;
				break;				
			default:
				return false;
		}
		var disordered = new Array(20);
		for (var i = 0; i < 20; i++) {
			disordered[i] =  Math.floor(Math.random() * picked.length);
		};
		return disordered;
	},
	
	genRandArr: function() {
		// array 
		var arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
		var arr2 = [];
		while (arr1.length > 0) {
			var elem = arr1.splice(Math.random() * arr1.length << 0, 1);
			arr2.push(elem);
		}
		return arr2;
	},
	
	//level 1
	genQuestionL1: function(mode) {
		// pick 20 random element
		var qElem = elem.pick(mode);
		var questions = new Array(20);
		for (var i = 0; i < qElem.length; i++) {
			// Title type randomly generated numbers 0-5, see templatesL1(questions)
			var rand = Math.floor(Math.random() * 5);
			switch (rand) {
				case 0:
					var r = elem.genIncorrectElementId(qElem[i]);
					questions[i] = [
						templatesL1[0][0].replace("{{id}}", elements[qElem[i]]["id"]),
						elements[qElem[i]]["cn"],
						elements[r[0]]["cn"],
						elements[r[1]]["cn"],
						elements[r[2]]["cn"]
					];
					break;
				
				case 1:
					var r = elem.genIncorrectElementId(qElem[i]);
					questions[i] = [
						templatesL1[1][0].replace("{{sym}}", elements[qElem[i]]["sym"]),
						elements[qElem[i]]["cn"],
						elements[r[0]]["cn"],
						elements[r[1]]["cn"],
						elements[r[2]]["cn"]
					];
					console.log(qElem);
					console.log(elements);
					break;
				
				case 2:
					var r = elem.genIncorrectGroupElementId(qElem[i],elements[qElem[i]]["value"]%10);
					questions[i] = [
						templatesL1[2][0].replace(
								"{{group}}", 
								groups[elements[qElem[i]]["gid"]]).replace("{{value}}", 
								elements[qElem[i]]["value"]%10
							),
						elements[qElem[i]]["cn"],
						elements[r[0]]["cn"],
						elements[r[1]]["cn"],
						elements[r[2]]["cn"]
					];
					break;
				
				case 3:
					var r = elem.genIncorrectGroup(qElem[i]);
					questions[i] = [
						templatesL1[3][0].replace("{{sym}}", elements[qElem[i]]["sym"]),
						groups[elements[qElem[i]]["gid"]] + " and consist " + elements[qElem[i] % 10]["cn"],
						groups[elements[r[0][0]]["gid"]] + " and consist " + elements[r[0][1]]["cn"],
						groups[elements[r[1][0]]["gid"]] + " and consist " + elements[r[1][1]]["cn"],
						groups[elements[r[2][0]]["gid"]] + " and consist " + elements[r[2][1]]["cn"]
					];
					break;
				
				case 4:
					var r = elem.genIncorrectElementId(qElem[i]);
					questions[i] = [
						templatesL1[4][0].replace("{{cn}}", elements[qElem[i]]["cn"]),
						elements[qElem[i]]["sym"],
						elements[r[0]]["sym"],
						elements[r[1]]["sym"],
						elements[r[2]]["sym"]
					];
					break;
				
				default:
					// nothing to do
			}
		}
		return questions;
	},
	genIncorrectElementId: function(correctId) {
		var r = new Array(3);
		r[0] = Math.floor(Math.random() * 20);
		while (r[0] == correctId) {
			r[0] = Math.floor(Math.random() * 20);
		}
		r[1] = Math.floor(Math.random() * 20);
		while (r[1] == r[0] || r[1] == correctId) {
			r[1] = Math.floor(Math.random() * 20);
		}
		r[2] = Math.floor(Math.random() * 20);
		while (r[2] == r[1] || r[2] == r[0] || r[2] == correctId) {
			r[2] = Math.floor(Math.random() * 20);
		}
		return r;
	},
	genIncorrectGroup: function(correctId) {
		var r = new Array(3);
		r[0] = new Array(2);
		r[0][0] = Math.floor(Math.random() * 20);
		r[0][1] = r[0][0] % 10;
		while (r[0] == correctId || r[0] % 10 == correctId % 10) {
			r[0][0] = Math.floor(Math.random() * 20);
			r[0][1] = r[0][0] % 10;
		}
		r[1] = new Array(2);
		r[1][0] = Math.floor(Math.random() * 20);
		r[1][1] = r[1][0] % 10;
		while (r[1] == r[0] || r[1] == correctId || r[0] % 10 == correctId % 10) {
			r[1][0] = Math.floor(Math.random() * 20);
			r[1][1] = r[1][0] % 10;
		}
		r[2] = new Array(2);
		r[2][0] = Math.floor(Math.random() * 20);
		r[2][1] = r[2][0] % 10;
		while (r[2] == r[1] || r[2] == r[0] || r[2] == correctId || r[0] % 10 == correctId % 10) {
			r[2][0] = Math.floor(Math.random() * 20);
			r[2][1] = r[2][0] % 10;
		}
		return r;
	},
	genIncorrectGroupElementId: function(correctId, consis) {
		var r = new Array(3);
		r[0] = Math.floor(Math.random() * 20);
		while (r[0] == correctId || r[0] % 10 == consis) {
			r[0] = Math.floor(Math.random() * 20);
		}
		r[1] = Math.floor(Math.random() * 20);
		while (r[1] == r[0] || r[1] == correctId || r[1] % 10 == consis) {
			r[1] = Math.floor(Math.random() * 20);
		}
		r[2] = Math.floor(Math.random() * 20);
		while (r[2] == r[1] || r[2] == r[0] || r[2] == correctId || r[2] % 10 == consis) {
			r[2] = Math.floor(Math.random() * 20);
		}
		return r;
	},

	//level 2
	genQuestionL2: function(mode) {
		// pick 20 random element
		var qElem = elem.pick();
		var qElem2 = elem.pick();
		var qSign = elem.pickSign(2);		
		var questions = new Array(20);
		for (var i = 0; i < qElem.length; i++) {
			// Title type randomly generated numbers 0-4, see templatesL1(questions)
			var rand = Math.floor(Math.random() * 4);
			switch (rand) {
				case 0: //"{{id1}} {{sign}} {{id2}} = ", "{{answ}}"
					var answer = elem.solveExample(qElem[i], sign[qSign[i]]["id"], qElem2[i]);
					var r = elem.genIncorrectAnswer(answer);
					var temp = templatesL3[0][0].replace("{{id1}}", elements[qElem[i]]["id"]);
						temp = temp.replace("{{sign}}", sign[qSign[i]]["sym"]);
						temp = temp.replace("{{id2}}", elements[qElem2[i]]["id"]);
					questions[i] = [
						temp,
						answer,
						r[0],
						r[1],
						r[2]
					];
					break;
				
				case 1://"{{cn1}} {{sign}} {{id2}} = ", "{{answ}}"
					var answer = elem.solveExample(qElem[i], sign[qSign[i]]["id"], qElem2[i]);
					var r = elem.genIncorrectAnswer(i);
					var temp = templatesL3[1][0].replace("{{cn1}}", elements[qElem[i]]["cn"]);
						temp = temp.replace("{{sign}}", sign[qSign[i]]["sym"]);
						temp = temp.replace("{{id2}}", elements[qElem2[i]]["id"]);
					questions[i] = [
						temp,
						answer,
						r[0],
						r[1],
						r[2]
					];
					break;
				
				case 2://"{{id1}} {{sign}} {{cn2}} = ", "{{answ}}"
					var answer = elem.solveExample(qElem[i], sign[qSign[i]]["id"], qElem2[i]);
					var r = elem.genIncorrectAnswer(i);
					var temp = templatesL3[2][0].replace("{{id1}}", elements[qElem[i]]["id"]);
						temp = temp.replace("{{sign}}", sign[qSign[i]]["sym"]);
						temp = temp.replace("{{cn2}}", elements[qElem2[i]]["cn"]);
					questions[i] = [
						temp,
						answer,
						r[0],
						r[1],
						r[2]
					];
					break;
				
				case 3://"{{cn1}} {{sign}} {{cn2}} = ", "{{answ}}"
					var answer = elem.solveExample(qElem[i], sign[qSign[i]]["id"], qElem2[i]);
					var r = elem.genIncorrectAnswer(i);
					var temp = templatesL3[3][0].replace("{{cn1}}", elements[qElem[i]]["cn"]);
						temp = temp.replace("{{sign}}", sign[qSign[i]]["sym"]);
						temp = temp.replace("{{cn2}}", elements[qElem2[i]]["cn"]);
					questions[i] = [
						temp,
						answer,
						r[0],
						r[1],
						r[2]
					];
					break;
								
				default:
					// nothing to do
			}
		}
		return questions;
	},
	genIncorrectAnswer: function(correctAnswer) {
		var r = new Array(3);
		r[0] = Math.floor(Math.random() * 50);
		while (r[0] == correctAnswer) {
			r[0] = Math.floor(Math.random() * 50);
		}
		r[1] = Math.floor(Math.random() * 100);
		while (r[1] == r[0] || r[1] == correctAnswer) {
			r[1] = Math.floor(Math.random() * 100);
		}
		r[2] = Math.floor(Math.random() * 200);
		while (r[2] == r[1] || r[2] == r[0] || r[2] == correctAnswer) {
			r[2] = Math.floor(Math.random() * 200);
		}
		return r;
	},
	solveExample: function(num1, sign, num2) {
		var answ;
		switch (sign) {
			case 0:
				answ = num1 + num2;
				break;
			case 1:
				answ = num1 - num2;
				break;
			case 2:
				answ = num1 * num2;
				break;
			case 3:
				answ = num1 / num2;
				break;
				
			default:
				return false;
		}
		return answ;
	},

	//level 3
	genQuestionL3: function(mode) {
		// pick 20 random element
		var qElem = elem.pick();
		var qElem2 = elem.pick();
		var qSign = elem.pickSign(3);
		var questions = new Array(20);
		for (var i = 0; i < qElem.length; i++) {
			// Title type randomly generated numbers 0-8, see templatesL1(questions)
			var rand = Math.floor(Math.random() * 8);
			switch (rand) {
				case 0: //"{{id1}} {{sign}} {{id2}} = ", "{{answ}}"
					var answer = elem.solveExample(qElem[i], sign[qSign[i]]["id"], qElem2[i]);
					var r = elem.genIncorrectAnswer(answer);
					var temp = templatesL3[0][0].replace("{{id1}}", elements[qElem[i]]["id"]);
						temp = temp.replace("{{sign}}", sign[qSign[i]]["sym"]);
						temp = temp.replace("{{id2}}", elements[qElem2[i]]["id"]);
					questions[i] = [
						temp,
						answer,
						r[0],
						r[1],
						r[2]
					];
					break;
				
				case 1://"{{cn1}} {{sign}} {{id2}} = ", "{{answ}}"
					var answer = elem.solveExample(qElem[i], sign[qSign[i]]["id"], qElem2[i]);
					var r = elem.genIncorrectAnswer(i);
					var temp = templatesL3[1][0].replace("{{cn1}}", elements[qElem[i]]["cn"]);
						temp = temp.replace("{{sign}}", sign[qSign[i]]["sym"]);
						temp = temp.replace("{{id2}}", elements[qElem2[i]]["id"]);
					questions[i] = [
						temp,
						answer,
						r[0],
						r[1],
						r[2]
					];
					break;
				
				case 2://"{{id1}} {{sign}} {{cn2}} = ", "{{answ}}"
					var answer = elem.solveExample(qElem[i], sign[qSign[i]]["id"], qElem2[i]);
					var r = elem.genIncorrectAnswer(i);
					var temp = templatesL3[2][0].replace("{{id1}}", elements[qElem[i]]["id"]);
						temp = temp.replace("{{sign}}", sign[qSign[i]]["sym"]);
						temp = temp.replace("{{cn2}}", elements[qElem2[i]]["cn"]);
					questions[i] = [
						temp,
						answer,
						r[0],
						r[1],
						r[2]
					];
					break;
				
				case 3://"{{cn1}} {{sign}} {{cn2}} = ", "{{answ}}"
					var answer = elem.solveExample(qElem[i], sign[qSign[i]]["id"], qElem2[i]);
					var r = elem.genIncorrectAnswer(i);
					var temp = templatesL3[3][0].replace("{{cn1}}", elements[qElem[i]]["cn"]);
						temp = temp.replace("{{sign}}", sign[qSign[i]]["sym"]);
						temp = temp.replace("{{cn2}}", elements[qElem2[i]]["cn"]);
					questions[i] = [
						temp,
						answer,
						r[0],
						r[1],
						r[2]
					];
					break;
				
				case 4: //"{{id1}} {{sign}} {{id2}} = ", "{{answ}}"
					var answer = elem.solveExample(qElem[i], sign[qSign[i]]["id"], qElem2[i]);
					var r = elem.genIncorrectAnswer(answer);
					var temp = templatesL3[0][0].replace("{{id1}}", elements[qElem[i]]["id"]);
						temp = temp.replace("{{sign}}", sign[qSign[i]]["cn"]);
						temp = temp.replace("{{id2}}", elements[qElem2[i]]["id"]);
					questions[i] = [
						temp,
						answer,
						r[0],
						r[1],
						r[2]
					];
					break;
				
				case 5://"{{cn1}} {{sign}} {{id2}} = ", "{{answ}}"
					var answer = elem.solveExample(qElem[i], sign[qSign[i]]["id"], qElem2[i]);
					var r = elem.genIncorrectAnswer(i);
					var temp = templatesL3[1][0].replace("{{cn1}}", elements[qElem[i]]["cn"]);
						temp = temp.replace("{{sign}}", sign[qSign[i]]["cn"]);
						temp = temp.replace("{{id2}}", elements[qElem2[i]]["id"]);
					questions[i] = [
						temp,
						answer,
						r[0],
						r[1],
						r[2]
					];
					break;
				
				case 6://"{{id1}} {{sign}} {{cn2}} = ", "{{answ}}"
					var answer = elem.solveExample(qElem[i], sign[qSign[i]]["id"], qElem2[i]);
					var r = elem.genIncorrectAnswer(i);
					var temp = templatesL3[2][0].replace("{{id1}}", elements[qElem[i]]["id"]);
						temp = temp.replace("{{sign}}", sign[qSign[i]]["cn"]);
						temp = temp.replace("{{cn2}}", elements[qElem2[i]]["cn"]);
					questions[i] = [
						temp,
						answer,
						r[0],
						r[1],
						r[2]
					];
					break;
				
				case 7://"{{cn1}} {{sign}} {{cn2}} = ", "{{answ}}"
					var answer = elem.solveExample(qElem[i], sign[qSign[i]]["id"], qElem2[i]);
					var r = elem.genIncorrectAnswer(i);
					var temp = templatesL3[3][0].replace("{{cn1}}", elements[qElem[i]]["cn"]);
						temp = temp.replace("{{sign}}", sign[qSign[i]]["cn"]);
						temp = temp.replace("{{cn2}}", elements[qElem2[i]]["cn"]);
					questions[i] = [
						temp,
						answer,
						r[0],
						r[1],
						r[2]
					];
					break;

				default:
					// nothing to do
			}
		}
		return questions;
	}
};

var score, q, count, tm, currentLevel;
var game = {
	start: function(mode) {
		score = [0, 0, 0];
		switch (currentLevel) {
			case "1":
				q = elem.genQuestionL1(mode);
				break;
			case "2":
				q = elem.genQuestionL2(mode);
				break;
			case "3":				
				q = elem.genQuestionL3(mode);
				break;
				
			default:
				return false;
		}		
		
		count = 0;
		$('#score-bar').slideDown();
		$('#correct-bar').css('width', 0);
		$('#incorrect-bar').css('width', 0);
		$('#timeout-bar').css('width', 0);
		
		// generate question content
		$('#game-area').show();
		$('#game-desc').hide();
		$('#result').hide();
		$('#aboutInfo').hide();

		switch (mode) {
			case 0:
				tm = 15000;
				break;
			case 1:
				tm = 10000;
				break;
			case 2:				
				tm = 5000;
				break;
				
			default:
				return false;
		}
		
		game.next();
	},
	next: function() {
		if (count < 20) {
			$('#question-text').text(q[count][0]);
			$('#game-area .option').removeClass('correct-option').removeClass('incorrect-option');
			// Correct options
			var correctOption = Math.floor(Math.random() * 4);
			$('#game-area .option').eq(correctOption).text(q[count][1]).addClass('correct-option');
			// Interference Options
			var j = 2;
			for (var i = 0; i < 4; i++) {
				if (i != correctOption) {
					$('#game-area .option').eq(i).text(q[count][j++]).addClass('incorrect-option');
				}
			}
			
			//Time in milliseconds
			timer.start(tm);
			count++;
		} else {
			game.end();
		}
	},
	end: function() {
		$('#correct-option').off('click');
		$('.incorrect-options').off('click');
		$(document).off('keydown');
		
		$('#game-area').hide();
		$('#result').show();
		$('#aboutInfo').show();
		$('#testNumber').text(currentLevel);
		var resInfo = game.results();
		$('#valRes').append(resInfo);
	},
	
	correct: function() {
		$('#correct-bar').animate({width: (++score[0] * 5) + '%'}, 200);
		timer.break(true);
		game.next();
	},
	incorrect: function() {
		$('#incorrect-bar').animate({width: (++score[1] * 5) + '%'}, 200);
		timer.break(false);
		game.next();
	},
	timeout: function() {
		$('#timeout-bar').animate({width: (++score[2] * 5) + '%'}, 200);
		game.next();
	},
	
	results: function() {
		var grade;
		if (score[0] > 19) {
			grade = "<text class=\"bg-success\">Excellent! </text>\n";
		}
		else if (score[0] > 14) {
			grade = "<text class=\"bg-success\">Good job! </text>\n";
		} else if (score[0] > 9) {
			grade = "<text class=\"bg-warning\">Not bad! </text>\n";
		} else {
			grade = "<text class=\"bg-danger\">You can do better! </text><br>";
		};
		grade = grade + '<text class=\".text-info\">You have responded to the tests as follows:</text>\n' + '<ul class="list-group">\n\t<li class=\"list-group-item list-group-item-success\">' + '<span class=\"badge\">' + score[0] + '</span>Correct answer: </li>\n' + '\t<li class=\"list-group-item list-group-item-danger\">' + '<span class=\"badge\">' + score[1] + '</span> Incorrect answer: </li>\n' + '\t<li class=\"list-group-item list-group-item-warning\">' + '<span class=\"badge\">' + score[2] + '</span> We run out of time: </li>\n</ul>';
		return grade;
	},

	listen: function() {
		// Delegate to the option clicked event
		$(document).on('click', '.correct-option', function() {
			game.correct();
		});
		$(document).on('click', '.incorrect-option', function() {
			game.incorrect();
		});
		// Principal keyboard events
		$(document).on('keydown', function(e) {
			switch (e.keyCode) {
				case 49:
					// 1
					break;
				case 50:
					// 2
					break;
				case 51:
					// 3
					break;
				case 52:
					// 4
					break;
					
				case 97:
					// num 1
					break;
				case 98:
					// num 2
					break;
				case 99:
					// num 3
					break;
				case 100:
					// num 4
					break;
				
				default:
					// nothing to do
			}
		});
	}
};

var timerHandler;
var timer = {
	start: function(timeout) {
		$('#time-bar').css('width', '100%');
		timerHandler = setTimeout("game.timeout();", timeout);
		$('#time-bar').animate({width: '0%'}, timeout, 'linear', function() {
			$('#time-bar').css('width', '100%');
		});
	},
	break: function() {
		clearTimeout(timerHandler);
		$('#time-bar').stop().css('width', '100%');
	}
};

jQuery(document).ready(function($) {
	game.listen();
	jQuery('.mode1').on('click',function() {
		currentLevel = jQuery('#currentLevel').val();
		game.start(0);
	});
	jQuery('.mode2').on('click',function() {
		currentLevel = jQuery('#currentLevel').text();
		game.start(1);
	});
	jQuery('.mode3').on('click',function() {
		currentLevel = jQuery('#currentLevel').text();
		game.start(2);
	});
});
/*jQuery(document).ready(function($) {
	game.listen()
		jQuery('#mode1').click(function() {
			game.start(0);
		}
	)
});*/