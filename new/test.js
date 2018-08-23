let File=require("./lib/file");
let Path=require("path");
let yaml=require("yamljs");

let result=yaml.parse(new File(Path.resolve(__dirname,"./test.yaml")).readSync());
console.log(JSON.stringify(result,null,4));
