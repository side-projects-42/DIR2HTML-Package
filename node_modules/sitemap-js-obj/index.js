var fs = require('fs'),
    extfs = require('extfs'),
    path = require('path');

// get Directories using extfs getDirsSync fn
// accepts _path
function getDirectories(_path) {
    var _dir = fs.readdirSync(_path);
    return _dir;
}


// get FileType
// accepts file path

function getFileType(_file) {
    var _ft = '';

    if (fs.lstatSync(_file).isDirectory() == true) {
        _ft = 'folder';
    }

    if (fs.lstatSync(_file).isFile() == true) {
        _ft = path.parse(_file).ext;
    }
    return _ft;
}

// get Name
// accepts file path
// function getName(_file) {
//     var _ft = '';

//     if (fs.lstatSync(_file).isDirectory() == true) {
//         _ft = _file;
//     }

//     if (fs.lstatSync(_file).isFile() == true) {
//         _ft = path.parse(_file).name;
//     }
//     return _ft;
// }


// check if folder is empty to return (true or false)
// accepts path
function checkFolderContent(_path) {
    var _empty = extfs.isEmptySync(_path);
    return _empty;
}


// create object 
// accepts _array and _path to return object { type: '', name: '', path: '', children: '')
function creatObject(_path, _arr) {
    var _result = [];

    for (var i = 0; i < _arr.length; i++) {
        var _obj = new Object();

        _obj.type = getFileType(_path + _arr[i]);
        _obj.name = _arr[i];
        _obj.path = _path + _arr[i] + '/';

        // recursive object
        if (!checkFolderContent(_obj.path)) {
            _obj.children = smObj(_obj.path);
        } else {
            _obj.path = _path + _arr[i];
        }

        _result.push(_obj);
    }
    return _result;
}


// create a sitemap object
// accepts path
function smObj(_path) {
    var _arr = getDirectories(_path);
    var _obj = creatObject(_path, _arr);
    return _obj;
}


// exports smObj
module.exports = smObj;