
const socket = io();

let waitingTime = 500;
let players = [];
let map = [];
let level = 0;
let playerNumber = 0;

let hudFormat = 60
let lengthGlobal = window.innerHeight;
let widthGlobal = window.innerWidth;

let lengthSize = window.innerWidth/hudFormat;
let widthSize = window.innerWidth/hudFormat;

const ctx = canvas.getContext('2d');

ctx.canvas.width  = window.innerWidth- 2;
ctx.canvas.height = window.innerHeight - 2;


/*
function drawPlayers() {
  players.forEach(function({playerNumber,x, y, size, c}) {
    ctx.beginPath();
    ctx.rect(x*1000/map[level].Width+(1000/map[level].Width)/2-size/2, y*800/map[level].Lenght+(800/map[level].Lenght)/2-size/2, size, size);
    ctx.fillStyle = c;
    ctx.font = "30px Arial";
    ctx.fillText("J" + playerNumber, x*1000/map[level].Width+(1000/map[level].Width)/2-3*size/4, y*800/map[level].Lenght+(800/map[level].Lenght)/2-size-3);
    ctx.fill();
  });
}
*/
function drawMap() {







  /*
  //To the draw the Grid


  ctx.lineWidth = 0;
  ctx.strokeStyle = "rgb(0,0,0)";
  for (var x = 0; x < 1000; x += 1000/map[level].Width) {
      for (var y = 0; y < 800; y += 800/map[level].Lenght) {
         ctx.strokeRect(x, y, 1000/map[level].Width, 800/map[level].Lenght);
      }

  }
  */
  for(let i = 0; i < map[level].Container.length;i++){

    if(map[level].Container[i] == '1'){
      ctx.beginPath();
      ctx.fillStyle = "#FF0000"; //red
      ctx.fillRect((i % map[level].Width)*widthGlobal/map[level].Width + (widthGlobal/map[level].Width)/2 - widthSize/2, Math.floor(i / map[level].Width) * lengthGlobal/map[level].Lenght + (lengthGlobal/map[level].Lenght)/2 - lengthSize/2,widthSize,lengthSize);
      ctx.font = '35px Verdana';
      ctx.textAlign = 'center';
      ctx.fillText("J1", (i % map[level].Width) * widthGlobal/map[level].Width+(widthGlobal/map[level].Width)/2, Math.floor(i / map[level].Width) *lengthGlobal/map[level].Lenght+(lengthGlobal/map[level].Lenght)/2-lengthSize-3);
      ctx.fill();

    }
    if(map[level].Container[i] == '2'){
      ctx.beginPath();
      ctx.fillStyle = "#0000FF"; //blue
      ctx.fillRect((i % map[level].Width)*widthGlobal/map[level].Width + (widthGlobal/map[level].Width)/2 - widthSize/2, Math.floor(i / map[level].Width) * lengthGlobal/map[level].Lenght + (lengthGlobal/map[level].Lenght)/2 - lengthSize/2,widthSize,lengthSize);
      ctx.font = '35px Verdana';
      ctx.textAlign = 'center';
      ctx.fillText("J2", (i % map[level].Width) * widthGlobal/map[level].Width+(widthGlobal/map[level].Width)/2, Math.floor(i / map[level].Width) *lengthGlobal/map[level].Lenght+(lengthGlobal/map[level].Lenght)/2-lengthSize-3);
      ctx.fill();


    }

    if(map[level].Container[i] == '3'){
      ctx.fillStyle = "#8B4513"; //dirt
      ctx.fillRect((i % map[level].Width)*widthGlobal/map[level].Width, Math.floor(i / map[level].Width) * lengthGlobal/map[level].Lenght,widthGlobal/map[level].Width + 1,lengthGlobal/map[level].Lenght + 1 );

    }

    if(map[level].Container[i] == '4'){

      ctx.beginPath();

      ctx.ellipse((i % map[level].Width) * widthGlobal/map[level].Width+(widthGlobal/map[level].Width)/2,Math.floor(i / map[level].Width) *lengthGlobal/map[level].Lenght+(lengthGlobal/map[level].Lenght)/2,widthGlobal/50,(widthGlobal*2)/45,0,2*Math.PI, false);
      ctx.fillStyle = "#D473D4"; //tp
      ctx.fillStroke = "#000000"; //black
      ctx.lineWidth=2;
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

    }


    if(map[level].Container[i] == '5'){

      ctx.beginPath();

      ctx.arc((i % map[level].Width) * widthGlobal/map[level].Width+(widthGlobal/map[level].Width)/2,Math.floor(i / map[level].Width) *lengthGlobal/map[level].Lenght+(lengthGlobal/map[level].Lenght)/2,widthGlobal/50,0,2*Math.PI, false);
      ctx.fillStyle = "#FFD700"; //gold
      ctx.fillStroke = "#000000"; //black
      ctx.lineWidth=4;
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.font = '35px Verdana';;
      ctx.textAlign = 'center';
      ctx.fillStyle= "#000000"; //black
      ctx.fillText("5", (i % map[level].Width) * widthGlobal/map[level].Width+(widthGlobal/map[level].Width)/2,Math.floor(i / map[level].Width) *lengthGlobal/map[level].Lenght+(lengthGlobal/map[level].Lenght)/2 + 12);


    }

    if(map[level].Container[i] == '6'){

      ctx.beginPath();

      ctx.arc((i % map[level].Width) * widthGlobal/map[level].Width+(widthGlobal/map[level].Width)/2,Math.floor(i / map[level].Width) *lengthGlobal/map[level].Lenght+(lengthGlobal/map[level].Lenght)/2,widthGlobal/50,0,2*Math.PI, false);
      ctx.fillStyle = "#FFA500"; //gold
      ctx.fillStroke = "#000000"; //black
      ctx.lineWidth=4;
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.font = '35px Verdana';
      ctx.textAlign = 'center';
      ctx.fillStyle= "#000000"; //black
      ctx.fillText("10", (i % map[level].Width) * widthGlobal/map[level].Width+(widthGlobal/map[level].Width)/2,Math.floor(i / map[level].Width) *lengthGlobal/map[level].Lenght+(lengthGlobal/map[level].Lenght)/2 + 12);

      ctx.closePath();

    }
  }
}


function drawHUD() {
  ctx.beginPath();
  var totalScore = 0;
  players.forEach(function({playerNumber,score}) {
    totalScore += score;
  });

  players.forEach(function({playerNumber,score}) {
    ctx.fillStyle = "#000000";
    ctx.font = "30px Arial";
    ctx.textAlign = 'center';
    ctx.fillText("Score J" + playerNumber +" : " + score ,(widthGlobal * playerNumber )/4,lengthGlobal/(hudFormat/3));
    ctx.fillText("Score total : " + totalScore,(widthGlobal * 3 )/4,lengthGlobal/(hudFormat/3));
    ctx.fillText("Niveau actuel : " + (level + 1),(widthGlobal * 2 )/4,lengthGlobal - (hudFormat/3));
    ctx.fill();
  });
}

function drawGG(){
  ctx.beginPath();
  var totalScore = 0;
  players.forEach(function({playerNumber,score}) {
    totalScore += score;
  });
  ctx.fillStyle = "#000000";
  ctx.font = "70px Arial";
  ctx.textAlign = 'center';
  ctx.fillText("Bravo !",widthGlobal/2,lengthGlobal*2/5);
  ctx.fill();
  
  ctx.beginPath();
  ctx.font = "50px Arial";
  ctx.fillText("Vous gagné avec " + totalScore +" Points !",widthGlobal/2,lengthGlobal*4/5 );
  ctx.fill();
}
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(level < 10){
    drawMap();
    drawHUD();
  }else{
    drawGG();
  }



  requestAnimationFrame(update);
}
setTimeout(() => { requestAnimationFrame(update); }, 1000);

const keyboard = {};
/*
document.addEventListener('keydown', function(event) {
  players.forEach(function({playerNumber,x, y, size, c}) {
    if(event.keyCode == 87 || event.keyCode == 38) {
      socket.emit('move up',playerNumber);
    }
    if(event.keyCode == 83 || event.keyCode == 40) {
      socket.emit('move down',playerNumber);
    }
    if(event.keyCode == 65 || event.keyCode == 37) {
      socket.emit('move left',playerNumber);
    }
    if(event.keyCode == 68 || event.keyCode == 39) {
      socket.emit('move right',playerNumber);
    }
  })
});*/

window.onkeydown = function(e) {
  if(level < 10){
    keyboard[e.key] = true;
      if (keyboard['ArrowLeft']) {socket.emit('move left',playerNumber)};
      if (keyboard['ArrowUp']) {socket.emit('move up',playerNumber)};
      if (keyboard['ArrowRight']) {socket.emit('move right',playerNumber)};
      if (keyboard['ArrowDown']) {socket.emit('move down',playerNumber)};
    keyboard[e.key] = false;
  }
};






socket.on('win', function() {
  level += 1
});

socket.on('players number', function(number) {
  playerNumber = number;
});

socket.on('players list', function(list) {
  players = list;
});

socket.on('level data', function(levelData) {
  map = levelData;
});

socket.on('level actual', function(levelActual) {
  level = levelActual;
});
