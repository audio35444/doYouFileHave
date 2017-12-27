const fs = require('fs');

const CodeFileDriver = class CodeFileDriver{
  constructor(filePath){
    this.filePath = filePath;
    this.fileName = this.filePath.replace(/[\s\S]*\//g,'');
    this.strFile =  fs.readFileSync(filePath,'utf8').replace(/\r/g,'');
    this.arrToLines = this.strFile.split('\n');
    this.lineCant = this.arrToLines.length;
    this.charCant = this.strFile.length;
    this.regExpJSON = JSON.parse(fs.readFileSync(__dirname+'/./regexplist.json','utf8'));
    let regExpRequire = new RegExp(this.regExpJSON.searcher.require,'g');
    this.requireLibList = this.strFile.match(regExpRequire).map(result => {
      let libList = {};
      libList["requireValue"]=result;
      for(let i in this.arrToLines){
        if(this.arrToLines[i].indexOf(result)!=-1){
          libList["requireRow"]= parseInt(i)+1;
          let regExpComment = new RegExp(this.regExpJSON.searcher.requireCommented);
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
}

module.exports.CodeFileDriver = CodeFileDriver;
