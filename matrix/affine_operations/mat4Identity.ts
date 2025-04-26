import { Mat4 } from "../../types.ts";

function mat4Identity(): Mat4 {
	return [
		[ 1, 0, 0, 0 ],
		[ 0, 1, 0, 0 ],
		[ 0, 0, 1, 0 ],
		[ 0, 0, 0, 1 ],
	]
}

export default mat4Identity