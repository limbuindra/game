let play = true;
let objMoveSpeed = 250;
let objMoveDistance = 20;
let blockMoveDistance =20;
let score  =0;
let missed = 0;
 

 let objectMovementInterval = setInterval(moveObjectDown,objMoveSpeed);
generateObject();


 function generateObject(){
     clearInterval(objectMovementInterval);
    let obj = '<div class="obj"></div>';
$('.wrapper').append(obj);

let wrapperPosition = $('.wrapper').position();
let wrapperWidth = $('.wrapper').width();
let objWidth = $(document).find(".obj").width();
//generate random coordinates for falling object
let positionX = randomIntFromInterval(wrapperPosition.left, wrapperWidth-objWidth);
$(".obj").css("left",positionX);
$(".obj").css("top", 0);
//moveObjectDown()
objectMovementInterval = setInterval(moveObjectDown,objMoveSpeed);

 }
 //this function generates random number between two numbers
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  

}
$(document).keydown(function (e) {
    let code=e.which;
   if (code ==39){

    moveRight()
}
 if (code ==37){
        moveLeft()
        }
if (code ===32){
    if (play) {
        clearInterval(objectMovementInterval);
        play = false;

    }else{
        objectMovementInterval = setInterval(moveObjectDown,objMoveSpeed);
        play = true;
    
    }
}
});

function moveLeft(){
    let position = $(".board").position();
    if(position.left > 10){
        //console.log(position.left)
    $(".board").css("left",position.left - blockMoveDistance)
}
}
function moveRight(){
   let position = $(".board").position();
    if(position.left < 302){
     console.log(position.left)   
     $(".board").css("left" ,position.left + blockMoveDistance)
}
}
function moveObjectDown(){
    let obj = $('.obj');
    let boardPosition = obj.position();
    let objHeight = $(document).find('.obj').height();
    let position = $(document).find('.board').position();
    
if (boardPosition.top + objHeight + objMoveDistance <= position.top) {
        obj.css("top", boardPosition.top + objMoveDistance);
     
    }else{
        checkScore()
     $(document).find('.obj').remove();
      generateObject();
    }
}

function checkScore(){
  let objPosition = $(document).find('.obj').position();
  let objWidth = $(document).find('.obj').width();
  let objPositionLeft = objPosition.left;
  let objPositionRight = objPositionLeft + objWidth;
  let  position = $(document).find('.board').position();
  let Width = $(document).find('.board').width();
  let blockPositionLeft = position.left;
  let blockPositionRight = blockPositionLeft + Width;

  if (objPositionRight > blockPositionLeft &&
     objPositionLeft < blockPositionRight)
  {
      score ++;
      $('.score').html(score)
      if (score===3){
     
        objMoveSpeed = 150;
      }
    }
      else {
        missed++; 
        if(missed === 3){
        $(".score").html('Game Over');   
            score = 0
            missed = 0
    objMoveSpeed = 250
        }
        $(".missed").html(missed);
  
      
  }
}