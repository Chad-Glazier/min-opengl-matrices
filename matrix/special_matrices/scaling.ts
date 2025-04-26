import ImmutableMatrix from "./ImmutableMatrix.ts"
import { Mat4 } from "../../types.ts"

function scaling(
	x: number, 
	y: number, 
	z: number
): ImmutableMatrix {
	const matrix: Mat4 = [
		[ x, 0, 0, 0 ],
		[ 0, y, 0, 0 ],
		[ 0, 0, z, 0 ],
		[ 0, 0, 0, 1 ]
	]
	const inverse: Mat4 = [
		[ 1/x, 0, 0, 0 ],
		[ 0, 1/y, 0, 0 ],
		[ 0, 0, 1/z, 0 ],
		[ 0, 0,   0, 1 ]
	]

	return new ImmutableMatrix(matrix, inverse)
}

export default scaling
