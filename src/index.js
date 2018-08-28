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

        let db = new loggd(_config.damlPath);
        this.config = _config;
        this.db = db;
    }

    init() {
        return new File(this.config.apiPath + "/").scan().filter(path => Path.extname(path) === ".yaml").map(path => {
            return {
                hash: new File(path).hash(),
                path,
                url: path.substring(this.config.apiPath.length + 1),
                doc: Base.parseDocumentInfo(new File(path).readSync())
            }
        }).reduce((a, info) => {
            console.log(info);
            return a.then(() => {
                return this.db.insert(info);
            });
        }, Promise.resolve());

    }
}

let damlInstance = null;

module.exports = function (configPath) {
    if (!damlInstance) {
        damlInstance = new Daml(configPath);
    }
    return damlInstance;
};