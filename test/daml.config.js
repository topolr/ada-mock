let Path = require("path");

module.exports = {
    basePath: Path.resolve(__dirname),
    apiPath: "./apis/",
    typesPath: "./types/",
    damlPath: "./test.damls",
    types: [
        {
            name: "date2",
            length: 200,
            defaultValue: "",
            generateProfile: "",
            validateProfile: "",
            generate(...args) {
            },
            validate(value) {
            }
        }
    ]
};