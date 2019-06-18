/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
   constructor() {
     this.missed = 0;
     this.phrases = [
       "Hello world",
       "Nice to meet you",
       "My name is youngjin",
       "Nice work",
       "Good job"
     ].map(phrase => new Phrase(phrase));
     this.activePhrase = null;
     this.keys = [...$('#qwerty button').get()];
   }


 startGame() {
   $('#overlay').hide();
   this.activePhrase = this.getRandomPharse();
   this.activePhrase.addPhraseToDisplay();
 }

 getRandomPharse() {
   const index = Math.floor(Math.random()*this.phrases.length)
   return this.phrases[index];
 }

  handleInteraction(target){
    //disable selected key;
    if(target.className ==="key"){
      target.disabled = true;
    }
    if(this.activePhrase.phrase.indexOf(target.textContent)>-1){
      target.className ="key chosen";
      this.activePhrase.showMatchedLetter(target.textContent);
      this.checkForWin() ? this.gameOver(true) : true;
    }else {
      target.className ="key wrong";
      this.removeLife();
    }
  }

  handleINteractionWithKeboard(keyName){
    this.keys.forEach((key)=>{
      key.innerText === keyName ? this.handleInteraction(key) : 0 ;
    });
  }

  removeLife(){
    $('#scoreboard').find('img[src="images/liveHeart.png"]:first').attr('src',"images/lostHeart.png");
    if($('#scoreboard').find('img[src="images/liveHeart.png"]').length<1){
      this.gameOver(false);
    }
  }

  checkForWin(){
    if($('#phrase ul li.hide').length<1){
      return 1;
    }
    return 0;
  }

  resetGame(){
    $('#phrase li').remove();
    $('#qwerty button').attr("class","key");
    $('#qwerty button').attr("disabled",false);
    $('#scoreboard img').attr('src',"images/liveHeart.png");
  }

  gameOver(win){
    $('#overlay').show();
    if(win){
      $('#game-over-message').text("You Win!");
      $('#overlay').attr("class","win");
    }else {
      $('#game-over-message').text("You Lose!");
      $('#overlay').attr("class","lose");
    }
    this.resetGame();
  }
}
