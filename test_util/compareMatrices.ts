import type { SquareMat } from "../types.ts"
import { assertAlmostEquals } from "@std/assert/almost-equals"

function compareMatrices<T extends SquareMat>(actual: T, expected: T) {
	const n = actual.length
	for (let row = 0; row < n; row++) {
		for (let col = 0; col < n; col++) {
			assertAlmostEquals(
				actual[row][col],
				expected[row][col],
				1e-6,
				`Inaccuracy in row ${row + 1}, column ${col + 1}`
			)
		}
	}
}

export { compareMatrices }
