// Array for my objects (list items)
var objects = ['instagram', 'instagram', 'spotify', 'spotify', 'github-alt', 'github-alt', 'youtube', 'youtube', 'reddit', 'reddit', 'linkedin-square', 'linkedin-square', 'pied-piper-alt', 'pied-piper-alt', 'twitter', 'twitter'],

//  shortened w/jquery for easy to read code
$container = $('.container'),
$scorePanel = $('.score-panel'),
$rating = $('.fa-star'),
$moves = $('.moves'),
$timer = $('.timer'),
$restart = $('.restart'),
$deck = $('.deck'),

// Set all variables
nowTime,
allOpen = [],
match = 0,
second = 0,
moves = 0,
wait = 420,
totalCard = objects.length / 5,

// score level system
stars3 = 14,
stars2 = 16,
star1 = 20;

// Shuffle function whnever the page is loaded, always random
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// initializes game to begin
function init() {
  
  //shuffles the objects
  let allCards = shuffle(objects);
  $deck.empty();
  
  // The game starts with no matching cards and zero moves 
  match = 0;
  moves = 0;
  $moves.text('0');
  
  // For loop creates 16  listitem tags with the class of the card for every <i> tag
  for (let i = 0; i < allCards.length; i++) {
  $deck.append($('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>'))
  }
  addCardListener();
  
  // timer to reset to 0 when the game is restarted
  resetTimer(nowTime);
  second = 0;
  $timer.text(`${second}`)
  initTime();
}

//timer reset when the game ends or is refreashed
function resetTimer(timer) {
  if (timer) {
  clearInterval(timer);
  }
}

// rates score from 1 to 3 stars 
function rating(moves) {
  let rating = 3;
  if (moves > stars3 && moves < stars2) {
    $rating.eq(3).removeClass('fa-star').addClass('fa-star-o');
  } else if (moves > stars2 && moves < star1) {
    $rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
  } else if (moves > star1) {
    $rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
    rating = 1;
  }
  return { score: rating };
}


// starts timer once game is loaded
function initTime() {
nowTime = setInterval(function () {
$timer.text(`${second}`)
second = second + 1
}, 1000);
}

// boostrap modal alert window showing time, moves, score it took to finish the game, toggles when all pairs are matched.
function gameOver(moves, score) {
    $('#winnerText').text(`In ${second} seconds, you made a total of ${moves} moves with a score of ${score}. Good Job!`);
    $('#winnerModal').modal('toggle');
}


// function chexcking that is an equal match to another card that is clicked on to stay open.
let addCardListener = function () {

//clicked card is flipped
$deck.find('.card').bind('click', function () {
  let $this = $(this);
  if ($this.hasClass('show') || $this.hasClass('match')) { return true; }
  let card = $this.context.innerHTML;
  $this.addClass('open show');
  allOpen.push(card);


// checks if they are matched?
if (allOpen.length > 1) {
  if (card === allOpen[0]) {
  $deck.find('.open').addClass('match');
  setTimeout(function () {
  $deck.find('open').removeClass('open show');
  }, wait);
  match++;

//the cards will flip back over if not matched.
} else {
  $deck.find('.open').addClass('notmatch');
  setTimeout(function () {
  $deck.find('.open').removeClass('open show');
  }, wait / 1.10);
}

// specifies all added cards facing up
allOpen = [];

// Increases number of moves by one only when two cards are matched or not matched
moves++;

// # of moves is added to the rating() function that will determine the star score
rating(moves);

// # of moves are added to the modal HTML alert
$moves.html(moves);
}

// game is over once all cards have been matche
if (totalCard === match) {
  rating(moves);
  let score = rating(moves).score;
  setTimeout(function () {
  gameOver(moves, score);
}, 500);
}
});
}


init();