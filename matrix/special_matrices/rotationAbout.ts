import { Mat4 } from "../../types.ts"
import ImmutableMatrix from "./ImmutableMatrix.ts"

/**
 * Creates an affine rotation matrix about one of the coordinate axes. This is
 * slightly more performant than the more general `rotation` function.
 * 
 * @param axis The coordinate axis about which you want to rotate.
 * @param angle The magnitude of the rotation, in radians. Positive values are
 * counterclockwise, negative values are clockwise.
 * @returns A matrix that induces the specified rotation.
 */
function rotationAbout(
	axis: "x" | "y" | "z", 
	angle: number
): ImmutableMatrix {
	const sin = Math.sin(angle)
	const cos = Math.cos(angle)
	
	switch (axis) {
	case "x": {
		const matrix: Mat4 = [
			[ 1, 0, 0, 0 ],
			[ 0, cos, -sin, 0 ],
			[ 0, sin, cos, 0 ],
			[ 0, 0, 0, 1 ]
		]
		const inverse: Mat4 = [
			[ 1, 0, 0, 0 ],
			[ 0, cos, sin, 0 ],
			[ 0, -sin, cos, 0 ],
			[ 0, 0, 0, 1 ]
		]
		return new ImmutableMatrix(matrix, inverse)
	}
	case "y": {
		const matrix: Mat4 = [
			[ cos, 0, sin, 0 ],
			[ 0, 1, 0, 0 ],
			[ -sin, 0, cos, 0 ],
			[ 0, 0, 0, 1 ]
		]
		const inverse: Mat4 = [
			[ cos, 0, -sin, 0 ],
			[ 0, 1, 0, 0 ],
			[ sin, 0, cos, 0 ],
			[ 0, 0, 0, 1 ]
		]
		return new ImmutableMatrix(matrix, inverse)
	}
	case "z": {
		const matrix: Mat4 = [
			[ cos, -sin, 0, 0 ],
			[ sin, cos, 0, 0 ],
			[ 0, 0, 1, 0 ],
			[ 0, 0, 0, 1 ]
		]
		const inverse: Mat4 = [
			[ cos, sin, 0, 0 ],
			[ -sin, cos, 0, 0 ],
			[ 0, 0, 1, 0 ],
			[ 0, 0, 0, 1 ]
		]
		return new ImmutableMatrix(matrix, inverse)
	}}
}

export default rotationAbout