/*
 * Create a list that holds all of your cards
 */const cards = [
 "fa fa-diamond",
 "fa fa-diamond",
 "fa fa-paper-plane-o",
 "fa fa-paper-plane-o",
 "fa fa-anchor",
 "fa fa-anchor",
 "fa fa-bolt",
 "fa fa-bolt",
 "fa fa-cube",
 "fa fa-cube",
 "fa fa-leaf",
 "fa fa-leaf",
 "fa fa-bicycle",
 "fa fa-bicycle",
 "fa fa-bomb",
 "fa fa-bomb"
 ];

 /*const starIcons = [
   "fa fa-star", "fa fa-star" , "fa fa-star"
 ];*/

/*Assign main variables in global scope*/
const stars= document.querySelector(".stars");

const deck= document.querySelector(".deck");
const modal= document.querySelector(".modal");
const modalMessage= document.querySelector(".modalMessage");
const restart= document.querySelector(".restart");
let timer= document.querySelector(".timer");
/*
 * Display the cards on the page
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
*/
let flippedCards=[];  /*temporary container for checking matches*/
let matchedCards=[];  /* needed for comparison with cards to pop modal*/

let moves=0;
for(let i = 0; i< cards.length; i++) {
  const card = document.createElement("li");
  card.classList.add("card");
  card.innerHTML= "<i class='" + cards[i] + "'</i>";
  deck.appendChild(card);
 /*shuffle(cards);*/ /*gives multiple same icons!!!*/

card.addEventListener("click", function(){
  card.classList.add("open" , "show");
  flippedCards.push(this);
  matchedCards.push(this);

  if(flippedCards[0].innerHTML === flippedCards[1].innerHTML){
    setTimeout( function (){
    flippedCards[0].classList.add("match");
    flippedCards[0].classList.remove("open" , "show");
    flippedCards[1].classList.add("match");
    flippedCards[1].classList.remove("open" , "show");
    flippedCards.pop();
    flippedCards.pop();
    moves++;
    moves++;
  myModal();

  },300);
  }else{
    setTimeout( function (){
    flippedCards[0].classList.remove("open" , "show");
    flippedCards[1].classList.remove("open" , "show");
    flippedCards.pop();
    flippedCards.pop();
    matchedCards.pop();
    matchedCards.pop();
    moves++;
    moves++;
  myModal();

  },300);
  }
});
}


/*Defines stars achieved*/

/*for(let i = 0; i< starIcons.length; i++) {
  let star = document.createElement("li");
  star.innerHTML= "<i class='" + starIcons[i] + "'</i>";
  stars.appendChild(star);

/*NEED TO BE FIXED
if (moves >= 26 && moves <= 35){
  starIcons.pop();
}else if(moves > 35){
  starIcons.pop();
  starIcons.pop();
}
};*/

/*pops-up the modal*/
function myModal(){
  if (matchedCards.length === 16){
    modal.style.display='block';
  };
}



/*
 *   - shuffle the list of cards using the provided "shuffle" method below

 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
