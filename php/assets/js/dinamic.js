$(document).ready (function () {
	
	var page = '#index';

	var levelStage = [];

	//cookie's options  
	path : '/';
	domain: 'math.zzz.com.ua';
	secure: true;

	//delete
	//$.cookie('name', '', { expires: -1, path: '/' });
	//$.cookie('levelStage', '', { expires: -1, path: '/' });

	function funcBefore() {
		console.log('funcBefore ajax');
	}

	function saveCookie() {
		$.cookie('levelStage', JSON.stringify(levelStage), { expires: 7*7*7*7, path: '/' });
	}

	function setStage(i, val) {
		var value = val;
		if (value === null) {
			value = [{'desc' : 'true', 'area' : 'false', 'result' : 'false'}];
		}
		levelStage[i] = value[0];
		saveCookie();
	}

	function loadCookie() {
		if ($.cookie('levelStage') === undefined) {
			return undefined;
		} else {
			levelStage = JSON.parse($.cookie('levelStage'));
			return null;
		}
		
	}

	function checkCookie() {
		loadCookie();
		if (levelStage === undefined) {
			for (var i = levelNumber.length - 1; i >= 0; i--) {
				setStage(i, null);
			}
		} else {
			for (var i = levelNumber.length - 1; i >= 0; i--) {
				if (levelStage[i] === undefined) {
					setStage(i, null);
				}
			}
		}
		
		loadCookie();
	}

	function loadPage() {
		if (page.substring(1, 6) === 'level') {
			numLvl = page.substring(6,7);
			$("#currentLevel").val(numLvl);
			$(".lilvl" + numLvl).toggleClass("active");
			
			$(".category-title").empty();
			$(".theme").empty();
			$(".level").empty();
			$(".questions").empty();
			$(".use-numbers").empty();
			$(".operands").empty();
			$(".text-task").empty();

			var lvlData = levelNumber[numLvl - 1];
			$(".category-title").append(lvlData.categorytitle);
			$(".theme").append(lvlData.theme);
			$(".level").append(lvlData.level);
			$(".questions").append(lvlData.questions);
			$(".use-numbers").append(lvlData.usenumbers);
			$(".operands").append(lvlData.operands);
			$(".text-task").append(lvlData.texttask);

			$("div" + page.substring(0,6)).show();
		} else {
			$("div" + page).show();
		}
	}

	$('.link').bind("click", function () {

		if (page.substring(1, 6) === 'level') {
			$(".lilvl" + page.substring(6,7)).toggleClass("active");
			$("div" + page.substring(0,6)).hide();
		} else {
			$("div" + page).hide();
		}
		if ($(this).attr("id") == undefined) {
			page = $(this).attr("href");
		} else {
			page = "#" + $(this).attr("id");
		}
		loadPage();
	});

	loadPage();
	checkCookie();

});//doc.ready