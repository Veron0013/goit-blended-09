
export function checkValidate(value, type, field = "") {

	const returnObj = { state: "", message: "" };
	let p_OK = "";

	switch (type) {
		case "string":
			p_OK = value.trim().length > 3 ? "OK" : "NO";
			returnObj.state = p_OK;
			returnObj.message = p_OK === "OK" ? "" : field + "! Enter valid data. More than 3 length";
			break;
		case "num":
			p_OK = Number(value.trim()) > 0 ? "OK" : "NO";
			returnObj.state = p_OK;
			returnObj.message = p_OK === "OK" ? "" : field + "!Enter valid data. Number req"
		default:
			returnObj.state = "NO";
			returnObj.message = "Error";

	}
	return returnObj;
}
