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
    this.timer = null;
    this.ready = false;
    this.prevFontIndex = 0;
  }

/**
 * startGame!
 */
  startGame() {
    this.ready=true;
    $('#overlay').hide();
    this.activePhrase = this.getRandomPharse();
    this.activePhrase.addPhraseToDisplay();
    this.startTimerThings();
  }
/**
 * get the random Phrase from this.phrses
 * @return {string} [Phrase that would be used in game]
 */
  getRandomPharse() {
    const index = Math.floor(Math.random() * this.phrases.length)
    return this.phrases[index];
  }
/**
 * handle interaction with pressed key and action
 * @param  {DomElement} target [pressed key DomElement]

 */
  handleInteraction(target) {
    //disable selected key;
    if (target.className === "key") {
      target.disabled = true;

    }
    if (this.activePhrase.checkLetter(target.textContent)) {
      this.startTimerThings();
      target.className = "key chosen";
      this.activePhrase.showMatchedLetter(target.textContent);
      this.checkForWin() ? this.gameOver(true) : true;
    } else {
      target.className = "key wrong";
      this.removeLife();
    }
  }

/**
 * handle the interaction with keboard Keypress with action
 * @param  {string} keyName [pressed keyboard keyname]
 */

  handleINteractionWithKeboard(keyName) {
    this.keys.forEach((key) => {
      key.innerText === keyName ? this.handleInteraction(key) : 0;
    });
  }

/**
 * remove the life on the scoreboard
 * and show gameOver message when there is no Life;
 */
  removeLife() {
    $('#scoreboard').find('img[src="images/liveHeart.png"]:first').attr('src', "images/lostHeart.png");
    if ($('#scoreboard').find('img[src="images/liveHeart.png"]').length < 1) {
      this.gameOver(false);
    } else {
      this.startTimerThings();


    }

  }

/**
 * check For win!
 * @return {boolean} [if we found all the letters return 1, if not yet 0]
 */
  checkForWin() {
    if ($('#phrase ul li.hide').length < 1) {
      return 1;
    }
    return 0;
  }

/**
 * reset the game
 * before game over
 */
  resetGame() {
    $('#phrase li').remove();
    $('#qwerty button').attr("class", "key");
    $('#qwerty button').attr("disabled", false);
    $('#scoreboard img').attr('src', "images/liveHeart.png");
    clearTimeout(this.timer);
    $(".timeBar").remove();
    $('.tickingClock').remove();

  }

/**
 * set the game over message
 * @param  {boolean} win [win:1, loose:0]
 */
  gameOver(win) {
    this.ready = false;
    $('#overlay').show();
    if (win) {
      $('#game-over-message').text("You Win!");
      $('#overlay').attr("class", "win");
    } else {
      $('#game-over-message').text("You Lose!");
      $('#overlay').attr("class", "lose");
    }
    this.resetGame();
  }

/**
 * set the timer start counting
 * @param  {number} timeInput [the time given to the player before loosing Life]
 */
  timerStart(timeInput) {
    if (this.ready) {
      let sec = timeInput
      this.changeTitleFont();
      $('.timer').text(`${sec}`);
      sec--;
      if (sec < 0) {
        clearTimeout(this.timer);
        this.removeLife();
      } else {
        this.timer = setTimeout(() => {
          this.timerStart(sec);
        }, 1000);
      }
    }
  }

/**
 * set the timebar start by animation
 */
  timeBarStart() {
    $(".timeBar").remove();
    $('#scoreboard').after('<div id="timeBar" class="timeBar"></div>');
  }
/**
 * set the clock over the counter ticking by animation
 */
  timeClockTicking() {
    $('.tickingClock').remove();
    $('.timer').before('<i id="timeClock" class="fas fa-stopwatch fa-3x tickingClock"></i>');
  }

/**
 * modular function for the timer things(counter, timebar, tickingClock)
 */
  startTimerThings() {
    clearTimeout(this.timer);
    this.timerStart(5);
    this.timeBarStart();
    this.timeClockTicking();
  }

/**
 * change font title
 */
  changeTitleFont() {
    const font = ["'Mali', cursive", "'Swanky and Moo Moo', cursive", "'Indie Flower', cursive", "'Lobster', cursive", "'Pacifico', cursive", "'Shadows Into Light', cursive"];

    function getRandomFontIndex(prevFontIdex) {
      let randomFontIndex = Math.floor(Math.random() * font.length);
      if (randomFontIndex === prevFontIdex) {
        console.log('same!');
        return randomFontIndex < font.length - 1 ? randomFontIndex + 1 : randomFontIndex - 1;
      } else {
        return randomFontIndex;
      }
    }
    let randomFontIndex = getRandomFontIndex(this.prevFontIndex);
    $('.header').css('font-family', font[randomFontIndex]);
    this.prevFontIndex = randomFontIndex;
  }
}
