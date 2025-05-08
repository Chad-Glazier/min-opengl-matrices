import type { Point, Vec } from "../../types.ts"

/**
 * Returns a point-vector sum.
 * 
 * @param initialPosition The original point.
 * @param displacement The displacement from the original point.
 */
function add(initialPosition: Point, displacement: Vec): Point
/**
 * Returns the vector-vector sum of the operands.
 */
function add(u: Vec, v: Vec): Vec
function add(a: Vec | Point, b: Vec): Vec | Point {
	return [
		a[0] + b[0],
		a[1] + b[1],
		a[2] + b[2],
		a[3]
	]
}

/**
 * Displaces a point, updating the original point in-place.
 * 
 * @param initialPosition The position to displace.
 * @param displacement The displacement vector.
 * @returns a reference to `initialPosition`.
 */
function add_i(initialPosition: Point, displacement: Vec): Point
/**
 * Calculates the vector sum and stores it in the left operand.
 * 
 * @param u The left operand (which will be unchanged).
 * @param v The right operand, which will store the vector sum.
 * @returns A reference to `v`.
 */
function add_i(u: Vec, v: Vec): Vec
function add_i(a: Vec | Point, b: Vec): Point | Vec {
	a[0] += b[0]
	a[1] += b[1]
	a[2] += b[2]
	
	return a
}

export {
	add,
	add_i
}
