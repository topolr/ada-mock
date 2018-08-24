let yaml = require("yamljs");
let os = require("os");

let util = {
	isObject(obj) {
		return typeof (obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length;
	}
};

let Parser = {
	parseData(data) {
		if (Array.isArray(data)) {
			data.forEach((item, index) => {
				data[index] = this.parseData(item);
			});
		} else if (util.isObject(data)) {
			Reflect.ownKeys(data).forEach(key => {
				let a = key.split("<%|%>");
				data[a[0]] = {
					__comment__: a[1],
					__props__: this.parseData(data[key])
				};
				delete data[key];
			});
		}
		return data;
	},
	parseBaseInfo(content) {
		return yaml.parse(content);
	},
	parseDocumentInfo(content) {
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
						_lines[_lines.length - 1] = _lines[_lines.length - 1] + "<%||%>" + f;
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
					return `${t[0]}<%|%>${f[1]}:${f[0]}`;
				} else {
					return line.replace('#', "<%|%>");
				}
			} else {
				return line;
			}
		}).join(os.EOL);
		return this.parseData(yaml.parse(content));
	}
};

module.exports = Parser;