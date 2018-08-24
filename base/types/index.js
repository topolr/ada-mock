let types = [
	require("./string"),
	require("./number")
];

let Types = {
	getType(name) {
		return types.find(item => item.name === name);
	},
	addType(type) {
		let t = types.findIndex(item => item.name === name);
		if (t !== -1) {
			types.splice(t, 1);
		}
		types.push(type);
	},
	removeType(name) {
		let t = types.findIndex(item => item.name === name);
		if (t !== -1) {
			types.splice(t, 1);
		}
	},
	getTypeInfo(name) {
		let info = this.getType(name);
		if (info) {
			return {
				name: info.name,
				length: info.length,
				defaultValue: info.defaultValue
			};
		} else {
			return null;
		}
	}
};

module.exports = Types;