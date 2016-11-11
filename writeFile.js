'use strict';

module.exports = (file, data) => {
	const fs = require('fs')
	const checkExists = require('./checkExists')
	if (checkExists(file)) {
		fs.writeFileSync(file, data)
	}
}