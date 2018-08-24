let yaml = require("yamljs");
let os = require("os");
let Types = require("./types");

let util = {
	isObject(obj) {
		return typeof (obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length;
	},
	isString(obj) {
		return (typeof obj === 'string') && obj.constructor === String;
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
					__comment__: a[1]?a[1].replace(/<%\|\|%>/g, os.EOL):"",
					__props__: this.parseData(data[key])
				};
				delete data[key];
			});
		}
		return data;
	},
	setFinalInfo(data) {
		if (Array.isArray(data)) {
			data.forEach((item, index) => {
				this.setFinalInfo(item);
			});
		} else if (util.isObject(data)) {
			Reflect.ownKeys(data).forEach(key => {
				if (data[key].__props__ && util.isString(data[key].__props__)) {
					let k = data[key].__props__, t = k.match(/([a-zA-Z_0-9$]+)\((.*)?\)/);
					let typeName = "", parameter = "";
					if (t) {
						typeName = t[1];
						parameter = t[2];
					} else {
						typeName = data[key].__props__.trim();
					}
					let typeInfo = Types.getType(typeName);
					if (typeInfo) {
						data[key] = Object.assign({
							__comment__: data[key].__comment__,
							parameter
						}, typeInfo);
					} else {
						throw Error(`can not find type name of ${typeName}`);
					}
				} else {
					this.setFinalInfo(data[key].__props__);
				}
			});
		}
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
		let result = this.parseData(this.parseBaseInfo(content));
		this.setFinalInfo(result);
		return result;
	}
};

module.exports = Parser;