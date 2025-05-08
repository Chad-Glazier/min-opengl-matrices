/**
 * Returns the dot product of two arrays of length 4. If you are getting the
 * dot product of two points, you should remember to specify the
 * `skipLastCoordinate = true` flag, otherwise the scaling coordinate `w` will
 * be included in the product. 
 * 
 * @param u 
 * @param v 
 * @param skipLastCoordinate 
 * @returns the dot product of `u` and `v`.
 */
function dot(
	u: [number, number, number, number], 
	v: [number, number, number, number], 
	skipLastCoordinate = false
): number {
	let product = 0
	const n = skipLastCoordinate ? u.length - 1 : u.length
	for (let i = 0; i < n; i++) {
		product += u[i] * v[i]
	}
	return product
}

export { dot }
