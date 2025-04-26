import { Mat4 } from "../../types.ts"
import { transpose } from "../affine_operations/index.ts"
import ImmutableMatrix from "./ImmutableMatrix.ts"

/**
 * Creates an affine rotation matrix about an arbitrary axis.
 * 
 * @param axis The axis of rotation.
 * @param angle The magnitude of the rotation, in radians. Positive values are
 * counterclockwise, negative values are clockwise.
 * @returns A matrix that induces the specified rotation.
 */
function rotation(
	axis: [ x: number, y: number, z: number ],
	angle: number
): ImmutableMatrix {
	const sin = Math.sin(angle)
	const cos = Math.cos(angle)
	const oneMinusCos = 1 - cos
	const [ x, y, z ] = axis

	const matrix: Mat4 = [
		[
			cos + x * x * oneMinusCos, 
			x * y * oneMinusCos - z * sin,
			x * z * oneMinusCos + y * sin,
			0
		],
		[
			x * y * oneMinusCos + z * sin,
			cos + y * y * oneMinusCos,
			y * z * oneMinusCos - x * sin,
			0
		],
		[
			x * z * oneMinusCos - y * sin,
			y * z * oneMinusCos + x * sin,
			cos + z * z * oneMinusCos,
			0
		],
		[
			0, 0, 0, 1
		]
	]

	return new ImmutableMatrix(matrix, transpose(matrix))
}

export default rotation
