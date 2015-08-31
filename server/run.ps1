@ECHO off
set DOCKER_HOST=tcp://192.168.99.101:2376
set DOCKER_TLS_VERIFY=1
set DOCKER_CERT_PATH=c:\Users\shinmox\.docker\machine\machines\default
docker run -ti --rm                                         ^
  -v /c/Users/shinmox/repository/ElectronTest:/electrontest ^
  mhart/alpine-node:latest                                  ^
      sh

set image=mhart/alpine-node
set local_path=/c/Users/shinmox/repository/ElectronTest

@ECHO on
REM docker run -ti                                                ^
REM     -v /c/Users/shinmox/repository/ElectronTest:/ElectronTest ^
REM     -v /c/Users/shinmox/.npm:/root/npm                        ^
REM     -v /c/Users/shinmox/.nvm:/root/nvm                        ^
REM     %image%                                                   ^
REM        bash

REM docker run -ti                    ^
REM     -v %local_path%:/ElectronTest ^
REM     %image%                       ^
REM        bash
