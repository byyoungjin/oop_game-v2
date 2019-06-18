/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

game= new Game();

 $('#btn__reset').click(()=>{
   game= new Game();
   game.startGame();
 });

$('.keyrow button.key').click((e)=>{
  game.handleInteraction(e.target);
});

$('body').keyup((e)=>{
  game.handleINteractionWithKeboard(e.key);

})