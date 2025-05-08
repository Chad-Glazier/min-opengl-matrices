import { concat, concat_i } from "../concat.ts"
import { compareMatrices } from "../../../test_util/compareMatrices.ts"
import { identity } from "../../special_matrices/identity.ts";
import { randomMat4 } from "../../../test_util/randomMat.ts";
import { assertNotStrictEquals } from "@std/assert/not-strict-equals";
import { assertStrictEquals } from "@std/assert/strict-equals";
import type { Mat4 } from "../../../types.ts";

Deno.test("`concat` with no arguments returns the identity matrix", () => {
	compareMatrices(concat(), identity(4))
	compareMatrices(concat_i(), identity(4))
})

Deno.test("`concat` with one argument returns a copy of that argument", () => {
	const original = randomMat4()
	const actual = concat(original)
	
	compareMatrices(actual, original)
	assertNotStrictEquals(actual, original)

	const actualInPlace = concat_i(original)
	assertStrictEquals(actualInPlace, original)
})

Deno.test("`concat` with a dozen matrices returns their product", () => {
	const matrices: Mat4[] = []
	for (let i = 0; i < 12; i++) {
		matrices.push(randomMat4())
	}

	let right = matrices[matrices.length - 1]
	for (let i = matrices.length - 2; i >= 0; i--) {
		const left = matrices[i]
		const product = identity(4)
		for (let row = 0; row < 4; row++) {
			for (let col = 0; col < 4; col++) {
				product[row][col] =
					left[row][0] * right[0][col] +
					left[row][1] * right[1][col] +
					left[row][2] * right[2][col] +
					left[row][3] * right[3][col]
			}
		}
		right = product
	}
	const expected = right
	const actual = concat(...matrices)
	compareMatrices(actual, expected)

	const mat = identity(4)
	concat_i(...matrices, mat)
	compareMatrices(mat, expected)
})
