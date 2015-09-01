# PowerShell script

$main_path        = "$pwd"
$electron_runtime = "$main_path\electron\packaging\electrontest-win32-x64"

cd $electron_runtime
.\electrontest.exe
