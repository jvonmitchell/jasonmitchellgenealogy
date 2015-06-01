/**************************************************
*  To use:
*  require('./nodehelper')
*  loadFile()
*  Make edits
*  saveFile()
*
*
*
***************************************************/



var cjson = require('circular-json');
var exec = require('child_process').exec;
var fs = require('fs');



function prettycjson(obj,cb) {
 fs.writeFile('tempFile',stringify(obj),function(err) {
  exec('json-prettify tempFile',function(err,stdout,stderr) {
   fs.unlink('tempFile',console.log);
   cb(stdout);
  });
 });
};

function loadFile(optionalCB) {
 fs.readFile('genealogy.pretty.cjson',function(err,data) {
  global.jason = cjson.parse(data.toString('utf8'));
  if(optionalCB) {
   optionalCB(global.jason);
  }
 });
}

function saveFile(optionalObject) {
 var optionalObject = optionalObject ? optionalObject : global.jason
 prettycjson(optionalObject,function(output) {
  fs.writeFile('genealogy.pretty.cjson',output,function () {
   console.log('File written');
  });
 });
}

global.loadFile = loadFile;
global.saveFile = saveFile;
