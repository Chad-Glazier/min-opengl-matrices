import { assertAlmostEquals } from "jsr:@std/assert/almost-equals"
import compose from "./compose.ts"
import ImmutableMatrix from "../ImmutableMatrix.ts"
import map from "../../affine_operations/map.ts"
import { Mat4 } from "../../../types.ts"
import { mult } from "../../affine_operations/index.ts"
import mat4Identity from "../../affine_operations/mat4Identity.ts"
import perspective from "../perspective.ts"

function compareMatrix(expected: Mat4, actual: ImmutableMatrix) {
	const epsilon = 1e-6
	map(expected, (truth, row, col) => {
		assertAlmostEquals(actual.get(row, col), truth, epsilon, `inaccuracy in row ${row + 1}, column ${col + 1}`)
		return 0
	})
}

Deno.test("composing a translation matrix with its inverse works", () => {
	const components = [
		new ImmutableMatrix(
			[
				[ 1, 0, 0, -12 ],
				[ 0, 1, 0, 14 ],
				[ 0, 0, 1, 1 ],
				[ 0, 0, 0, 1 ]
			],
			[
				[ 1, 0, 0, 12 ],
				[ 0, 1, 0, -14 ],
				[ 0, 0, 1, -1 ],
				[ 0, 0, 0, 1 ]
			]
		),
		new ImmutableMatrix(
			[
				[ 1, 0, 0, 69 ],
				[ 0, 1, 0, 420 ],
				[ 0, 0, 1, 521 ],
				[ 0, 0, 0, 1 ]
			],
			[
				[ 1, 0, 0, -69 ],
				[ 0, 1, 0, -420 ],
				[ 0, 0, 1, -521 ],
				[ 0, 0, 0, 1 ]
			]
		)
	]
	const expectedMatrix = mat4Identity()
	const expectedInverse = mat4Identity()

	for (const matrix of components) {
		const actual = compose(matrix.inverse, matrix)
		compareMatrix(expectedMatrix, actual)
		compareMatrix(expectedInverse, actual.inverse)
	}
})

Deno.test("composing 10 random perspective matrices works", () => {
	const n = 10
	const components: ImmutableMatrix[] = new Array(n)
	for (let i = 0; i < n; i++) {
		components[i] = perspective(
			2 * Math.PI * Math.random(),
			Math.random() * 2,
			Math.random() * 10 + 10,
			Math.random() * 100 + 20
		)
	}

	let expectedMatrix = mat4Identity()
	let expectedInverse = mat4Identity()
	for (let i = 0; i < n; i++) {
		expectedMatrix = mult(components[n - 1 - i].mat, expectedMatrix)
		expectedInverse = mult(components[i].inverse.mat, expectedInverse)
	}

	const actual = compose(...components)

	compareMatrix(expectedMatrix, actual)
	compareMatrix(expectedInverse, actual.inverse)

	compareMatrix(mat4Identity(), compose(actual.inverse, actual))
	compareMatrix(mat4Identity(), compose(actual, actual.inverse))
})

Deno.test("composing random perspective matrices with their inverse yields the identity", () => {
	const n = 10
	const components: ImmutableMatrix[] = new Array(n)
	for (let i = 0; i < n; i++) {
		components[i] = perspective(
			2 * Math.PI * Math.random(),
			Math.random() * 2,
			Math.random() * 10 + 10,
			Math.random() * 100 + 20
		)
	}

	for (const matrix of components) {
		const actual = compose(matrix, matrix.inverse)
		compareMatrix(mat4Identity(), actual)
		compareMatrix(mat4Identity(), actual.inverse)
	}
})
