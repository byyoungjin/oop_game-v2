/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
   constructor(phrase){
     this.phrase= phrase.toLowerCase(phrase);
   }

/**
 * add Phrase on display
 */
   addPhraseToDisplay(){
     const li = [...this.phrase].map(letter =>{ //to iterate string! use [...]
       return /\s/.test(letter) ?
       '<li class="space"> </li>' :
       `<li class="hide letter ${letter}">${letter}</li>`;
     });
     li.forEach(letterElement => {
       $('#phrase ul').append(letterElement);
     });
   }

/**
 * check whether the pickedLetter on the phrase
 * @param  {string} pickedLetter
 * @return {boolean}              [if it is on the phrase return 1, if not 0]
 */
   checkLetter(pickedLetter){
     return this.phrase.indexOf(pickedLetter) >-1 ;
   }

/**
 * show the matched letter on the screen
 * @param  {string} pickedLetter 
 */
   showMatchedLetter(pickedLetter){
     $(`.${pickedLetter}`).attr("class",`show letter ${pickedLetter}`);
   }
 }
