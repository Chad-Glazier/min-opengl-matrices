import { assert } from "@std/assert/assert";
import { compareMatrices } from "../../../test_util/compareMatrices.ts"
import { randomMat4 } from "../../../test_util/randomMat.ts";
import { identity } from "../../special_matrices/identity.ts";
import { det } from "../det.ts";
import { inverse } from "../inverse.ts";
import { concat } from "../concat.ts";

Deno.test("`inverse` works with arbitrary 4x4 matrices", () => {
	for (let i = 0; i < 10; i++) {
		const mat4 = randomMat4()
		if (det(mat4) === 0) {
			assert(null === inverse(mat4))
		}
		const inv = inverse(mat4)
		if (inv !== null) {
			compareMatrices(
				concat(inv, mat4),
				identity(4)
			)
		}
	}
})
