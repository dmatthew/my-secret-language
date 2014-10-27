/**
 * My Secret Language Controller
 *
 * @file app.controller.js
 * @author Matt Davis
 */
(function () {
    angular
        .module('msl')
        .controller('MSLController', ['SETUP_NOTES', MSLController]);

    function MSLController(SETUP_NOTES) {
        var msl = this;
        var ls = localStorage;
        
        msl.setupNotes = SETUP_NOTES;
        
        // Initialize words and notes from local storage.
        if ( ! ls.words) ls.words = JSON.stringify([]);
        if ( ! ls.notes) ls.notes = JSON.stringify(msl.setupNotes);
        
        // Variables
        msl.words = JSON.parse(ls.words);          // The dictionary of all words.
        msl.notes = JSON.parse(ls.notes);          // The list of all user notes on their language.
		msl.translateTextarea = "";                // The english sentence in the textarea of the translate words page.
		msl.translatedWords = [];                  // Array of words that have been translated.
        msl.englishText = '';                      // The english translation for your secret word.
        msl.secretText = '';                       // Your translation for the english word.
        msl.showAddWordPopup = false;              // Boolean for showing the addWordPopup.
		msl.secretTextPopup = {};                  // The english word the user clicked on and its translation.
		msl.currentLetter = '';                    // Used for diplaying the dividers in the dictionary.
		msl.flashWord = {};                        // Object holding the current flash card word.
		msl.currentCategory = "";                  // The current category being modified.
        msl.currentNote = {};                      // Which note is being viewed in the view note page.
		msl.categoryIndex = 0;                     // Count of the number of categories there are. This is used to add a note to the correct category.
		msl.editingNote = false;                   // Boolean for whether or not the current note is being edited.
		msl.myEditIndex = -1;                      // The word in the edit-dictionary page which is being modified.
        msl.noteTitleText = '';                    // The title of a note.
        msl.noteDescriptionText = '';              // The descriptio of a note.
        
        // Public Functions
        msl.addWord = addWord;                       // Add a new word to the dictonary;
        msl.getTranslation = getTranslation;         // Translates the english word in the translateTextarea.
		msl.clearTranslate = clearTranslate;         // Clears the translateTextarea.
        msl.popupAddWord = popupAddWord;             // Display the addWord popup from the Translate Words panel.
        msl.addWordPop = addWordPop;                 // Adds a word to the dictionary.
        msl.newLetter = newLetter;                   // Change the currentLetter in the Dictionary page.
        msl.getRandomWord = getRandomWord;           // Get a random word from the dictionary of words.
		msl.nextWord = nextWord;                     // Get a new word for the flash cards.
        msl.setCurrentCategory = setCurrentCategory; // Set which category is being added/modified.
        msl.setCurrentNote = setCurrentNote;         // Sets the note being viewed in the view note page.
        msl.deleteNote = deleteNote;                 // Function to delete a note from the notes page.
        msl.addNote = addNote;                       // Add a note to the notes page.
        msl.editNote = editNote;                     // Save changes made to a note.
        msl.setEditWord = setEditWord;               // Set the current word to be edited.
		msl.editWord = editWord;                     // Update a word in the dictionary
        msl.deleteWord = deleteWord;                 // Delete a word from the dictionary
        
        
        // Initialize the flash cards.
		msl.nextWord();
        
        /**
         * Add a new word to the dictionary.
         */
        function addWord() {
            if(typeof(Storage) !== "undefined") {
			// Code for localStorage/sessionStorage
				var addToWords = true;
				for (var i = 0; i < msl.words.length; i++) {
					if (msl.words[i].english.toUpperCase() === msl.englishText.toUpperCase) {
						addToWords = false;
					}
				}
                
				// The word is not already in the dictionary, so add it to it
				if (addToWords) {
					msl.words.push({english: msl.englishText, secret: msl.secretText});
					ls.words = JSON.stringify(msl.words);
					msl.englishText = '';
					msl.secretText = '';
				}
				else {
					alert("Already exists");
				}
			} 
			else {
			// Sorry! No Web Storage support..
				alert("Sorry, no local storage support.");
			}
        }
        
        /**
         * Translates the english word in the translateTextarea.
         */
		function getTranslation() {
			var myEng = msl.translateTextarea;
			msl.translatedWords = [];
			myEng = myEng.split(" ");
			
			// Loop through the english textarea text
			for (var i = 0; i < myEng.length; i++) {
				var isFound = false;     // Whether the word is in the dictionary or not.
				var hasSpecial = false;  // Whether the word ends in a special character or not.
				var mySpecialChar = "";  // The special character that is at the end of the word.
                
				// Check if the word ends in a special character
				if (myEng[i].charAt(myEng[i].length - 1) === "," || myEng[i].charAt(myEng[i].length - 1) === "." || myEng[i].charAt(myEng[i].length - 1) === ";") {
					mySpecialChar = myEng[i].charAt(myEng[i].length - 1);
					myEng[i] = myEng[i].substring(0, myEng[i].length - 1);
					hasSpecial = true;
				}
                
				//Loop through the dictionary and check if the word has been defined yet.
				for (var j = 0; j < msl.words.length; j++) {
					//if it is found, add it to the translatedWords array
					if (myEng[i].toUpperCase() === msl.words[j].english.toUpperCase())
                    {
						//The word to add to the translated words array
						var myAddWord = msl.words[j].secret;
						(hasSpecial) ? myAddWord += mySpecialChar + " " : myAddWord += " ";
						msl.translatedWords.push({
							word: myAddWord,
							hasClick: false
						});
						isFound = true;
						break;
					}
				}
				if (!isFound)
                {
					var myAddWord = myEng[i]; // The word to add to the translated words array.
					msl.translatedWords.push({
						word: myAddWord,
						hasClick: true
					});
					(hasSpecial) 
						? msl.translatedWords.push({
							word: mySpecialChar + " ",
							hasClick: false
						}) 
						: msl.translatedWords.push({
							word: " ",
							hasClick: false
						});
				}
			}
		}
        
        /**
         * Clear the translateTextarea.
         */
		function clearTranslate() {
			msl.translateTextarea = '';
			msl.translatedWords = [];
			msl.showAddWordPopup = false;
		}
        
        /**
         * Display the addWord popup from the Translate Words panel.
         * @param {String} myWord
         */
		function popupAddWord(myWord) {
			msl.showAddWordPopup = true;
			msl.secretTextPopup.english = myWord;
		}
        
        /**
         * Adds a word to the dictionary.
		 * This function gets called when a user clicks on a non-translated word
		 * in the translate words page.
		 */
		function addWordPop() {
			msl.words.push({
				english: msl.secretTextPopup.english, 
				secret: msl.secretTextPopup.secret
			});
			ls.words = JSON.stringify(msl.words);
			msl.secretTextPopup = {};
			msl.showAddWordPopup = false;
			msl.getTranslation();
		}
        
        /**
         * Change the currentLetter in the Dictionary page.
         * @param {String} word
         */
		function newLetter(word) {
			if (word.substr(0, 1) !== msl.currentLetter) {
				msl.currentLetter = word.substr(0, 1);
				return true;
			}
		}
        
        /**
         * Get a random word from the dictionary of words.
         * @returns {String}
         */
		function getRandomWord() {
			var randNum = Math.floor(Math.random() * msl.words.length);
			if (msl.words[randNum]) {
				return msl.words[randNum];
			}
			else {
				return "";
			}
		}
        
        /**
         * This function gets a new word for the flash cards.
         */
		function nextWord() {
			msl.showActions = false;
			// Get a random word from the dictionary of words
			msl.randWord = msl.getRandomWord();
			msl.flashWord = {
				english: msl.randWord.english, 
				secret: msl.randWord.secret
			};
		}
        
        /**
         * Set which category is being added/modified.
         * @param {String} myCategory
         * @param {Number} myIndex
         */
        function setCurrentCategory(myCategory, myIndex) {
			msl.currentCategory = myCategory;
			msl.categoryIndex = myIndex;
		}
        
        /**
         * Sets the note being viewed in the view note page.
         * @param {Number} myCatIdx
         * @param {Number} myCatNoteIdx
         */
        function setCurrentNote(myCatIdx, myCatNoteIdx) {
			msl.currentNote = {catIdx: myCatIdx, catNoteIdx: myCatNoteIdx};
		}
        
        /**
         * Function to delete a note from the notes page.
         */
		function deleteNote() {
			msl.notes[msl.currentNote.catIdx].categoryNotes.splice(msl.currentNote.catNoteIdx, 1);
			ls.notes = JSON.stringify(msl.notes);
			history.back();
		}
        
        /**
         * Function to add a note to the notes page
         */
		function addNote() {
			if(typeof(Storage) !== "undefined") {
			// Code for localStorage/sessionStorage
				//Add the note to the notes page
				msl.notes[msl.categoryIndex].categoryNotes.push({
					title: msl.noteTitleText, 
					description: msl.noteDescriptionText
				});
				ls.notes = JSON.stringify(msl.notes);
				msl.noteDescriptionText = '';
				msl.noteTitleText = '';
			} 
			else {
			// Sorry! No Web Storage support..
				alert("Sorry, no local storage support.");
			}
			history.back();
		}
        
        /**
         * Save changes made to a note.
         */
		function editNote() {
			msl.editingNote = false;
			ls.notes = JSON.stringify(msl.notes);
		}
        
        /**
         * Set the current word to be edited.
         * @param {String} myWord
         */
        function setEditWord(myWord) {
			msl.myEditIndex = msl.words.map(function(e) { return e.english; }).indexOf(myWord);
		}
        
        /**
         * Update a word in the dictionary
         */
		function editWord() {
			ls.words = JSON.stringify(msl.words);
			history.back();
		}
        
        /**
         * Delete a word from the dictionary.
         */
		function deleteWord() {
			var idx = msl.myEditIndex;
			msl.words.splice(idx, 1);
			ls.words = JSON.stringify(msl.words);
			history.back();
		}
    }
})();