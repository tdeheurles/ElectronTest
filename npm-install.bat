@echo off

cd  electron\packaging\electrontest-win32-x64\resources\app

set npm_config_disturl=https://atom.io/download/atom-shell
set npm_config_target=0.31.1
set npm_config_arch=x64
set HOME=~/.electron-gyp 
npm install %*
exit /B 0
