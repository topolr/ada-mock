let Path=require("path");
let File=require("./../base/lib/file");
let Parser=require("./../base/parser");

let info=Parser.parseDocumentInfo(new File(Path.resolve(__dirname,"./../test/test.yaml")).readSync());
console.log(JSON.stringify(info,null,4));
// Parser.setFinalInfo(info);
// debugger;