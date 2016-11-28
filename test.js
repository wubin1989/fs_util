const writeXlsx = require("./writeXlsx")
const path = "./test.xlsx"
const sheets = [{
	name: "demo_sheet",
	data: [
		["name", "age"],
		["Jack", 28]
	]
}]
writeXlsx(path, sheets)