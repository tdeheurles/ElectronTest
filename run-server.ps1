# powershell

$main_path   = "$pwd"
$server_path = "$main_path\server"

cd $server_path

.\run-server.ps1

cd $main_path
