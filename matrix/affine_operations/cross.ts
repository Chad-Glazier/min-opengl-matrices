import { Vec } from "../../types.ts";
import det from "./det.ts";

function cross(u: Vec, v: Vec): Vec {
	return [
		det([
			[ u[1], u[2] ],
			[ v[1], v[2] ]
		]),
		det([
			[ u[2], u[0] ],
			[ v[2], v[0] ]
		]),
		det([
			[ u[0], u[1] ],
			[ v[0], v[1] ]
		]),
		0
	]
}

export default cross
