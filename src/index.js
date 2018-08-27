let Path = require("path");
let config = require("./config");
let loggd = require("loggd");
let File = require("./lib/file");
let Base = require("./base");

class Daml {
    constructor(configPath) {
        let conf = require(configPath);
        let _config = Object.assign({}, config, conf);
        _config.apiPath = Path.resolve(_config.basePath, _config.apiPath);
        _config.typesPath = Path.resolve(_config.basePath, _config.typesPath);
        _config.damlPath = Path.resolve(_config.basePath, _config.damlPath);

        if (!new File(_config.typesPath).isExists()) {
            new File(_config.typesPath + "/").scan().forEach(path => {
                Base.getTypes().addType(require(path));
            });
        }

        if (!new File(_config.damlPath).isExists()) {
            new File(_config.damlPath).create();
        }

        let db = new loggd(_config.damlPath);
        this.config = _config;
        this.db = db;
    }

    init() {
        new File(this.config.apiPath).scan().forEach(path => {
        });
    }
}

let damlInstance = null;

module.exports = function (configPath) {
    if (!damlInstance) {
        damlInstance = new Daml(configPath);
    }
    return damlInstance;
};