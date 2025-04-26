import { Mat4 } from "../../types.ts";
import ImmutableMatrix from "./ImmutableMatrix.ts";

/**
 * Used to convert camera-space coordinates into clip-space coordinates with a
 * perspective transformation. 	
 * 
 * @param fieldOfViewY An angle, in radians, representing the field of view
 * with respect to the y-axis. I.e., the vertical field of view. The
 * horizontal field of view is determined by the `aspectRatio`.
 * @param aspectRatio The ratio `width / height`.
 * @param near The distance from the origin to the near clipping plane.
 * Since the camera in OpenGL looks down the negative z-axis, a value of
 * `near = 2` will represent a near clipping plane of `z = -2` in world
 * coordinates.
 * @param far The distance from the origin to the far clipping plane. Since
 * the camera in OpenGL looks down the negative z-axis, a value of 
 * `far = 10` will represent a far clipping plane of `z = -10`.
 */
function perspective(
	fieldOfViewY: number,
	aspectRatio: number,
	near: number,
	far: number
): ImmutableMatrix {
	const matrix: Mat4 = [
		[ 1 / (aspectRatio * Math.tan(fieldOfViewY / 2)), 0, 0, 0 ],
		[ 0, 1 / Math.tan(fieldOfViewY / 2), 0, 0 ],
		[ 0, 0, (near + far) / (near - far), (2 * near * far) / (near - far)],
		[ 0, 0, -1, 0]
	]
	const inverseMatrix: Mat4 = [
		[ aspectRatio * Math.tan(fieldOfViewY / 2), 0, 0, 0 ],
		[ 0, Math.tan(fieldOfViewY / 2), 0, 0 ],
		[ 0, 0, 0, -1 ],
		[ 0, 0, 
			(near - far) / (2 * far * near),  
			(near + far) / (2 * far * near)
		]
	]
	return new ImmutableMatrix(matrix, inverseMatrix)
}

export default perspective
