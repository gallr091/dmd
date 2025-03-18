	
	/* LIST OF VARIABLES */	
	
	var questionState = 0;	//Keeps track of users place in quiz
	var quizActive = true;	//True until last question is answered
		
	var userStats =	[
						0,	//rev
						0, 	//joke
						0, 	//shop
						0, 	//only 
						0, 	//vig 
						0,  //365
            0,  //elusive
            0,  //art
            0,  //romantic
            0 //nature
					];
	
	var tempStats = userStats; //Holds stat increases relating to user selection
	
	/* QUIZ BUILDING VARIABLES */
	
	//The following array contains all question text elements
	
	var questionText =	[															
							"If chairs weren’t used for sitting, what would you use them for?", 	//q1
							"Your cup overflows. What’s it filled with?", 					//q2
							"If you could only wear one thing for the rest of your life, what would it be?", 	//q3
							"The patterns keep repeating, endlessly... what do you see?", 				//q4
							"Your sword is drawn. What are you protecting?"			//q6
						];
	
	//The following array contains all answer text elements for each question
	
	var answerText =	[		//question 1 answers													
							[	"A", 				
								"B", 
								"C",
								"D",
								"E"],							
								
								//question 2 answers
							[	"A", 				
								"B", 
								"C",
								"D",
								"E"],
								
								//question 3 answers
							[	"A", 				
								"B", 
								"C",
								"D",
								"E"],
								
								//question 4 answers
							[	"A", 				
								"B", 
								"C",
								"D",
								"E"],
								
								//question 5 answers
							[	"A", 				
								"B", 
								"C",
								"D",
								"E"]
						]
	
	//The following array contains all personality stat increments for each answer of every question
	
	var answerValues =    [        //question 1 answer values
		[    [0,1,0,0,0,2,0,0,1,0],         
			[0,0,1,0,0,0,0,2,0,0],        
			[0,0,0,2,0,0,0,0,0,0],
			[2,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,1,0,1,0,0,2]
		],    
	
			//question 2 answer values
		[    [0,1,0,0,0,0,1,2,0,0],         
			[1,0,0,0,0,2,0,0,1,0],        
			[0,0,0,2,0,0,0,0,0,0],
			[0,0,0,0,1,0,0,0,0,2],
			[0,0,2,0,0,0,0,0,0,0]
		],

			//question 3 answer values
		[    [0,0,0,0,0,0,1,0,2,0],         
			[0,0,0,0,0,0,0,1,0,2],        
			[0,0,2,0,0,1,0,0,0,0],
			[2,0,0,0,1,0,0,0,0,0],
			[0,1,0,2,0,0,0,0,0,0]
		],
			
			//question 4 answer values
		[    [1,0,0,0,0,2,0,0,0,0],         
			[0,0,0,0,2,0,0,0,0,0],        
			[0,2,0,0,0,0,0,1,1,0],
			[0,0,0,1,0,0,0,0,0,2],
			[0,0,1,0,0,0,2,0,0,0] 
		],
			
			//question 5 answer values
		[   [0,0,1,2,0,0,0,0,0,0],         
			[0,0,0,0,0,1,2,1,0,0],        
			[0,1,0,0,2,0,0,0,1,0],
			[0,0,0,0,0,0,0,0,0,2],
			[2,0,0,0,0,0,0,0,0,0]
		]
	]
	
	/* SHORTCUT VARIABLES */
	//so I don't have to keep typing

	var results = document.getElementById("results");
	var quiz = document.getElementById("quiz");
	var body = document.body.style;
	var printResult = document.getElementById("topScore");
	var buttonElement = document.getElementById("button");
	var details = document.getElementById("details");
	var description = document.getElementById("description");
	var resultImg = document.getElementById("resultImg");

	
	/* QUIZ FUNCTIONALITY */
	
	buttonElement.addEventListener("click", changeState);	//Add click event listener to main button
	
	/* This function progresses the user through the quiz */
	
	function changeState() {								
		
		updatePersonality(); 	//Adds the values of the tempStats to the userStats										
		
		if (quizActive) {	
			
			/*True while the user has not reached the end of the quiz */
			
			initText(questionState);	//sets up next question based on user's progress through quiz
			questionState++;			//advances progress through quiz
			
			buttonElement.disabled = true; //disables button until user chooses next answer
			buttonElement.innerHTML = "Please select an answer";			
			buttonElement.style.opacity = 0.7;
			
		} else {
			
			/*All questions answered*/
			
			setCustomPage(); //runs set up for result page
		}
	}
	
	/* This function determines the question and answer content based on user progress through the quiz */

	function initText(question) {							
		
		var answerSelection = ""; //text varialbe containting HTML code for the radio buttons' content
		
		/* Creates radio buttons based on user progress through the quiz - current 'id' generation is not w3c compliant*/
		
		for (i = 0; i < answerText[question].length; i++) {		
			
			answerSelection += "<li><input type='radio' name='question" +
			(question+1) + "' onClick='setAnswer("+i+")' id='" + answerText[question][i] + "'><label for='" + answerText[question][i] + "'>" + answerText[question][i] + "</label></li>";
		}
		
		document.getElementById("questions").innerHTML = questionText[question];	//set question text
		document.getElementById("answers").innerHTML = answerSelection;				//set answer text
	}
	
	/* This function is called when a user selects an answer, NOT when answer is submitted */
	
	function setAnswer(input) {
				
		clearTempStats();									//clear tempStats in case user reselects their answer
		
		tempStats = answerValues[questionState-1][input];	//selects personality values based on user selection 
				
		if (questionState < questionText.length) {
			
			/*True while the user has not reached the end of the quiz */
			
			buttonElement.innerHTML = "Continue";
			buttonElement.disabled = false;
			buttonElement.style.opacity = 1;
					
		} else {
			
			/*All questions answered - QUESTION TIME IS OVER!*/
			
			quizActive = false;
			buttonElement.innerHTML = "GET YOUR SNUFF BOX"
			buttonElement.disabled = false;
			buttonElement.style.opacity = 1;
		}
	}
	
	/* This function sets tempStats to 0 */
	
	function clearTempStats() {
		
		tempStats = [0,0,0,0,0,0,0,0,0,0];	
	}
	
	/*This function adds the values of the tempStats to the userStats based on user selection */
	
	function updatePersonality() {
		
		for (i = 0; i < userStats.length ; i++) {
			userStats[i] += tempStats[i];
		}
	}
	
	/* This function determines the highest personality value */
	
	function setCustomPage() {
		
		var highestStatPosition = 0;	//highest stat defaults as 'cute'
		
		/* This statement loops through all personality stats and updates highestStatPosition based on a highest stat */
		
		for (i = 1 ; i < userStats.length; i++) {
			
			if (userStats[i] > userStats[highestStatPosition]) {
				highestStatPosition = i;
			}
		}
		
		displayCustomPage(highestStatPosition); //passes the index value of the highest stat discovered
		
		/* Hides the quiz content, shows results content */
		quiz.style.display = "none";		
	}
	
	/* BUILDS WEB PAGE AS PER RESULTS OF THE QUIZ */
	
	/* The following code manipulates the CSS based on the personality results */
			
	function displayCustomPage(personality) {
		switch (personality) {
			
			case 0:	//Revolutionay
				results.style.display = "inline-block";
				// results.classList.add("cute");
				body.backgroundColor = "#7FE700";
				// body.backgroundImage = "url('http://www.geocities.ws/dopeycodes/backgrounds/stars-pi.gif')";
				// body.backgroundRepeat = "repeat";
				// body.cursor = "url(https://web.archive.org/web/20090830074921/http://www.geocities.com/anneli1970/hkanicursor.gif), auto";

				// Create an <img> element
				var img = document.createElement("img");
				img.src = "assets/result-revolutionary.png"; // Change this to your image path
				img.alt = "The Revolutionary";
				img.style.height = "20%";
				img.style.width = "20%"; // Adjust width as needed

				// Append the <img> inside <picture>
				resultImg.appendChild(img);

				printResult.innerText = "The Revolutionary";
				details.innerText = "156. Meissen, Germany. 1740";
				description.innerText = "You are Robin Hood, the voice of the people. Your fervent energy marches brave souls to the battle line. You are not afraid of anything, and your heart pumps to the rallying cry of revolution. The time is now.";
				break;
				
			case 1:		//joker
				results.style.display = "inline-block";
				// results.classList.add("spooky");
				body.backgroundColor = "#7FE700";

					// Create an <img> element\
					var img = document.createElement("img");
					img.src = "assets/result-joker.png"; // Change this to your image path
					img.alt = "The Joker";
					img.style.height = "20%";
					img.style.width = "20%"; // Adjust width as needed
	
					// Append the <img> inside <picture>
					resultImg.appendChild(img);

				// body.backgroundImage = "url('https://web.archive.org/web/20090805212330/http://www.geocities.com/alecbay/evilbackground.gif')";
				// body.backgroundRepeat = "repeat";
				// body.cursor = "url(https://web.archive.org/web/20091026222418/http://www.geocities.com/evil_empire_uo/demon.gif), auto";
				printResult.innerText = "The Joker";
				details.innerText = "83. St Petersburg, Russia 1760";
				description.innerText = "You are the class clown who isn't afraid to be cheeky (pardon the pun). You are the funniest person in the room. When people look at you, they erupt into laughter.";
				break;
				
			case 2:		//shopaholic
				results.style.display = "inline-block";
				// results.classList.add("lame");
				body.backgroundColor = "#7FE700";
				// body.cursor = "url(https://web.archive.org/web/20091027003810/http://ca.geocities.com/EverlastingIllusions/Miscellanous/Cursor9.gif), auto";

				// Create an <img> element
				var img = document.createElement("img");

				img.src = "assets/result-shopaholic.png"; // Change this to your image path
				img.alt = "The Shopaholic";
				img.style.height = "20%";
				img.style.width = "20%"; // Adjust width as needed

				// Append the <img> inside <picture>
				resultImg.appendChild(img);

				printResult.innerText = "The Shopaholic";
				details.innerText ="7. Chantilly, France 1700-1800";
				description.innerText= "Marie Antoinette let them eat cake so you could devour it, darling. you like the finer things and the bigger bling.";
				break;
				
			case 3:		//only child
				results.style.display = "inline-block";
				// results.classList.add("nerdy");
				body.backgroundColor = "#7FE700";
				// body.background = "none";
				// body.backgroundImage = "url('https://www.dailydot.com/wp-content/uploads/fb5/e4/0ee32ed1e94e79d7d53d7be26bec7aa1.jpg')";
				body.backgroundSize = "100% auto";
				// body.cursor = "url(https://web.archive.org/web/20090820061156/http://geocities.com/Tokyo/Club/8802/pikacursor.gif), auto";

				// Create an <img> element
				var img = document.createElement("img");

				img.src = "assets/result-onlychild.png"; // Change this to your image path
				img.alt = "The Only Child";
				img.style.height = "20%";
				img.style.width = "20%"; // Adjust width as needed

				// Append the <img> inside <picture>
				resultImg.appendChild(img);

				printResult.innerText = "The Only Child";
				details.innerText = "94. Meissen, Germany. 1735";
				description.innerText = "You have redefined the meaning of meaning of only child. You are mummy's little meatball. In your past life, you were the dog of a 20 year old who truly believed that they birthed you, and your days were filled with overbearing hugs.";
				break;
				
			case 4:		//Vigil
				results.style.display = "inline-block";
				// results.classList.add("silly");
				body.backgroundColor = "#7FE700";
				// body.backgroundImage = "url('https://web.archive.org/web/20091026075928/http://geocities.com/MotorCity/Pit/2600/pic/rainbow.gif')";
				// body.backgroundRepeat = "repeat";
				// // body.cursor = "url(https://web.archive.org/web/20090731114836/http://hk.geocities.com/godofcat/mcmug/cursor1p2.gif), auto";

				// Create an <img> element
				var img = document.createElement("img");

				img.src = "assets/result-vigilante.png"; // Change this to your image path
				img.alt = "The Vigilante";
				img.style.height = "20%";
				img.style.width = "20%"; // Adjust width as needed

				// Append the <img> inside <picture>
				resultImg.appendChild(img);

				printResult.innerText = "The Vigilante";
				details.innerText = "51. Porcelain. Mennacy, France.  1700-1800";
				description.innerText = "You know your whiskers from your ears. you know night from day. You sleep with one eye open because you know one slip up could cost you your sanity.";
				break;
				
			case 5:		//365
				results.style.display = "inline-block";
				// results.classList.add("cool");
				body.backgroundColor = "#7FE700";
				// body.background = "none";
				// body.backgroundImage = "url('https://web.archive.org/web/20091027004451/http://hk.geocities.com/cs_unknowman/Background/background.gif')";
				// body.backgroundRepeat = "repeat";
				// body.cursor = "url(https://web.archive.org/web/20091026232535/http://www.geocities.com/john_miles_the_cucumber/arnoldcursorpreview.gif), auto";

					// Create an <img> element
					var img = document.createElement("img");

					img.src = "assets/result-party.png"; // Change this to your image path
					img.alt = "The 365 Party Girl";
					img.style.height = "20%";
					img.style.width = "20%"; // Adjust width as needed
	
					// Append the <img> inside <picture>
					resultImg.appendChild(img);

				printResult.innerText = "The 365 Party Girl";
				details.innerText = "106. Frankenthal, Germany. 1700-1800";
				description.innerText = "If music be the food of love, play on, for you are the hedonist, the 365 party girl! All the bards in the land want your digits, you are the talk of the town.";
				break;
        
        			case 6:		//elusive
				results.style.display = "inline-block";
				// results.classList.add("cool");
				body.backgroundColor = "#7FE700";
				// body.background = "none";
				// body.backgroundImage = "url('https://web.archive.org/web/20091027004451/http://hk.geocities.com/cs_unknowman/Background/background.gif')";
				// body.backgroundRepeat = "repeat";
				// body.cursor = "url(https://web.archive.org/web/20091026232535/http://www.geocities.com/john_miles_the_cucumber/arnoldcursorpreview.gif), auto";

					// Create an <img> element
					var img = document.createElement("img");

					img.src = "assets/result-elusive.png"; // Change this to your image path
					img.alt = "The Elusive";
					img.style.height = "20%";
					img.style.width = "20%"; // Adjust width as needed
	
					// Append the <img> inside <picture>
					resultImg.appendChild(img);

				printResult.innerText = "The Elusive";
				details.innerText = "41. Porcelain. Meissen, Germany. 1750.";
				description.innerText = "You are the elusive, the fly on the wall. So much more can be learned through observation than participation. Often found in a nook, cranny, bush, or the dark, you prefer to be neither seen nor heard, but to always be... present.";
				break;
        
        			case 7:		//artist
				results.style.display = "inline-block";
				// results.classList.add("cool");
				// body.background = "none";
				body.backgroundColor = "#7FE700";
				// body.backgroundImage = "url('https://web.archive.org/web/20091027004451/http://hk.geocities.com/cs_unknowman/Background/background.gif')";
				// body.backgroundRepeat = "repeat";
				// body.cursor = "url(https://web.archive.org/web/20091026232535/http://www.geocities.com/john_miles_the_cucumber/arnoldcursorpreview.gif), auto";

				// Create an <img> element
				var img = document.createElement("img");

				img.src = "assets/result-artist.png"; // Change this to your image path
				img.alt = "The Tortured Artist";
				img.style.height = "20%";
				img.style.width = "20%"; // Adjust width as needed

				// Append the <img> inside <picture>
				resultImg.appendChild(img);

				printResult.innerText = "The Tortured Artist";
				details.innerText = "136. Buen Retiro, Spain.1700-1800.";
				description.innerText = "When you entered this world, you sung a song so sweet even the rats cried. You are a tortured artist, you tap into frequencies higher than most can hear. It torments you to be confined to physicality when you are destined for cosmic greatness.";
				break;
        
        			case 8:		//hopeless 
				results.style.display = "inline-block";
				// results.classList.add("cool");
				body.background = "none";
				body.backgroundColor = "#7FE700";
				// body.backgroundImage = "url('https://web.archive.org/web/20091027004451/http://hk.geocities.com/cs_unknowman/Background/background.gif')";
				// body.backgroundRepeat = "repeat";
				// body.cursor = "url(https://web.archive.org/web/20091026232535/http://www.geocities.com/john_miles_the_cucumber/arnoldcursorpreview.gif), auto";

				// Create an <img> element
				var img = document.createElement("img");

				img.src = "assets/result-romantic.png"; // Change this to your image path
				img.alt = "The Hopeless Romantic";
				img.style.height = "20%";
				img.style.width = "20%"; // Adjust width as needed

				// Append the <img> inside <picture>
				resultImg.appendChild(img);

				printResult.innerText = "The Hopeless Romantic";
				details.innerText = "44. Meissen, Germany, 1725-1730";
				description.innerText = "You roam the earth seeking your twin flame. Who needs snuff when love is the drug?  You crave your happily ever after, but in this cruel world, your desire is suppressed. Keep searching, hopeless romantic.";

				break;
        
        			case 9:		//nature
				results.style.display = "inline-block";
				// results.classList.add("cool");
				body.background = "none";
				body.backgroundColor = "#7FE700";
				// body.backgroundImage = "url('https://web.archive.org/web/20091027004451/http://hk.geocities.com/cs_unknowman/Background/background.gif')";
				// body.backgroundRepeat = "repeat";
				// body.cursor = "url(https://web.archive.org/web/20091026232535/http://www.geocities.com/john_miles_the_cucumber/arnoldcursorpreview.gif), auto";

					// Create an <img> element
					var img = document.createElement("img");

					img.src = "assets/result-naturalist.png"; // Change this to your image path
					img.alt = "The Naturalist";
					img.style.height = "20%";
					img.style.width = "20%"; // Adjust width as needed
	
					// Append the <img> inside <picture>
					resultImg.appendChild(img);


				printResult.innerText = "The Naturalist";
				details.innerText = "55. Porcelain. Meissen, Germany.1756.";
				description.innerText = "You , the naturalist, are the salt of the earth. the soil between your toes is your idea of ecstasy, and you probably haven’t showered in a week to honor your natural odors. The wind in the trees is your Spotify playlist.";
				break;
				
			default: 
				document.getElementById("error").style.display = "inline-block";

        
		}
	}