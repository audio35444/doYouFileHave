const fs = require('fs');
let jsonObj,
str = `#!/usr/bin/env node\n//console.log(process);str.replace(/[^-]*/.exec(str),\'\').replace(/-/,\'\').trim().replace(/S*/,\'\').trim()\n\nconst rimraf = require(\'rimraf\');\nconst fs = require(\'fs\');\nconst path = require(\'path\');\nconst clearScreen = ()=>console.log("\u001b[2J\u001b[0;0H");\nconst child_process = require(\'child_process\');\nconst chalk = require(\'chalk\');\n//console.log(process.title);\n\n//console.log(\'hola\');`;

const readJson =  (callback) => {
  fs.readFile(__dirname+'/./regexplist.json','utf8',(err,data)=>{
    if(!err){
      jsonObj=JSON.parse(data);
      let regExpRequire = new RegExp(jsonObj.searcher.require,'g');
      let regExpRequireLib = new RegExp(jsonObj.searcher.requireLib);
      let regExpRequireVarName = new RegExp(jsonObj.searcher.requireVarName);
      let regExpRequireVarType = new RegExp(jsonObj.searcher.requireVarType);
      let result = str.match(regExpRequire);
      let arrObjJSON = [];

      result.forEach((element) => {
        let newElement={};
        newElement.fullStr = element;
        //return lib names
        let requireLib = regExpRequireLib.exec(element);
        if (requireLib) {
          newElement.requireLib = requireLib[1];
        }
        //return var names
        let requireVarName = regExpRequireVarName.exec(element);
        if (requireVarName) {
          newElement.requireVarName = requireVarName[1];
        }
        //return var type
        let requireVarType = regExpRequireVarType.exec(element);
        if (requireVarType) {
          newElement.requireVarType = requireVarType[1];
        }
        arrObjJSON.push(newElement);
      });
      callback(arrObjJSON);
    }else {
      console.log(err);
      return {};
    }
  });
};
const readCodeFile = (callback)=>{
  fs.readFile(__dirname+'/../index.js','utf8',(error,dataCode)=>{
    if(!error){
      str = dataCode;
      readJson(callback);
    }else {
      console.log(error);
      return {};
    }
  });
};
const changeLibrery= (oldLib, newLib,callback,afterArrObjJSON) => {
  const replaceLib=(arrObjJSON)=>{
    arrObjJSON.forEach(element=>{
      if(element.requireLib===oldLib){
        let regExpReplaceLib = new RegExp(jsonObj.replacer.replaceLib);
        let i=arrObjJSON.indexOf(element);
        element.newFullStr = element.newFullStr?element.newFullStr.replace(regExpReplaceLib,(match,$1,$2,$3)=>$1+newLib+$3):element.fullStr.replace(regExpReplaceLib,(match,$1,$2,$3)=>$1+newLib+$3);
        arrObjJSON[i] = element;
      }
    });
    if(callback)callback(arrObjJSON);
    else console.log(arrObjJSON);
  };
  if(afterArrObjJSON) replaceLib(afterArrObjJSON);
  else readCodeFile(replaceLib);
};
const changeVarName= (oldVarName, newVarName,callback,afterArrObjJSON) => {
  const replaceVarNam=(arrObjJSON)=>{
    arrObjJSON.forEach(element=>{
      if(element.requireVarName===oldVarName){
        let regExpReplaceVarName = new RegExp(jsonObj.replacer.replaceVarName);
        let i=arrObjJSON.indexOf(element);
        element.newFullStr = element.newFullStr?element.newFullStr.replace(regExpReplaceVarName,(match,$1,$2,$3)=>$1+newVarName+$3):element.fullStr.replace(regExpReplaceVarName,(match,$1,$2,$3)=>$1+newVarName+$3);
        arrObjJSON[i] = element;
      }
    });
    if(callback)callback(arrObjJSON);
    else console.log(arrObjJSON);
  };
  if(afterArrObjJSON) replaceVarNam(afterArrObjJSON);
  else readCodeFile(replaceVarNam);
};
const changeVarType = (searchVal,newVal,searchType,callback,afterArrObjJSON) => {
  const replaceVarType = (arrObjJSON) => {
    arrObjJSON.forEach(element=>{
      if(element[searchType]===searchVal){
        let regExpReplaceVarType = new RegExp(jsonObj.replacer.replaceVarType);
        let i=arrObjJSON.indexOf(element);
        element.newFullStr = element.newFullStr?element.newFullStr.replace(regExpReplaceVarType,(match,$1,$2)=>newVal+$2):element.fullStr.replace(regExpReplaceVarType,(match,$1,$2)=>newVal+$2);
        arrObjJSON[i] = element;
      }
    });
    if(callback)callback(arrObjJSON);
    else console.log(arrObjJSON);
  };
  if(afterArrObjJSON) replaceVarType(afterArrObjJSON);
  else readCodeFile(replaceVarType);
};
//let variable = await readCodeFile(readJson);// es ES8 por eso no funciona

//es el equivalente a __name__==__main__ en python
if(typeof require != 'undefined' && require.main == module){
  readCodeFile((arrObjJSON)=>{console.log(arrObjJSON);});
}else {
  module.exports.readCodeFile = readCodeFile;
  module.exports.changeLibrery = changeLibrery;
  module.exports.changeVarName = changeVarName;
  module.exports.changeVarType = changeVarType;
  module.exports.str = str;
}
//example
//replace $2 and concatenate $1 + newStr + $3
//re = /(^hola[\s\S]*log\(\"?)([\s\S]*)(\"\)\;)/
//str1.replace(re,(match,$1,$2,$3)=>$1+'helloworld'+$3)
