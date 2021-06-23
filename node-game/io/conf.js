
const socketio = require('socket.io');

var mainServer = require('../index.js');

module.exports = function(server) {
  // io server
  const io = socketio(server);

  var players = {};
  var totalScore = 0;


  io.on('connection', function(socket) {

    if(Object.size(players) < 2){
      level = 0;
      if(Object.size(players) == 0){
        io.to(socket.id).emit('players number', 1);
        mainServer.level[level].Container[mainServer.level[level].Player1 % mainServer.level[level].Width + (Math.floor(mainServer.level[level].Player1 / mainServer.level[level].Width))*mainServer.level[level].Width] = '1'
        players[socket.id] = {
          playerNumber: 1,
          score: 0,
        };
      }else{
        if(Object.size(players) == 1){
          io.to(socket.id).emit('players number', 2);
          mainServer.level[level].Container[mainServer.level[level].Player2 % mainServer.level[level].Width+Math.floor(mainServer.level[level].Player2 / mainServer.level[level].Width)*mainServer.level[level].Width] = '2'

          players[socket.id] = {
            playerNumber: 2,
            score: 0,
          };
      }
    }



      function win() {
        setTimeout(function(){io.emit('win');level += 1;}, 500);

        if(level == 9){
          mainServer.quitGame(totalScore,level+1);
          }
      }


      function update() {

        io.volatile.emit('players list', Object.values(players));
        io.emit('level data', mainServer.level);
        io.emit('level actual', level);
      }

      io.on('connection', function(socket) {

        socket.on('move left',  function(player) {
          var actualPos;
          for(let i = 0 ; i < mainServer.level[level].Container.length;i++){
            if(mainServer.level[level].Container[i] == player.toString()){
              actualPos = i;
            }
          }
          var move = 0;
          for(let i = 1 ; i < mainServer.level[level].Width;i++){
            if(actualPos - i > 0 && actualPos - i < mainServer.level[level].Width*mainServer.level[level].Lenght ){
              if(mainServer.level[level].Container[actualPos - i] == '0' || mainServer.level[level].Container[actualPos - i] == '5' || mainServer.level[level].Container[actualPos - i] == '6'){//If void or 5gold or 10 gold
                move += 1
                if(mainServer.level[level].Container[actualPos - i] == '5'){
                  mainServer.level[level].Container[actualPos - i] = '0'
                  players[socket.id].score += 5
                  totalScore += 5
                }
                if(mainServer.level[level].Container[actualPos - i] == '6'){
                  mainServer.level[level].Container[actualPos - i] = '0'
                  players[socket.id].score += 10
                  totalScore += 10
                }
              }else{
                if(mainServer.level[level].Container[actualPos - i] == '4'){
                  players[socket.id].score += 50;
                  totalScore += 50
                  win();
                }
                break;
              }
            }else{
              break;
            }
          }
          mainServer.level[level].Container[actualPos] = '0'
          mainServer.level[level].Container[actualPos - move] = player.toString()
        })

        socket.on('move right',  function(player) {
          var actualPos;
          for(let i = 0 ; i < mainServer.level[level].Container.length;i++){
            if(mainServer.level[level].Container[i] == player.toString()){
              actualPos = i;
            }
          }

          var move = 0;
          for(let i = 1 ; i < mainServer.level[level].Width;i++){
            if(actualPos + i > 0 && actualPos + i < mainServer.level[level].Width*mainServer.level[level].Lenght ){
              if(mainServer.level[level].Container[actualPos + i] == '0' || mainServer.level[level].Container[actualPos + i] == '5' ||mainServer.level[level].Container[actualPos + i] == '6'){
                move += 1
                if(mainServer.level[level].Container[actualPos + i] == '5'){
                  mainServer.level[level].Container[actualPos + i] = '0'
                  players[socket.id].score += 5;
                  totalScore += 5;
                }
                if(mainServer.level[level].Container[actualPos + i] == '6'){
                  mainServer.level[level].Container[actualPos + i] = '0'
                  players[socket.id].score += 10;
                  totalScore += 10;
                }
              }else{
                if(mainServer.level[level].Container[actualPos + i] == '4'){
                  players[socket.id].score += 50;
                  totalScore += 50;
                  win()
                }
                break;
              }
            }else{
              break;
            }
          }
          mainServer.level[level].Container[actualPos] = '0'
          mainServer.level[level].Container[actualPos + move] = player.toString()
        })

        socket.on('move up',    function(player) {
          var actualPos;
          for(let i = 0 ; i < mainServer.level[level].Container.length;i++){
            if(mainServer.level[level].Container[i] == player.toString()){
              actualPos = i;
            }
          }
          var move = 0;
          for(let i = 1 ; i < mainServer.level[level].Lenght;i++){
            if(actualPos - i*mainServer.level[level].Width > 0 && actualPos - i*mainServer.level[level].Width < mainServer.level[level].Width*mainServer.level[level].Lenght ){
              if(mainServer.level[level].Container[actualPos - i*mainServer.level[level].Width] == '0' || mainServer.level[level].Container[actualPos - i*mainServer.level[level].Width] == '5' || mainServer.level[level].Container[actualPos - i*mainServer.level[level].Width] == '6' ){
                move += 1
                if(mainServer.level[level].Container[actualPos - i*mainServer.level[level].Width] == '5'){
                  mainServer.level[level].Container[actualPos - i*mainServer.level[level].Width] = '0'
                  players[socket.id].score += 5
                  totalScore += 5;
                }
                if(mainServer.level[level].Container[actualPos - i*mainServer.level[level].Width] == '6'){
                  mainServer.level[level].Container[actualPos- i*mainServer.level[level].Width] = '0'
                  players[socket.id].score += 10
                  totalScore += 10;
                }
              }else{

                if(mainServer.level[level].Container[actualPos - i*mainServer.level[level].Width] == '4'){
                  players[socket.id].score += 50;
                  totalScore += 50;
                  win()
                }
                break;
              }
            }else{
              break;
            }
          }
          mainServer.level[level].Container[actualPos] = '0'
          mainServer.level[level].Container[actualPos - move*mainServer.level[level].Width] = player.toString()
        })

        socket.on('move down',    function(player) {
          var actualPos;
          for(let i = 0 ; i < mainServer.level[level].Container.length;i++){
            if(mainServer.level[level].Container[i] == player.toString()){
              actualPos = i;
            }
          }

          var move = 0;
          for(let i = 1 ; i < mainServer.level[level].Lenght;i++){
            if(actualPos + i*mainServer.level[level].Width > 0 && actualPos + i*mainServer.level[level].Width < mainServer.level[level].Width*mainServer.level[level].Lenght ){
              if(mainServer.level[level].Container[actualPos + i*mainServer.level[level].Width] == '0' || mainServer.level[level].Container[actualPos + i*mainServer.level[level].Width] == '5' || mainServer.level[level].Container[actualPos + i*mainServer.level[level].Width] == '6'){
                move += 1
                if(mainServer.level[level].Container[actualPos + i*mainServer.level[level].Width] == '5'){
                  mainServer.level[level].Container[actualPos + i*mainServer.level[level].Width] = '0'
                  players[socket.id].score += 5;
                  totalScore += 5;

                }
                if(mainServer.level[level].Container[actualPos + i*mainServer.level[level].Width] == '6'){
                  mainServer.level[level].Container[actualPos + i*mainServer.level[level].Width] = '0'
                  players[socket.id].score += 10;
                  totalScore += 10;
                }
              }else{
                if(mainServer.level[level].Container[actualPos + i*mainServer.level[level].Width] == '4'){
                  players[socket.id].score += 50;
                  totalScore += 50;
                  win()
                }
                break;
              }
            }else{
              break;
            }
          }
          mainServer.level[level].Container[actualPos] = '0'
          mainServer.level[level].Container[actualPos + move*mainServer.level[level].Width] = player.toString()
        })

        socket.on('quit game',    function() {
          mainServer.quitGame(totalScore,level);
          level = 10
        })
      });

      // delete disconnected player
      socket.on('disconnect', function() {
        delete players[socket.id];
      });
      setInterval(update, 1000/60);
    }else{
      console.log("Sorry, 2 players are connected")
    }
  });
};


Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
