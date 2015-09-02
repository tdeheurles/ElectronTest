# ElectronTest

This project main purpose is to present electron

    - Electron
        - electron-packager
        - ipc (main & renderer)
        - Browser-Window

I also use it as a brief tutorial for some other technologies :

    - ReactJS
    - Rx
    - Gulp
    - ES6 (babel)

### electron main concepts

Electron is `io.js server` that is `installed (without admin rights) on the client machine` in order to `run an application`. These application comes with a suite of helper to update, report bug and access the client machine.

When you start an electron application, a first process named `main` is started as an io.js webserver. This `main` process has access to `all the io.js packages`.

The language used to built your views are HTML/Javascript (with all the library/framework ...).  
This Gui is built on a fork of `chromium`. So, like chrome/chromium, every window is started in a `different process`. The `main` process will manage these views. A view is named a `BrowserWindow`. 

When you start a view, you give a URL to the code to be interpreted. These URL can bring to a local server hosted by the `main` process or to any other WebSite. You can choose at any time if you prefere a `local application, a remote application or an hybrid one`.

Electron comes with an async messagerie service : `ipc` to communicate from `main` to `views`. You can easily share `data`.

You can easily `add security` or `restrain` the different parts of your views.


### this project main concept

This project show a very simple view with two buttons.  
- The first one will spawn a view each time you click. These windows will use the `ipc` messagerie to receive a `Rx` stream of data to update. The update will be done with `ReactJS`.
- The second one will show a notification.

### context

This project has bin built on windows 7 for windows. On other plateform just have a look to the script in the main folder and adapt it to bash or something like that (few line of codes). It's very simple script commands (or open an issue if you want help).

### go-fast

- install [node.js](https://nodejs.org/en/download/)
- control that node path is in your **env PATH**
- `git clone https://github.com/tdeheurles/ElectronTest`
- in a PowerShell terminal : `run-server.ps1`
- in another PowerShell terminal : `run-electron.ps1`
- make a prayer
- test the electron app

if you've got some problems, go to [issues](#issues).

### File exploration

#### main path

##### run-electron.ps1

##### run-server.ps1

##### build-windows-package.ps1

##### npm-install.bat

#### electron

#### server

### issues

- Read slowly the [`go-fast`](#go-fast) instructions
- Have a look to the [file exploration](#file-exploration) after looking where the first error occur in your terminal.
