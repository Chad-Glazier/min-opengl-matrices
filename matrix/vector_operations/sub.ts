import type { Vec, Point } from "../../types.ts";

/**
 * Returns the difference between two points as a displacement vector. The
 * resulting vector points from `q` to `p`.
 * 
 * @param p: The point to subtract from.
 * @param q: The point to subtract. 
 */
function sub(p: Point, q: Point): Vec
/**
 * Displaces a position by subtracting a displacement from it, returning the
 * result as a new point.
 */
function sub(initialPosition: Point, displacement: Vec): Point
/**
 * Returns a vector difference.
 * 
 * @param u: The vector to subtract from.
 * @param v: The vector to subtract.
 */
function sub(u: Vec, v: Vec): Vec
function sub(a: Point | Vec, b: Point | Vec ) {
	if (a[3] === 0) {
		// vector-vector subtraction
		return [
			a[0] - b[0],
			a[1] - b[1],
			a[2] - b[2],
			0
		]
	}

	if (b[3] !== 0) {
		// point-point subtraction
		return [
			a[0] - b[0],
			a[1] - b[1],
			a[2] - b[2],
			0
		]
	}

	// point-vector subtraction
	return [
		a[0] - b[0],
		a[1] - b[1],
		a[2] - b[2],
		a[3]
	]
}

/**
 * Displaces a position by subtracting a displacement from it.
 * 
 * @param initialPosition: The point to be displaced (this point will be
 * mutated).
 * @param displacement: The vector displacement to subtract from the point
 * (this value will be unchanged).
 * @returns a reference to `initialPosition`.
 */
function sub_i(initialPosition: Point, displacement: Vec): Point
/**
 * Subtracts the right vector from the left, storing the difference in the
 * left vector.
 * 
 * @param u: The vector to subtract from (this vector will be mutated).
 * @param v: The vector to subtract (this vector will be unchanged).
 * @returns a reference to `u`.
 */
function sub_i(u: Vec, v: Vec): Vec
function sub_i(a: Point | Vec, b: Vec ) {
	a[0] -= b[0]
	a[1] -= b[1]
	a[2] -= b[2]
	return a
}

export { sub, sub_i }
