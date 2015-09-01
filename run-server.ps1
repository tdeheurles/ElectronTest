# powershell

$main_path   = "$pwd"
$server_path = "$main_path\server"

cd $server_path

npm install
npm run gulp

cd $main_path
