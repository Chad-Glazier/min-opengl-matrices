import { Vec, Point } from "../../types.ts";
import * as pred from "../../type_predicates.ts"

function sub(p: Point, q: Point): Vec
function sub(initialPosition: Point, displacement: Vec): Point
function sub(u: Vec, v: Vec): Vec
function sub(a: Point | Vec, b: Point | Vec ) {
	if (pred.isVec(a)) {
		// vector-vector subtraction
		return [
			a[0] - b[0],
			a[1] - b[1],
			a[2] - b[2],
			0
		]
	}

	if (pred.isPoint(b)) {
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

export default sub
