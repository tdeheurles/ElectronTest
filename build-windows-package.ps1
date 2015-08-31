# PowerShell script

# TODO: pack in docker container

# add electron-packager to npm
npm install electron-packager -g

$sourcedir          = "$pwd\electron\"
$appname            = "electrontest"
$platform           = "win32"
$arch               = "all"
$electron_version   = "0.31.1"
$app_version        = "0.0.0"
$output_directory   = "$pwd\electron\packaging"
$cache_directory    = "$pwd\electron\packaging\cache"

#cd $sourcedir

electron-packager               `
    $sourcedir                  `
    $appname                    `
    --platform=$platform        `
    --arch=$arch                `
    --version=$electron_version `
    --app-version=$app_version  `
    --out=$output_directory     `
    --cache=$cache_directory    `
    --overwrite                 `
    --ignore=node_modules       `
    --ignore=packaging
