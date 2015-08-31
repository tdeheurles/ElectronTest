@echo off


REM control args
if [%1]==[] goto usage


REM launch script
cd  app
set npm_config_disturl=https://atom.io/download/atom-shell
set npm_config_target=0.31.1
set npm_config_arch=x64
set HOME=~/.electron-gyp 
npm install %*
cd ..
exit /B 0


:usage
@echo usage :
@echo   parameter 1 : Give the name of a npm package to install
exit /B 1

