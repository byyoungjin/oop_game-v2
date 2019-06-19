/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

game= new Game();

/**
 * eventHandler for startGame button
 */
 $('#btn__reset').click(()=>{
   game= new Game();
   game.startGame();

 });

/**
 * eventHandler for key click event
 */
$('.keyrow button.key').click((e)=>{
  game.handleInteraction(e.target);
});


/**
 * eventHandelr for keyboard keyup event
 */
$('body').keyup((e)=>{
  if(game.ready ===true){
    game.handleINteractionWithKeboard(e.key);
  }
})
