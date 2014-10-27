/**
 * My Secret Language Module
 *
 * @file app.module.js
 * @author Matt Davis
 */

(function () {
    angular
        .module('msl', [])
        .constant('SETUP_NOTES', [
			{
				categoryTitle: "General",
				categoryNotes: [
					{
						title: "This is a general note",
						description: "Anything that does not fit into any of the other categories should be placed into this category."
					}
				]
			},
			{
				categoryTitle: "Phonology",
				categoryNotes: [
					{
						title: "Notes on phonology",
						description: "The sounds of words and letters in your language."
					}
				]
			},
			{
				categoryTitle: "Morphology",
				categoryNotes: [
					{
						title: "A note on morphology",
						description: "Anything do to with how words are structured in your language should be placed here."
					}
				]
			},
			{
				categoryTitle: "Syntax",
				categoryNotes: [
					{
						title: "Some notes about syntax",
						description: "Notes you have that involve the syntax of your language go here."
					}
				]
			}
		]
    );
})();
