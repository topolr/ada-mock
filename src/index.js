let Path = require("path");
let config = require("./config");
let loggd = require("loggd");
let File = require("./lib/file");
let Base = require("./base");

class Daml {
    constructor(configPath) {
        let conf = require(configPath);
        let _config = Object.assign({}, config, conf);
        _config.typesPath = Path.resolve(_config.basePath, _config.typesPath);
        _config.damlPath = Path.resolve(_config.basePath, _config.damlPath);

        new File(_config.typesPath + "/").scan().forEach(path => {
            Base.getTypes().addType(require(path));
        });

        let db = new loggd("/path/to/json/file.json")
        this.config = _config;
        this.db = db;
    }
}

let damlInstance = null;

module.exports = function (configPath) {
    if (!damlInstance) {
        damlInstance = new Daml(configPath);
    }
    return damlInstance;
};