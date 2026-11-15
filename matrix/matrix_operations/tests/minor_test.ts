// minor_test.ts
import { minor } from "../minor.ts"
import { assertAlmostEquals } from "@std/assert"
import type { SquareMat } from "../../../types.ts"
import { det } from "../det.ts"

/** Build the submatrix of `mat` with the given row/column removed. */
function submatrix(
	rowIndexToExclude: number,
	columnIndexToExclude: number,
	mat: SquareMat,
): SquareMat {
	const result: number[][] = []
	for (let row = 0; row < mat.length; row++) {
		if (row === rowIndexToExclude) continue
		const newRow: number[] = []
		for (let col = 0; col < mat.length; col++) {
			if (col === columnIndexToExclude) continue
			newRow.push(mat[row][col])
		}
		result.push(newRow)
	}
	return result as SquareMat
}

/** Independent oracle: determinant of the submatrix with row/col removed. */
function expectedMinor(
	rowIndexToExclude: number,
	columnIndexToExclude: number,
	mat: SquareMat,
): number {
	return det(submatrix(rowIndexToExclude, columnIndexToExclude, mat))
}

const mat2: SquareMat = [
	[3, 5],
	[2, 7],
]

const mat3: SquareMat = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 10],
]

const mat4: SquareMat = [
	[2, 0, 1, 3],
	[1, 4, 2, 0],
	[3, 1, 0, 5],
	[0, 2, 6, 1],
]

const mat4Singular: SquareMat = [
	[1, 2, 3, 4],
	[2, 4, 6, 8],
	[0, 1, 0, 1],
	[1, 0, 1, 0],
]

Deno.test("minor (2x2) returns the sole remaining entry for every exclusion", () => {
	const expectedByPosition: Record<string, number> = {
		"0,0": 7,
		"0,1": 2,
		"1,0": 5,
		"1,1": 3,
	}
	for (const [key, expected] of Object.entries(expectedByPosition)) {
		const [r, c] = key.split(",").map(Number)
		assertAlmostEquals(
            minor(r, c, mat2), 
            expected, 
            1e-6, 
            `minor(2x2) at ${key}`,
        )
	}
})

Deno.test("minor (3x3) known cofactor values", () => {
	const expected = [
		[2, -2, -3],
		[-4, -11, -6],
		[-3, -6, -3],
	]
	for (let r = 0; r < 3; r++) {
		for (let c = 0; c < 3; c++) {
			assertAlmostEquals(
                minor(r, c, mat3), 
                expected[r][c], 
                1e-6, 
                `minor(3x3) at (${r},${c})`,
            )
		}
	}
})

Deno.test("minor (3x3) matches the generic oracle", () => {
	for (let r = 0; r < 3; r++) {
		for (let c = 0; c < 3; c++) {
			assertAlmostEquals(
				minor(r, c, mat3),
				expectedMinor(r, c, mat3),
                1e-6,
				`minor(3x3) at (${r},${c})`,
			)
		}
	}
})

Deno.test("minor (4x4) matches the generic oracle", () => {
	for (let r = 0; r < 4; r++) {
		for (let c = 0; c < 4; c++) {
			assertAlmostEquals(
				minor(r, c, mat4),
				expectedMinor(r, c, mat4),
                1e-6,
				`minor(4x4) at (${r},${c})`,
			)
		}
	}
})

Deno.test("minor (4x4) known cofactor values", () => {
	assertAlmostEquals(minor(0, 0, mat4), -102, 1e-6, "minor(4x4) at (0,0)")
	assertAlmostEquals(minor(1, 1, mat4), -9, 1e-6, "minor(4x4) at (1,1)")
	assertAlmostEquals(minor(3, 3, mat4), -15, 1e-6, "minor(4x4) at (3,3)")
})

Deno.test("minor (4x4) of a singular matrix still returns the cofactor minors", () => {
	for (let r = 0; r < 4; r++) {
		for (let c = 0; c < 4; c++) {
			assertAlmostEquals(
				minor(r, c, mat4Singular),
				expectedMinor(r, c, mat4Singular),
                1e-6,
				`minor(4x4 singular) at (${r},${c})`,
			)
		}
	}
})

Deno.test("minor is consistent with the cofactor expansion of the determinant", () => {
	const checks: Array<[SquareMat, number]> = [
		[mat2, mat2[0][0] * mat2[1][1] - mat2[0][1] * mat2[1][0]],
		[
			mat3,
			1 * (5 * 10 - 6 * 8) - 2 * (4 * 10 - 6 * 7) + 3 * (4 * 8 - 5 * 7),
		],
		[mat4, det(mat4.map((row) => [...row]) as SquareMat)],
	]

	for (const [mat, expectedDet] of checks) {
		let det = 0
		for (let c = 0; c < mat.length; c++) {
			const sign = c % 2 === 0 ? 1 : -1
			det += sign * mat[0][c] * minor(0, c, mat)
		}
		assertAlmostEquals(
            det, 
            expectedDet, 
            1e-6, 
            `cofactor expansion for ${mat.length}x${mat.length}`,
        )
	}
})
