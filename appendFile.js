'use strict';

module.exports = (file, data) => {
	const fs = require('fs')
	fs.appendFileSync(file, data)
}