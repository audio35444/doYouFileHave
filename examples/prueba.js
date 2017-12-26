const {readCodeFile,changeLibrery,changeVarName,changeVarType} = require('./regExpTester.js');
const {CodeFileDriver} = require('./codefiledriver.js');

//using getter to arr Object JSON
// readCodeFile((arrObjJSON)=>{
//   console.log(arrObjJSON);
// });
// changeLibrery('csvtojson','cambiodelib');
// changeVarName('csv','cambiodeVarName');


changeVarType('const','let','requireVarType',(arrObjJSON)=>{
  changeVarName('csv','cambiodeVarName',(arrObjJSON)=>{
    changeLibrery('csvtojson','cambiodelib',(arrObjJSON) => {
      // this i can work with arrObjJSON
      //console.log(arrObjJSON);
      // const {str} = require('./regExpTester.js');
      // console.log(str);
    },arrObjJSON);
  },arrObjJSON);
});

let newObjFile = new CodeFileDriver(__dirname+'/./inputfile.js');
console.log(newObjFile);
newObjFile.generateClonWithoutR();
//(searchVal,newVal,searchType,callback,afterArrObjJSON)
//example
//replace $2 and concatenate $1 + newStr + $3
//re = /(^hola[\s\S]*log\(\"?)([\s\S]*)(\"\)\;)/
//str1.replace(re,(match,$1,$2,$3)=>$1+'helloworld'+$3)
