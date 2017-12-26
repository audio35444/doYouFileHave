const fs = require('fs');

const CodeFileDriver = class CodeFileDriver{
  constructor(filePath){
    this.filePath = filePath;
    this.strFile =  fs.readFileSync(filePath,'utf8').replace(/\r/g,'');
    this.arrToLines = this.strFile.split('\n');
    this.lineCant = this.arrToLines.length;
    this.charCant = this.strFile.length;
    this.regExpJSON = JSON.parse(fs.readFileSync(__dirname+'/./regexplist.json','utf8'));
    let regExpRequire = new RegExp(this.regExpJSON.searcher.require,'g');
    this.requireLibList = this.strFile.match(regExpRequire);
  }
  generateClonWithoutR(){
    let newStrFile = this.strFile.replace(/\r/g,'');
    fs.writeFileSync('./outputfile.js',newStrFile);
  }
}

module.exports.CodeFileDriver = CodeFileDriver;
