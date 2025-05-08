import { identity } from "../identity.ts"
import { mult } from "../../general_operations/mult.ts"
import { perspective } from "../perspective.ts"
import { compareMatrices } from "../../../test_util/compareMatrices.ts"
import type { Mat4 } from "../../../types.ts"

Deno.test("the perspective matrix is created correctly", () => {
	const actual = perspective(Math.PI / 4, 9 / 16, 1, 10);
	const expected: Mat4 = [
		[4.291935221996614, 0, 0, 0],
		[0, 2.414213562373095, 0, 0],
		[0, 0, -1.2222222222222223, -2.2222222222222223],
		[0, 0, -1, 0],
	]

	compareMatrices(actual, expected)
})

Deno.test("the product of a perspective matrix and its inverse yields the identity", () => {
	const [ matrix, inverse ] = perspective(Math.PI / 4, 9 / 16, 1, 10, true)
	const actual = mult(inverse, matrix)

	compareMatrices(actual, identity(4))
})
