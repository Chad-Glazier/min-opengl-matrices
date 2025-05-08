import type { Vec } from "../../types.ts";
import { det } from "../matrix_operations/det.ts";

/**
 * Returns the cross product of two vectors.
 * 
 * @param u The left operand.
 * @param v The right operand.
 * @returns The cross product `u x v`.
 */
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

export { cross }
