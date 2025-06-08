

import * as CONST from "./constants";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



export function checkValidate(value, type, field = "") {

	const objVal = mainCheck(value, type, field);

	if (objVal.state === CONST._OK) {
		return true;
	}
	showNotification(CONST.state_ERROR, objVal.message);
	return false;
}


export function showNotification(state, message, type = CONST.col_red) {
	iziToast.show({
		id: String(state).toLocaleLowerCase(),
		title: state,
		message: message,
		messageColor: 'white',
		color: type,
		position: 'bottomCenter',
	});
}

function mainCheck(value, type, field = "") {
	const returnObj = { state: "", message: "" };
	let p_OK = "";

	switch (type) {
		case CONST.type_STRING:
			p_OK = value.trim().length > 3 ? CONST._OK : CONST._NO;
			returnObj.state = p_OK;
			returnObj.message = p_OK === CONST._OK ? "" : field + "! Enter valid data. More than 3 length";
			break;
		case CONST.type_NUM:
			p_OK = Number(value.trim()) > 0 ? CONST._OK : CONST._NO;
			returnObj.state = p_OK;
			returnObj.message = p_OK === CONST._OK ? "" : field + "!Enter valid data. Number req";
			break;
		case CONST.type_DATE:
			p_OK = value > new Date() ? CONST._OK : CONST._NO;
			returnObj.state = p_OK;
			returnObj.message = p_OK === CONST._OK ? "" : field + "!Enter valid date. Please choose a date in the future";
			break;
		default:
			returnObj.state = CONST._NO;
			returnObj.message = CONST.state_ERROR;
	}
	return returnObj;

}