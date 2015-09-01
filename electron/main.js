/* jshint node: true*/
'use strict';

var Rx = require('rx')

var atomScreen = null;


// ============ IPC ==============
// ===============================
var ipc_main = require('ipc')

ipc_main.on('create_someReactView', function(event, arg) {
  create_someReactView()
})

ipc_main.on('notification_been_clicked', function(event, arg) {
  console.log(arg)
});

ipc_main.on('kill_me', function(event, arg) {
  console.log(arg)
});

let cache = [0,0,0, 0,0,0, 0,0,0,
             0,0,0, 0,0,0, 0,0,0,
             0,0,0, 0,0,0, 0,0,0,
             0,0,0, 0,0,0, 0,0,0 ]

ipc_main.on('give_it_to_me', function(event, arg) {
  console.log("stream requested")
  var source = Rx.Observable
                 .timer(100,16)
                 .map(function(x) { 
                    return [  
                      Math.floor((Math.random() * 36) + 1),
                      Math.floor((Math.random() * 100) + 1)
                    ]});

  source.subscribe(
    function (x) {
      cache[x[0]] = x[1]
      event.sender.send('update', cache)
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    }
  );
})



// ============ MAIN ==============
// ================================
var app = require('app');
var BrowserWindow = require('browser-window');

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

var mainWindow = null;
app.on('ready', function() {
  atomScreen = require('screen')

  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl('http://localhost:8123/index.html');

  mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});




// ============== FUNCTIONS =============
// ======================================
function create_someReactView(){
  const screen_size = atomScreen.getPrimaryDisplay().workAreaSize;

  const notification_width = 200
  const notification_height = 130

  const notification_x = screen_size.width - notification_width - 10
  const notification_y = screen_size.height - notification_height - 10

  var notification = new BrowserWindow({
    'width':          notification_width,
    'height':         notification_height,
    'frame':          false,
    'transparent':    true,
    'always-on-top':  true,
    'show':           false,
    'x':              notification_x,
    'y':              notification_y
  });
  
  notification.loadUrl('http://localhost:8123/SomeReactView.html')
  notification.show()
}