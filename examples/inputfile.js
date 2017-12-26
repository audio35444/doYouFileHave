#!/usr/bin/env node

const {getArgs} = require('./utilities/globalutilites.js');
const child_process = require('child_process');
const shell = require('shelljs');

// let result = getArgs();
// console.log(result);
// child_process.exec(`cd c:/`,(error, stdout, stderr)=>{
//   if (error) console.log('ERROR',error);
//   console.log(stdout);
//   console.log(stdout);
//   child_process.exec(`dir c:/`,(err,stdout,stderr)=>{
//     console.log(stdout);
//   });
// });
//
// // shell.cd('c:/');
// // console.log(shell.ls());
// var robot = require("robotjs");
//
// // Type "Hello World".
// robot.typeString("Hello World");
// robot.moveMouse(100, 100);
//
// //Get a 100x100 screen capture starting at 0, 0.
// var img = robot.screen.capture(50, 50, 100, 100);
//
// console.log(img.width)
//
// //Get pixel color at 50, 50.
// var hex = img.colorAt(50, 50);
// const fs = require('fs');
// fs.writeFile('./newprueba.png',img, 'binary', (err,data)=>{
//   if(err)console.log(err);
// })
// console.log(hex);
var screenshot = require('desktop-screenshot');

screenshot("screenshot.png",{width: 100,height:100}, function(error, complete) {
    if(error)
        console.log("Screenshot failed", error);
    else
        console.log("Screenshot succeeded");
});
