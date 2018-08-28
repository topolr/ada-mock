let Path = require("path");

module.exports = {
    basePath: Path.resolve(__dirname),
    apiPath: "./apis/",
    typesPath: "./types/",
    damlPath: "./test.daml",
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