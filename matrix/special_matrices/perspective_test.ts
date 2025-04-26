import { assertAlmostEquals } from "jsr:@std/assert/almost-equals"
import mat4Identity from "../affine_operations/mat4Identity.ts"
import mult from "../affine_operations/mult.ts"
import perspective from "./perspective.ts"

Deno.test("the perspective matrix is created correctly", () => {
	const epsilon = 1e-6;
	const actual = perspective(Math.PI / 4, 9 / 16, 1, 10);
	const expected = [
		[4.291935221996614, 0, 0, 0],
		[0, 2.414213562373095, 0, 0],
		[0, 0, -1.2222222222222223, -2.2222222222222223],
		[0, 0, -1, 0],
	];

	for (let row = 0; row < 4; row++) {
		for (let col = 0; col < 4; col++) {
			assertAlmostEquals(
				actual.get(row, col),
				expected[row][col],
				epsilon,
				`inaccuracy in row ${row + 1}, col ${col + 1}`,
			);
		}
	}
});

Deno.test("the product of a perspective matrix and its inverse yields the identity", () => {
	const epsilon = 1e-6;
	const matrix = perspective(Math.PI / 4, 9 / 16, 1, 10);
	const actual = mult(matrix.inverse.mat, matrix.mat);
	const expected = mat4Identity();

	for (let row = 0; row < 4; row++) {
		for (let col = 0; col < 4; col++) {
			assertAlmostEquals(
				actual[row][col],
				expected[row][col],
				epsilon,
				`inaccuracy in row ${row + 1}, col ${col + 1}`,
			);
		}
	}

	console.log(matrix.toString(2))
});
