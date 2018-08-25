let Parser = require("./parser");
let Types = require("./types");

let util = {
    parseDocumentInfo(content) {
        return Parser.parseDocumentInfo(content);
    }
    getTypes() {
        return Types;
    }
};

module.exports = util;