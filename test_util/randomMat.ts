import type { 
	Mat2, Mat3, Mat4, SquareMat 
} from "../types.ts"

function randomize_i<T extends SquareMat>(
	mat: T, lower: number, upper: number
): T {
	const n = mat.length
	const range = upper - lower

	for (let row = 0; row < n; row++) {
		for (let col = 0; col < n; col++) {
			mat[row][col] = Math.random() * range + lower
		}
	}

	return mat
}

function randomMat2(lower: number = -10, upper: number = 10): Mat2 {
	return randomize_i([
		[ 0, 0 ],
		[ 0, 0 ]
	], lower, upper)
}

function randomMat3(lower: number = -10, upper: number = 10): Mat3 {
	return randomize_i([
		[ 0, 0, 0 ],
		[ 0, 0, 0 ],
		[ 0, 0, 0 ]
	], lower, upper)
}

function randomMat4(lower: number = -10, upper: number = 10): Mat4 {
	return randomize_i([
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ]
	], lower, upper)
}

export {
	randomMat2,
	randomMat3,
	randomMat4,
	randomize_i
}