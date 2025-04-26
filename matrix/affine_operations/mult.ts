import { Point, Vec, Mat4 } from "../../types.ts"
import dot from "./dot.ts"
import getCol from "./getCol.ts";
import getRow from "./getRow.ts";
import map from "./map.ts";

function mult<T extends Point | Vec | Mat4>(scalar: number, v: T): T 
function mult(transformation: Mat4, v: Vec): Vec
function mult(transformation: Mat4, p: Point): Point
function mult(a: Mat4, b: Mat4): Mat4
function mult(a: Mat4 | number, b: Mat4 | Vec | Point): Mat4 | Vec | Point {
	if (!Array.isArray(a)) {
		// scalar multiplication
		return map(b, x => x * a)
	}

	if (b[3] === 0) {
		// matrix-vector product
		return [
			dot(getRow(a, 0), b), 
			dot(getRow(a, 1), b), 
			dot(getRow(a, 2), b), 
			0
		]
	}

	if (Array.isArray(b[3])) {
		// matrix-matrix product
		const product: Mat4 = [
			[ 0, 0, 0, 0 ],
			[ 0, 0, 0, 0 ],
			[ 0, 0, 0, 0 ],
			[ 0, 0, 0, 0 ]
		]
		return map(product, (_, row, col) => {
			return dot(getRow(a, row), getCol(b as Mat4, col))
		})
	}
	
	// matrix-point product
	return [
		dot(getRow(a, 0), b as Point), 
		dot(getRow(a, 1), b as Point), 
		dot(getRow(a, 2), b as Point), 
		dot(getRow(a, 3), b as Point)
	]
}

export default mult