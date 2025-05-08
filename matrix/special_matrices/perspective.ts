import type { Mat4 } from "../../types.ts"

/**
 * Used to convert camera-space coordinates into clip-space coordinates with a
 * perspective transformation.
 * 
 * For example,
 * ```ts
 * const projection = perspective(Math.PI / 3, 9 / 16, 1, 10)
 * ```
 * or, if you need the inverse as well,
 * ```ts
 * const [ projection, invProjection ] = perspective(Math.PI / 3, 9 / 16, 1, 10, true)
 * ```
 * 
 * @param fieldOfViewY: An angle, in radians, representing the field of view
 * with respect to the y-axis. I.e., the vertical field of view. The
 * horizontal field of view is determined by the `aspectRatio`.
 * @param aspectRatio: The ratio `width / height` (for the display).
 * @param near: The distance from the origin to the near clipping plane.
 * Since the camera in OpenGL looks down the negative z-axis, a value of
 * `near = 2` will represent a near clipping plane of `z = -2` in world
 * coordinates.
 * @param far: The distance from the origin to the far clipping plane. Since
 * the camera in OpenGL looks down the negative z-axis, a value of 
 * `far = 10` will represent a far clipping plane of `z = -10`.
 * @param computeInverse: A boolean representing whether or not to compute
 * the inverse of the matrix at the same time. Computing the inverse this way
 * is *much* more efficient than using a numerical method.
 * @returns a perspective projection matrix and, if specified, its inverse.
 */
function perspective(
	fieldOfViewY: number, 
	aspectRatio: number, 
	near: number, 
	far: number, 
	computeInverse?: false
): Mat4 
function perspective(
	fieldOfViewY: number, 
	aspectRatio: number, 
	near: number, 
	far: number, 
	computeInverse: true
): [ matrix: Mat4, inverse: Mat4 ]
function perspective(
	fieldOfViewY: number, 
	aspectRatio: number, 
	near: number, 
	far: number, 
	computeInverse: boolean = false
): Mat4 | [ matrix: Mat4, inverse: Mat4 ] {
	const matrix: Mat4 = [
		[ 1 / (aspectRatio * Math.tan(fieldOfViewY / 2)), 0, 0, 0 ],
		[ 0, 1 / Math.tan(fieldOfViewY / 2), 0, 0 ],
		[ 0, 0, (near + far) / (near - far), (2 * near * far) / (near - far)],
		[ 0, 0, -1, 0]
	]
	
	if (!computeInverse) {
		return matrix
	}

	const inverse: Mat4 = [
		[ aspectRatio * Math.tan(fieldOfViewY / 2), 0, 0, 0 ],
		[ 0, Math.tan(fieldOfViewY / 2), 0, 0 ],
		[ 0, 0, 0, -1 ],
		[ 0, 0, 
			(near - far) / (2 * far * near),  
			(near + far) / (2 * far * near)
		]
	]

	return [ matrix, inverse ]
}

/**
 * Returns the inverse of the specified perspective matrix.
 * 
 * @param fieldOfViewY: An angle, in radians, representing the field of view
 * with respect to the y-axis. I.e., the vertical field of view. The
 * horizontal field of view is determined by the `aspectRatio`.
 * @param aspectRatio: The ratio `width / height` (for the display).
 * @param near: The distance from the origin to the near clipping plane.
 * Since the camera in OpenGL looks down the negative z-axis, a value of
 * `near = 2` will represent a near clipping plane of `z = -2` in world
 * coordinates.
 * @param far: The distance from the origin to the far clipping plane. Since
 * the camera in OpenGL looks down the negative z-axis, a value of 
 * `far = 10` will represent a far clipping plane of `z = -10`.
 */
function perspectiveInverse(	
	fieldOfViewY: number, 
	aspectRatio: number, 
	near: number, 
	far: number
): Mat4 {
	return [
		[ aspectRatio * Math.tan(fieldOfViewY / 2), 0, 0, 0 ],
		[ 0, Math.tan(fieldOfViewY / 2), 0, 0 ],
		[ 0, 0, 0, -1 ],
		[ 0, 0, 
			(near - far) / (2 * far * near),  
			(near + far) / (2 * far * near)
		]
	]
}

export { perspective, perspectiveInverse }
