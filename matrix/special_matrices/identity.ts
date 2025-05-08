import type { 
	Mat2, Mat3, Mat4 
} from "../../types.ts"

/**
 * Returns an identity matrix.
 */
function identity(size: 1): 1
function identity(size: 2): Mat2
function identity(size: 3): Mat3
function identity(size: 4): Mat4
function identity(
	size: 1 | 2 | 3 | 4
): 1 | Mat2 | Mat3 | Mat4 {
	switch (size) {
	case 4: {
		return [
			[ 1, 0, 0, 0 ],
			[ 0, 1, 0, 0 ],
			[ 0, 0, 1, 0 ],
			[ 0, 0, 0, 1 ]
		]
	}
	case 3: {
		return [
			[ 1, 0, 0 ],
			[ 0, 1, 0 ],
			[ 0, 0, 1 ]
		]
	}
	case 2: {
		return [
			[ 1, 0 ],
			[ 0, 1 ]
		]
	}
	case 1: {
		return 1
	}}
}

export { identity }
