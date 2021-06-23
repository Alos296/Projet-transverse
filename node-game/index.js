

var app = require('./app');
var io = require('./io/conf');
var debug = require('debug')('node-chat:server');
var http = require('http');

const mysql = require('mysql');

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var dataBase = require('./dataBase');

let con = mysql.createConnection({
  host: dataBase.host,
  user: dataBase.user,
  password: dataBase.password,
  database: dataBase.database
});

con.connect(function(err) {
  if (err) throw err;
    console.log('Server is running!');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
  next();
});


var port = normalizePort('3000');

app.set('port', port);

Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

con.query('SELECT * FROM Level',(err,results) => {
  if(err) throw err;
    for(let i = 0; i < Object.size(results); i++){
      results[i].Container = results[i].Container.split('');
    }
    exports.level = results
  });

app.get('/allGames', function (req, res) {
  con.query('SELECT * FROM Game',(err,results) => {
    if(err) throw err;
      res.json(results);
    });
})

app.post('/addGame', function (req, res) {
  var postData = "Test5";

  console.log("Ceci est un test");
  console.log(res.body);
  console.log(res.body[0].name);


  con.query("INSERT INTO `Game` (`ID`, `Pseudo1`, `Pseudo2`, `Time`, `Score`, `LastLvl`) VALUES (NULL, ?, '*', '00:00:00', '0', '0')",[postData],
  function (error, results, fields) {
  if (error) throw error;
    res.send(results);
  });
});






var server = http.createServer(app);


var sockets = io(server);


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
