import type { Vec, Point } from "../../types.ts"

/**
 * Returns the norm of a vector or the euclidean distance between a point
 * and the origin.
 * 
 * @alias {@link magnitude}, {@link len}
 */
function norm(v: Vec | Point): number {
	return Math.sqrt(
		v[0] * v[0] + 
		v[1] * v[1] + 
		v[2] * v[2]
	)
}

/**
 * Returns the magnitude of a vector or the euclidean distance between a point
 * and the origin.
 * 
 * @alias {@link norm}, {@link len}
 */
const magnitude = norm

/**
 * Returns the length of a vector or the euclidean distance between a point and
 * the origin.
 * 
 * @alias {@link norm}, {@link magnitude}.
 */
const len = norm

export { norm, magnitude, len }
