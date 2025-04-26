import { Mat4 } from "../../types.ts"
import ImmutableMatrix from "./ImmutableMatrix.ts";

function translation(
	x: number, 
	y: number, 
	z: number
): ImmutableMatrix {
	const matrix: Mat4 = [
		[ 1, 0, 0, x ],
		[ 0, 1, 0, y ],
		[ 0, 0, 1, z ],
		[ 0, 0, 0, 1 ]
	]
	const inverse: Mat4 = [
		[ 1, 0, 0, -x ],
		[ 0, 1, 0, -y ],
		[ 0, 0, 1, -z ],
		[ 0, 0, 0, 1  ]
	]
	
	return new ImmutableMatrix(matrix, inverse)
}

export default translation
