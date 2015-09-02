# ElectronTest 

This project main purpose is to present electron

    - Electron
        - ipc (main & renderer)
        - Browser-Window
        - electron-packager

I also use it as a brief tutorial for some other technologies :

    - ReactJS
    - ReactBootstrap
    - Rx
    - Gulp
    - ES6 (babel)

Summary
- [Electron main concepts](#electron-main-concepts)
- [This project main concept](#this-project-main-concept)
- [Go-Fast](#go-fast)
- [File exploration](#file-exploration)
- [TODO](#todo)
- [Issues](#issues)

---

### Electron main concepts

Electron is `io.js server` that is `installed (without admin rights) on the client machine` in order to `run an application`. These application comes with a suite of helper to update, report bug and access the client machine.

When you start an electron application, a first process named `main` is started as an io.js webserver. This `main` process has access to `all the io.js packages`.

The language used to built your views are HTML/Javascript (with all the library/framework ...).  
This Gui is built on a fork of `chromium`. So, like chrome/chromium, every window is started in a `different process`. The `main` process will manage these views. A view is named a `renderer` process. 

When you start a view, you give a URL to the code to be interpreted. These URL can bring to a local server hosted by the `main` process or to any other WebSite. You can choose at any time if you prefer a `local application`, a `remote application` or an `hybrid one`.

Electron comes with an async messagerie service : `ipc` to communicate from `main` to `views`. You can easily share `data` with this channel.

You can `add security` or `restrain` the different parts of your views by turning on or off some options.

---

### This project main concept

This project show a very simple view with two buttons.  
- The first one will spawn a view each time you click. These windows will use the `ipc` messagerie to receive a `Rx` stream of data to update. The update will be done with `ReactJS`.
- The second one will show a notification.

The architecture is that one :
- a node server will host the files (distinct from the electron app)
- the electron app will run as a browser with additionnal capabilities

##### Context

This project has bin built on windows 7 for windows. On other plateform just have a look to the script in the main folder and adapt it to bash or something like that (few line of codes). It's very simple script commands (or open an issue if you want help).

At the moment, `electron version is 0.31.2`.

---

### Go-Fast

- install [node.js](https://nodejs.org/en/download/)
- control that node path is in your **env PATH**
- `git clone https://github.com/tdeheurles/ElectronTest`
- in a PowerShell terminal : `run-server.ps1`
- in another PowerShell terminal : `run-electron.ps1`
- make a prayer
- test the electron app

if you've got some problems, go to [issues](#issues).

---

### Electron project

The official `quick-start` is [here](http://electron.atom.io/docs/latest/tutorial/quick-start/), and you can find the documentation [here](http://electron.atom.io/docs/v0.31.0/).  

An electron project can be achieved with a minimum of 2 files :
```
app
 |--- main.js
 *--- package.json
```

The `package.json` is a standard node/iojs package file. We put some `metadata` and the `dependencies`. 
```json
{
  "name":    "ElectronTest",
  "version": "0.0.1",
  "main":    "main.js",
}
```

The `main.js` is the script that will start the application. A minimalist one will be of that kind :
```javascript
const app           = require('app');
const BrowserWindow = require('browser-window');

// close the main process when every renderer process are closed
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});


// start a process using app (the code speak by himself).
let mainWindow = null;
app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl('http://www.google.com');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
```

If you want to host files (like an index.html) with the application, you just have to add them to the `app` directory and to change URL of the mainWidow to something like `'file://' + __dirname + '/index.html'`  

When the application is package, 50mb of other files need to be downloaded. All this files just need to be copy/paste to the user filesystem.

### File exploration

#### electron

Our electron app is composed of two files : `main.js` and `package.json`.

**package.json** :  
```json
{
  "name":    "ElectronTest",
  "version": "0.0.1",
  "main":    "main.js",
  "dependencies": {
    "rx": "^3.1.2"
  }
}
```

It's a very simple package.json with an entry pointing to the `main.json` file. I have added a dependency : `Rx`. These dependency need to be uploaded before running the application (electron won't download it when run).

**main.js** :  
The main.js file is very simple with no idea of architecture.  
You will find first some globals defining the server and port. `jshint` and `use strict` will restrict the writing of javascript.  
```javascript
/* jshint node: true*/
'use strict';

const server_adress = "localhost"
const server_port   = 8123
```

We can find a `MAIN` part that will start the application and the first `renderer process`.  
```javascript
const app = require('app');
const BrowserWindow = require('browser-window');

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});


let atomScreen = null;
let mainWindow = null;
app.on('ready', function() {
  atomScreen = require('screen')

  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl("http://${server_adress}:${server_port}/index.html");

  mainWindow.openDevTools();

  mainWindow.on('closed', function() { mainWindow = null; });
});
```

The `app` is the object representing the `main` process.  
The `BrowserWindow` is the object that represent the `renderer` process.

This code will shut down the app if all window are closed :  
```javascript
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
```

We then start the application in a `window of 800*600`, ask to load the URL at `localhost:8123`, start the devtools (chromium tools to debug the GUI) and ask to delete the mainWindow instance if the user click on close. The `atomScreen` will be used after but need to be require after the app is ready.  
```javascript
let atomScreen = null;
let mainWindow = null;
app.on('ready', function() {
  atomScreen = require('screen')

  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl("http://${server_adress}:${server_port}/index.html");

  mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
```


#### index.html

Here we will find the different elements that will be loaded by our app.  
Each HTML is a very simple one with a css url and pointing to a different javascript file. For example :  
```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>ReactJS and ES6</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
</head>
<body>
    <script src="dist/app.js"></script>
</body>
</html>
```

So our electron app, when starting, open that `index.html`. This html file download a `css` file from bootstrap and our script `app.js`.

This `app.js` is a transpilation in ES5 from our source file `app.jsx` written in ES6. You can show [here](#server-process) how it's done.  
The app.jsx is defined in ReactJS. The code can be read like HTML where you can easily add some javascript code.  
```javascript
// First we import some element using ES6 syntaxe
import React from 'react';
import Tile   from './Tile.jsx'     // Tile is a ReactJS object (see after)
import { Button, ButtonGroup, 
         Grid, Row, Col, 
         OverlayTrigger,
         Label
       }        from 'react-bootstrap';     // React-Bootstrap propose lots of 
                                            //   already prepared component
// The function React.render take two parameters
// - a HTML like element.
// - the element where that generated HTML will be put (document.body)
// 
// Here I just put a text Element in the first Row, second column. And a Tile element in the second Row, second column.
// You also can see that we have an easy responisve design achieved with ReactBootstrap.
React.render(
  <Grid>
    <Row>
      <Col xs={1} md={4}></Col>
      <Col xs={10} md={4} className="text-center">
        ElectronTest
      </Col>
      <Col xs={1} md={4}></Col>
    </Row>

    <Row>
      <Col xs={4} md={4}></Col>
      <Col xs={4} md={4}>
          <Tile Title="Create a RxWindow" />
      </Col>
      <Col xs={4} md={4}></Col>
    </Row>
  </Grid>, 
  document.body 
);
```

Then we can find our `Tile.jsx` object used in the `app.jsx` element :  
```javascript
// We import some dependencies
import React      from 'react';
import { Button } from 'react-bootstrap';

// here we create a class Tile
//   - that extends React.Component
//   - that will be export as default (behind the scope of this tutorial)
export default class Tile extends React.Component {
    
    // we first define a function tin the ES6 syntaxe.
    //   this code permit to avoid browserify to through an error when trying 
    //   to import an element that won't exist at transpil time. 
    //   For example, we will import ipc that will just exist at runtime, 
    //     and only on electron browser
    executionTimeRequire = (name) => { return require(name) }

    // Here is the handler for button of this object
    createTile = (e) => {
        // We require ipc
        var ipc = this.executionTimeRequire('ipc')
        // We use that IPC to send a message to the main process
        //   on the 'create_someReactView' topic
        // Our message does not comport data (empty envelope)
        ipc.send('create_someReactView', null)
  }
  
  // Here is the code that define the visual of our object. 
  // It's just a button
  render() {
    return (
      <Button onClick={this.createTile}>{this.props.Title}</Button>
     );
  }
}
```


#### IPC

So we sent a message to our main process on the `create_someReactView` topic.  
Look at the corresponding code in the main process file `main.js` in the electron folder :  
```javascript
// We require ipc. Here, the code is not transpiled or browserified so we 
// can just use `require`
const ipc_main = require('ipc')

// The first and second topics will trigger a function when a message is 
// received. It's used to create different `renderer` process.  
ipc_main.on('create_someReactView', function(event, arg) {
  create_someReactView()
})
```

```javascript
function create_someReactView(){
  // we first use the atomScreen generated at the application start
  //   to get the screen size
  const screen_size = atomScreen.getPrimaryDisplay().workAreaSize;

  // we define the width of our view 
  //  (can be done more dynamically)
  const notification_width = 200
  const notification_height = 130

  // we prepare the position of our view at the bottom right
  const notification_x = screen_size.width - notification_width - 10
  const notification_y = screen_size.height - notification_height - 10

  // we instantiate our renderer process
  const notification = new BrowserWindow({
    'width':          notification_width,
    'height':         notification_height,
    'frame':          false,
    'show':           false,
    'x':              notification_x,
    'y':              notification_y
  });

  // We load an Url from our server  
  notification.loadUrl('http://${server_adress}:${server_port}/SomeReactView.html')

  // and we show our View
  notification.show()
}
```

`SomeReactView.html` is exactly the same as `index.html`. It just point to `SomeReactView.js` (that is transpiled from `SomeReactView.jsx`) :  
```javascript
import React  from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import SomeViewModel from './SomeViewModel.js'

export default class SomeReactView extends React.Component {
    // ES6 constructor
    constructor(props) {
        super(props);

        // an initialiser object
        const someViewModel = new SomeViewModel([0,0,0, 0,0,0, 0,0,0,
                                                 0,0,0, 0,0,0, 0,0,0,
                                                 0,0,0, 0,0,0, 0,0,0,
                                                 0,0,0, 0,0,0, 0,0,0 ])
        
        // we define the initial state of our view
        this.state = { someViewModel: someViewModel };
    }
  
    // same as before
    executionTimeRequire = (name) => { return require(name) }

    // We ask the component to do something just before appearing
    componentWillMount() {
        // We initiate our messaging tool
        const ipc = this.executionTimeRequire('ipc')

        // We prepare to receive updates :
        // When we receive data on the `update` topic
        ipc.on('update', (data) => {
            // we create a new ViewModel from the data
            let newViewModel = this.state.someViewModel
            newViewModel.elements = data
            // we set the state to that new viewModel 
            // react will generate the new component from that state
            this.setState({someViewModel: newViewModel});
        })

        // We send a message on the 'give_it_to_me' topic (empty envelope)
        ipc.send('give_it_to_me', null)
    }

  // as for all ReactJS, the visual part of the element
  //   here we just have something like a table (that can 
  //     have be put in another object)
  // We can notice the style added for the Gui. It's a html class that
  //   correspond to electron (need to be added on frameless view)
  render() {
    return (
      <Grid style={{'-webkit-app-region': 'drag'}}>
        <Row>
          <Col xs={1}>{this.state.someViewModel.elements[0]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[1]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[2]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[3]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[4]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[5]}</Col>
        </Row>
        [...]
      </Grid>
     );
  }
}

// We instiate a SomeReactView (defined just before)
//   and we put it directly under the body of the html 
//     (erasing everything defined inside)
React.render(
  <SomeReactView />,
  document.body 
);

```

As a summary, we have started the `main process` of an electron application. That `main process` have started a `first renderer process` with the code at `localhost:8123/index.html`.  
We then have clicked a button in that view. The trigger have sent an IPC message to the `main process` to request the creation of a new `renderer process`.  
The `second renderer process` have started. Just before appearing (ComponentWillMount) have sent a new `IPC message` to the `main process`. That last message was an empty envelope on the `give_it_to_me` topic.  

#### Rx

We look now inside the `main process` code in the `app.js` file.  

This code is separated in three elements.  
The first will permit to trigger an action on the reception of a message on the topic `give_it_to_me` :  
```javascript
// We know that the message is an empty envelope so we don't care of arg. event will be used later to find the author of the message with `event.sender`
ipc_main.on('give_it_to_me', function(event, arg) {
  console.log("stream requested")
  //[...]
})
```

The second will create a pattern for a sequence.  
For that we create a source by using Rx.Observable.timer(100,16). At this point, we have an `infinite sequence` espaced by `16ms` that will start after `100ms`.  
Then we map each `ping` with a value. In this case, I return an array of two random elements. The first element will be the cell to update in the SomeReactView, the other will be the number that will appear :  
```javascript
  console.log("stream requested")
  const Rx = require('rx')
  const source = Rx.Observable
                 .timer(100,16)
                 .map(function(x) { 
                    return [  
                      Math.floor((Math.random() * 36) + 1),
                      Math.floor((Math.random() * 100) + 1)
                    ]});
```

For a better understanding :  
```
-------------------------------------------------------------> time
<--- 100ms ---> | <- 16ms -> | <- 16ms -> | <- 16ms -> |
                |            |            |            |
             [25,99]      [12,47]      [01,76]      [14,28]
```

Finally we `subscribe` to this pattern and tell what we want to do when :  
- we receive a value
- an error is thrown
- the sequence is terminated (here it won't happen)

```javascript
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
```

Each click on the main view button should generate a new GUI with a lot of number changing fast. The CPU will determine the number of GUI that can be generated (it's a simple HelloWorld here).

#### server process

#### main path

##### run-electron.ps1

##### run-server.ps1

##### build-windows-package.ps1

##### npm-install.bat

### Issues

- Read slowly the [`go-fast`](#go-fast) instructions
- Have a look to the [file exploration](#file-exploration) after looking where the first error occur in your terminal.
- Do not hesitate to [open an issue on github](https://github.com/tdeheurles/ElectronTest/issues)  