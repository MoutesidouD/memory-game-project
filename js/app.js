const cards = [  //An array which holds all cards
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

 let flippedCards=[];  //Temporary container for checking matches
 let matchedCards=[];  // Array needed for comparison with cards to pop modal

//Assign main variables in global scope
const stars= document.querySelector(".stars li");
let counter= document.querySelector(".moves");
const deck= document.querySelector(".deck");
const modal= document.querySelector(".modal");
const modalMessage= document.querySelector(".modalMessage");
const restart= document.querySelector(".restart");
let timer= document.querySelector(".timer");
const playButton= document.querySelector(".button");

/*
 * Display the cards on the page
 * and set eventListener to flip them
*/
document.onload= gameInit(); //Start game when page loaded

restart.addEventListener("click",function (){ //EventListener to reload page when restart is hit
  location.reload();
});


let moves=0;
function gameInit(){
  //storing moves
shuffle(cards);
for(let i = 0; i< cards.length; i++) { //loop through cards array and display them
  const card = document.createElement("li");
  card.classList.add("card");
  card.innerHTML= "<i class='" + cards[i] + "'</i>";
  deck.appendChild(card);

  card.addEventListener("click", function clickCard(){ //eventListener for clicking cards
    card.classList.add("open" , "show" ,"disabled");
    flippedCards.push(this);
    moves++;
    counter.innerText=moves; //display moves counter
    starRate();  //Function for stars rating
    checkingMatches(); //Function for checking matches
    timerOn();  //Function to start timer
  });
}
}


function myModal(){ //Function to pop-up modal
  if (matchedCards.length === 16){
    modal.style.display="block";
  }
}

const span = document.querySelector(".close"); //Closing modal
span.onclick = function() {
  modal.style.display = "none";
};


function shuffle(array) { //Function to suffle array of cards
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


function checkingMatches() { //Checking for matches
  if(flippedCards.length===2){
    if(flippedCards[0].innerHTML === flippedCards[1].innerHTML){ //When match
      setTimeout(function() {
        flippedCards[0].classList.add("match");
        flippedCards[0].classList.remove("open" , "show");
        matchedCards.push(this);
        flippedCards[1].classList.add("match");
        flippedCards[1].classList.remove("open" , "show");
        matchedCards.push(this);
        flippedCards.pop();
        flippedCards.pop();
        myModal();
      },300);
    }else{
      setTimeout(function() { //When don't match
        flippedCards[0].classList.remove("open" , "show" , "disabled");
        flippedCards[1].classList.remove("open" , "show" , "disabled");
        flippedCards.pop();
        flippedCards.pop();
        myModal();
      },300);
    }
  }
}


function starRate() { //Function for stars rating
  if (moves >= 25 && moves <= 31){
    stars.remove();
  }else if(moves >32) {  //else NOT working
    stars.remove();
    stars.remove();
  }
}



var second = 1, minute = 0; //Function to start timer
function timerOn() {
  if (moves===1){
    setInterval(function(){
      timer.innerHTML ="Time: "+ minute+"mins "+second+"secs";
      second++;
      if(second === 60){
        minute++;
        second=0;
      }
      else if (matchedCards===16){  //stopping time NOT working
        clearInterval();
      }
    },1000);
  }
}
playButton.addEventListener("click", function(){ //eventListener to restart game from modal button
  location.reload();
})
