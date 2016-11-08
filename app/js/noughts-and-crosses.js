;"use strict";

window.nac = (function() {

	// game config
	var config = {
		currentPlayer: null,
		playerDetails: [
			{
				name: 'Player 1',
				wins: 0,
				type: 'noughts'
			},
			{
				name: 'Player 2',
				wins: 0,
				type: 'crosses'
			}
		]
	};

	// element store
	var elems = {};

	var bindElements = function() {
		elems.form = document.querySelector('form');
		elems.turnIndicator = document.getElementById('turn-indicator');
		elems.gameTable = document.getElementById('game-table');
		elems.cells = elems.gameTable.querySelectorAll('td');
	};

	var bindEvents = function() {
		elems.form.addEventListener('submit', function(event) {
			event.preventDefault();
			setupGame();
			return false;
		});
		elems.cells.forEach(function(element) {
			element.addEventListener('click', function(event) {
				if (
					!joose.utils.hasClass(event.target, 'noughts') &&
					!joose.utils.hasClass(event.target, 'crosses')
				) {
					var type = config.playerDetails[config.currentPlayer - 1].type;
					joose.utils.addClass(event.target, type);
					event.target.innerHTML = (type === 'noughts' ? 'nought' : 'cross');
					endTurn();
					checkForWin();
					startTurn();
				}
			});
		});
	};

	var startTurn = function( ){
		var playerName = config.playerDetails[config.currentPlayer - 1].name;
		document.title = playerName + '\'s turn - Noughts and crosses';
		elems.turnIndicator.innerHTML = playerName;
	}
	var endTurn = function() {
		setNextPlayer();
	}
	var checkForWin = function() {
		// check for win
	};

	var setNextPlayer = function() {
		config.currentPlayer = (config.currentPlayer === 1) ? 2 : 1;
	}

	var setupGame = function() {
		//clearPreviousGame();
		joose.utils.addClass(elems.form, 'visually-hidden');
		//getPlayerDetails();
		joose.utils.removeClass(elems.gameTable, 'visually-hidden');
		setNextPlayer();
		startTurn();
	};

	// private methods
	var init = function() {
		bindElements();
		bindEvents();
	}

	// public methods
	return {
		init: init
	};

})();

nac.init();