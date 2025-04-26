import { Point, Vec } from "../../types.ts"
import * as pred from "../../type_predicates.ts"

function add(initialPosition: Point, displacement: Vec): Point
function add(u: Vec, v: Vec): Vec 
function add(a: Vec | Point, b: Vec): Vec | Point {
	if (pred.isVec(a)) {
		// vector-vector addition
		return [
			a[0] + b[0],
			a[1] + b[1],
			a[2] + b[2],
			0
		]
	}

	// point-vector addition
	return [
		a[0] + b[0],
		a[1] + b[1],
		a[2] + b[2],
		a[3]
	]
}

export default add
