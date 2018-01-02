const fs = require('fs');

const CodeFileDriver = class CodeFileDriver{
  constructor(filePath){
    this.filePath = filePath;
    this.arrObjJSON = [];
    this.fileName = this.filePath.replace(/[\s\S]*\//g,'');
    this.strFile =  fs.readFileSync(filePath,'utf8').replace(/\r/g,'');
    this._constructor();
  }
  _constructor(){
    this.arrToLines = this.strFile.split('\n');
    this.lineCant = this.arrToLines.length;
    this.charCant = this.strFile.length;
    this._regExpJSON = JSON.parse(fs.readFileSync(__dirname+'/./regexplist.json','utf8'));
    let regExpRequire_search = new RegExp(this._regExpJSON.searcher.require,'g');
    let regExpRequireLib_search = new RegExp(this._regExpJSON.searcher.requireLib);
    let regExpRequireVarName_search = new RegExp(this._regExpJSON.searcher.requireVarName);
    let regExpRequireVarType_search = new RegExp(this._regExpJSON.searcher.requireVarType);
    this.requireLibList = this.strFile.match(regExpRequire_search).map(result => {
    let libList = {};
    libList.isRequire = true;
    //return lib names
    let requireLib = regExpRequireLib_search.exec(result);
    if (requireLib) {
      libList.requireLib = requireLib[1];
    }
    //return var names
    //console.log( regExpRequireVarName_search.exec(result));
    //console.log(result.match(regExpRequireVarName_search));
    let requireVarName = result.match(regExpRequireVarName_search);
    // console.log(requireVarName[1],requireVarName[2]);
    libList.requireVarName= (requireVarName[1] != undefined)? requireVarName[1].split(','): requireVarName[2];
    libList.exportType = Array.isArray(libList.requireVarName)?"varExport":"defaultExport";
    //return var type
    let requireVarType = regExpRequireVarType_search.exec(result);
    if (requireVarType) {
      libList.requireVarType = requireVarType[1];
    }
    libList["requireValue"]=result;
    for(let i in this.arrToLines){
      if(this.arrToLines[i].indexOf(result)!=-1){
        libList["requireRow"]= parseInt(i)+1;
        let regExpComment = new RegExp(this._regExpJSON.searcher.requireCommented);
        libList["isComment"]=regExpComment.test(this.arrToLines[i]);

      }
    }
    return libList;
  });
  }
  generateClonWithoutR(){
    let newStrFile = this.strFile.replace(/\r/g,'');
    fs.writeFileSync('./outputfile.js',newStrFile);
  }
  generateClonToFile(clonFilePath='./clone'+this.fileName){
    this.clonFilePath = clonFilePath;
    fs.writeFileSync(this.clonFilePath,this.strFile);
  }
  _generalChangeLib(index,newLib){
    let regExpReplaceLib = new RegExp(this._regExpJSON.replacer.replaceLib);
    let newRequireValue=this.requireLibList[index].requireValue.replace(regExpReplaceLib,(match,$1,$2,$3)=>$1+newLib+$3);
    this.strFile=this.strFile.replace(this.requireLibList[index].requireValue,newRequireValue);

  }
  changeLibWithLib(oldLib,newLib){
    for(let index in this.requireLibList){
      if(this.requireLibList[index].requireLib == oldLib){
      this._generalChangeLib(index,newLib);
      }
    }
    this._constructor();
  }
  //cambia todo el path ej.
  //si el path es const {getArgs,newArgs} = require(\'./utilities/globalutilites.js\');
  // y el newLib='utilidades-lib'
  //result => const {getArgs,newArgs} = require(\'utilidades-lib\');
  changeLibWithVarNameAll(varName,newLib){
    for(let index in this.requireLibList){
      if(Array.isArray(this.requireLibList[index].requireVarName)){
        if(this.requireLibList[index].requireVarName.indexOf(varName) !=-1){
          this._generalChangeLib(index,newLib);
        }
      }else if(this.requireLibList[index].requireVarName == varName){
        this._generalChangeLib(index,newLib);
      }
    }
    this._constructor();
  }
  //cambia el path solo para la varName señalada
  //si el path es const {getArgs,newArgs} = require(\'./utilities/globalutilites.js\');
  // y el newLib='utilidades-lib' y el varName='getArgs'
  //result => const {newArgs} = require(\'./utilities/globalutilites.js\');
  //          const {getArgs} = require(\'utilidades-lib\');
  //se guarda en
  changeLibWithVarName(varName,newLib){
    let thisRef =this;
    let index = 0;
    let lengthToNow = thisRef.requireLibList.length;
    for(; index<lengthToNow;index++){
      if(thisRef.requireLibList[index] != undefined){
        if(Array.isArray(thisRef.requireLibList[index].requireVarName)){
          if(thisRef.requireLibList[index].requireVarName.indexOf(varName) !=-1 && thisRef.requireLibList[index].isRequire){
              let regExpRequireVarName = new RegExp(thisRef._regExpJSON.replacer.requireVarName);
              let regExpReplaceLib = new RegExp(thisRef._regExpJSON.replacer.replaceLib);
              let tempRequireVarName = thisRef.requireLibList[index].requireVarName.filter((element)=>element!=varName);
              let result1 ='';
              if(tempRequireVarName.length>0)result1=`${thisRef.requireLibList[index].requireVarType} \{ ${tempRequireVarName.join(',')} \} = require\(\'${thisRef.requireLibList[index].requireLib}\'\);\n`;
              let result2 =`${thisRef.requireLibList[index].requireVarType} \{ ${varName} \} = require\(\'${newLib}\'\);`;
              let newRequireValue=result1+result2;
              thisRef.strFile=thisRef.strFile.replace(thisRef.requireLibList[index].requireValue,newRequireValue);
          }
        }
      }
    }
    thisRef._constructor();
  }
  // changeLibrery(oldLib, newLib,callback,afterArrObjJSON) {
  //   const replaceLib=(this.arrObjJSON)=>{
  //     this.arrObjJSON.forEach(element=>{
  //       if(element.requireLib===oldLib){
  //         let regExpReplaceLib = new RegExp(this.regExpJSON.replacer.replaceLib);
  //         let i=this.arrObjJSON.indexOf(element);
  //         element.newFullStr = element.newFullStr?element.newFullStr.replace(regExpReplaceLib,(match,$1,$2,$3)=>$1+newLib+$3):element.fullStr.replace(regExpReplaceLib,(match,$1,$2,$3)=>$1+newLib+$3);
  //         this.arrObjJSON[i] = element;
  //       }
  //     });
  //     if(callback)callback(this.arrObjJSON);
  //     else console.log(this.arrObjJSON);
  //   };
  //   if(afterArrObjJSON) replaceLib(afterArrObjJSON);
  //   else readCodeFile(replaceLib);
  // }
  // loadArrObjJSON(){
  //   jsonObj=JSON.parse(data);
  //   let regExpRequire = new RegExp(jsonObj.searcher.require,'g');
  //   let regExpRequireLib = new RegExp(jsonObj.searcher.requireLib);
  //   let regExpRequireVarName = new RegExp(jsonObj.searcher.requireVarName);
  //   let regExpRequireVarType = new RegExp(jsonObj.searcher.requireVarType);
  //   let result = str.match(regExpRequire);
  //   let arrObjJSON = [];
  //
  //   result.forEach((element) => {
  //     let newElement={};
  //     newElement.fullStr = element;
  //     //return lib names
  //     let requireLib = regExpRequireLib.exec(element);
  //     if (requireLib) {
  //       newElement.requireLib = requireLib[1];
  //     }
  //     //return var names
  //     let requireVarName = regExpRequireVarName.exec(element);
  //     if (requireVarName) {
  //       newElement.requireVarName = requireVarName[1];
  //     }
  //     //return var type
  //     let requireVarType = regExpRequireVarType.exec(element);
  //     if (requireVarType) {
  //       newElement.requireVarType = requireVarType[1];
  //     }
  //     arrObjJSON.push(newElement);
  //   });
  //   callback(arrObjJSON);
  // }
}

module.exports.CodeFileDriver = CodeFileDriver;
