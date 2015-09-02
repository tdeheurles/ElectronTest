# PowerShell script

$main_path        = "$pwd"
$electron_runtime = "$main_path\electron\packaging\electrontest-win32-x64"

.\build-windows-package.ps1
.\npm-install-for-electron.bat

cd $electron_runtime
.\electrontest.exe
