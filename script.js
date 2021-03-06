$(document).ready(function() {

	//what does this do?
	function convert_value_to_string(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		if (value === 1) {
			switch (value) {
				case 1:
				return 'Ace';
			}
		}
		return value.toString();
	}

	//what does this do? --> creates the deck as an array of objects, each of the suits array will have 13 numbers associated with it
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i < suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j < 13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
	
	//what does this do? --> shuffles the deck
	var shuffle = function(array) { 
		var copy = [];
		var n = array.length; 
		var i; 
		while (n) { i = Math.floor(Math.random() * array.length);  
			if (i in array) { 
		 		copy.push(array[i]); 
		 		delete array[i]; 
		 		n--; 
		 	} 
		} 
		return copy; 
	}

	deck = shuffle(deck);
	
	var cards_player_1 = [];
	var cards_player_2 = [];
	//divide out the cards into the two arrays
	for(var i = 0; i < deck.length; i++) {
	    if(i % 2 === 0) {
	        cards_player_1.push(deck[i]);
	    }else {
	        cards_player_2.push(deck[i]);
	    }
	}
	
	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	var player1;
	var player2;
	function war(card1, card2) {
		player1 = false;
		player2 = false;
		if(card1 > card2) {
			player1 = true;
		}else if(card1 < card2){
			player2 = true;
		}else {
			return false;
		}
	}
	
	// function tieWar(tie1, tie2) {
	// 	if(tie1 > tie2) {
	// 		player1 = true;
	// 	}else if (tie1 < tie2) {
	// 		player2 = true;
	// 	} else {

	// 	}
	// }
	
	
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	function play() {
		var card1 = cards_player_1.shift();
		var card2 =cards_player_2.shift();
		war(card1.number, card2.number);
		if(player1) {
			cards_player_1.push(card1, card2);
		}else if(player2) {
			cards_player_2.push(card2, card1);
		}else {
			cards_player_1.push(card1);
			cards_player_2.push(card2);
			// var four1 = cards_player_1.splice(0, 4);
			// var four2 = cards_player_2.splice(0, 4);
			// var n;
			// tie1 = four1[3].number;
			// tie2 = four2[3].number;
			// tieWar(tie1, tie2);
		}
		//this function (defined below) will continue to the next turn
		advance();
	}
	
	function advance() {
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		}
	}
	advance();
	
	$(".btn").click(function() {
		play();
	});
});
