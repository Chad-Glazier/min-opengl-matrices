import type { Vec } from "../../types.ts"
import { norm } from "./norm.ts"

/**
 * Returns a vector parallel to `v` but with a magnitude/norm of exactly `1`.
 * 
 * @param v: The vector to normalize.
 * @returns a new unit-length vector with the same the direction as `v`.
 */
function normalize(v: Vec): Vec {
	const magnitude = norm(v)
	return [
		v[0] / magnitude,
		v[1] / magnitude,
		v[2] / magnitude,
		0
	]
}

/**
 * Modifies `v` to have a magnitude/norm of exactly `1` without changing its
 * direction.
 * 
 * @param v: The vector to normalize (this value will be mutated).
 * @returns a reference to `v`.
 */
function normalize_i(v: Vec): Vec {
	const magnitude = norm(v)

	v[0] /= magnitude
	v[1] /= magnitude
	v[2] /= magnitude

	return v
}

export { normalize, normalize_i }
