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
let allClickedCards=[];
//Assign main variables in global scope
const stars= document.querySelector(".stars");
let counter= document.querySelector(".moves");
const deck= document.querySelector(".deck");
const modal= document.querySelector(".modal");
const restart= document.querySelector(".restart");
let timer= document.querySelector(".timer");
const playButton= document.querySelector(".button");
let finishTime=document.querySelector(".finish-time");
let modalStars=document.querySelector(".modalStars");
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
    allClickedCards.push(this);
    if(flippedCards.length===2){
      moves+=1;
    }
    counter.innerText=moves; //display moves counter
    starRate();  //Function for stars rating
    checkingMatches(); //Function for checking matches
  });
}
}



function myModal(){ //Function to pop-up modal
  if (matchedCards.length === 16){
    modal.style.display="block";
finishTime.innerText=timer.innerHTML;
clockOff();
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
  if (moves === 15 ){
    stars.removeChild(stars.childNodes[1]);
    modalStars.removeChild(modalStars.childNodes[1]);
  }else if(moves === 20) {
    stars.removeChild(stars.childNodes[2]);
    modalStars.removeChild(modalStars.childNodes[2]);
  }
}

//Starts timer
var second = 0;
var minute = 0;
  var timeOn =setInterval(clock,1000);
function clock(){
if(allClickedCards.length >= 1){
      timer.innerHTML = "Time: "+ minute+"mins "+second+"secs";
      second++;
      if(second === 60){
        minute++;
        second=0;
      }
    }
  }


//Stops timer

function clockOff(){

clearInterval(timeOn);

}









    /*  else if (matchedCards===16){  //stopping time NOT working
        clearInterval();
      }
    },1000);
  }
}*/
playButton.addEventListener("click", function(){ //eventListener to restart game from modal button
  location.reload();
});
