import { LIBRARY_NAME } from "../constants.ts"

function err(message: string) {
	console.error(`${LIBRARY_NAME} error: ${message}.`)
}

export default err
