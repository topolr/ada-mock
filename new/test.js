let File = require("./lib/file");
let Path = require("path");
let yaml = require("yamljs");
let os = require("os");

let content = new File(Path.resolve(__dirname, "./test.yaml")).readSync();

let lines = content.split(os.EOL), _lines = [];
lines.map(line => {
	if (line.indexOf("#") !== -1 && line.trim()[0] === "#") {
		return {append: true, line};
	} else {
		return {append: false, line};
	}
}).forEach(line => {
	if (line.append) {
		let f = line.line.trim().substring(1);
		if (!_lines[_lines.length - 1]) {
			_lines.push(f);
		} else {
			if (_lines[_lines.length - 1].indexOf("#") !== -1) {
				_lines[_lines.length - 1] = _lines[_lines.length - 1] +" || "+ f;
			} else {
				_lines[_lines.length - 1] = _lines[_lines.length - 1] + "#" + f;
			}
		}
	} else {
		_lines.push(line.line);
	}
});

content = _lines.map(line => {
	if (line.indexOf("#") !== -1) {
		if (line.indexOf(":") !== -1) {
			let t = line.split(":");
			let f = t[1].split("#");
			return `${t[0]}|${f[1]}:${f[0]}`;
		} else {
			return line.replace('#', "|");
		}
	} else {
		return line;
	}
}).join(os.EOL);

console.log(content);

let result = yaml.parse(content);
console.log(JSON.stringify(result, null, 4));
