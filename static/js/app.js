var jet = document.getElementById("jet");
var board = document.getElementById("board");
var key_left = false;
var key_right = false;
var accelerater=1;
const bgm = new Audio("sounds/bgm.mp3");
const lasersound = new Audio("sounds/laser.wav");
const xplosionsound = new Audio("sounds/explosion.wav");
bgm.volume=0.5;


window.addEventListener("keyup",(e) =>{
    if (e.key == "ArrowLeft") {
    key_left = false;
  }
  //460  =>  board width - jet width
  else if (e.key == "ArrowRight") {
    key_right=false;
  }
});


window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowLeft") {
    //jet.style.left = left - 10 + "px";
    key_left = true;
  }
  //460  =>  board width - jet width
  else if (e.key == "ArrowRight") {
    //jet.style.left = left + 10 + "px";
    key_right=true;
  }


});

window.addEventListener("keypress", (e) => {
  bgm.play();

    var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (e.key == "ArrowUp" || e.keyCode == 32) {
  	  lasersound.cloneNode(true).play();
    //32 is for space key
    var bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);

    var movebullet = setInterval(() => {
      var aliens = document.getElementsByClassName("aliens");

      for (var i = 0; i < aliens.length; i++) {
        var rock = aliens[i];
        if (rock != undefined) {
          var rockbound = rock.getBoundingClientRect();
          var bulletbound = bullet.getBoundingClientRect();

          //Condition to check whether the rock/alien and the bullet are at the same position..!
          //If so,then we have to destroy that rock

          if (
            bulletbound.left >= rockbound.left &&
            bulletbound.right <= rockbound.right &&
            bulletbound.top <= rockbound.top &&
            bulletbound.bottom <= rockbound.bottom
          ) {
            rock.parentElement.removeChild(rock); //Just removing that particular rock;
            xplosionsound.cloneNode(true).play();
            //Scoreboard

            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;
              

          }
        }
      }
      var bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );

      //Stops the bullet from moving outside the gamebox
      if (bulletbottom >= 500) {
        clearInterval(movebullet);
      }

      bullet.style.left = left + "px"; //bullet should always be placed at the top of my jet..!
      bullet.style.bottom = bulletbottom + 2 + "px";
    });
  }
  });


var generatealiens = setInterval(() => {
  var rock = document.createElement("div");
  rock.classList.add("aliens");
  //Just getting the left of the rock to place it in random position...
  var rockleft = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left")
  );
  //generate value between 0 to 450 where 450 => board width - rock width
  rock.style.left = Math.floor(Math.random() * 450) + "px";

  board.appendChild(rock);
}, 1000);

var movealiens = setInterval(() => {
    var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  var aliens = document.getElementsByClassName("aliens");

  if(key_right&& left <=460){
jet.style.left = left + 4 + "px";
  }
  if(key_left && left > 0){
jet.style.left = left - 4 + "px";
  }
  if (aliens != undefined) {


    for (var i = 0; i < aliens.length; i++) {
      //Now I have to increase the top of each rock,so that the aliens can move downwards..
      var rock = aliens[i]; //getting each rock
      var rocktop = parseInt(
        window.getComputedStyle(rock).getPropertyValue("top")
      );
      //475 => boardheight - rockheight + 25
      if (rocktop >= 475) {
        if( parseInt(document.getElementById("points").innerHTML)>=30  ){
          clearInterval(movealiens);
        alert("You did it Trooper. Welcome to the cockpit!");
        window.location="https://starstoken.org/cockpit.html"; 
        }else{
        alert("Don't give up Trooper!"); 
        clearInterval(movealiens);
        window.location.reload();

        }


      }
    
      if(parseInt(document.getElementById("points").innerHTML) >= 10 && parseInt(document.getElementById("points").innerHTML)<=50 ){
        accelerater=document.getElementById("points").innerHTML/10;
      }
      rock.style.top = rocktop + 1*accelerater + "px";
    }
  }
}, 15);
