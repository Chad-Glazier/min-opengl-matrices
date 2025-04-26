import { assertAlmostEquals } from "jsr:@std/assert/almost-equals"
import planeNormal from "./planeNormal.ts";

Deno.test("checking with logs", () => {
	const epsilon = 1e-6
	const [ actualOutward, actualInward ] = planeNormal( 
		[ 0.5, 0.5, 3, 1 ],
		[ 2, 0, 0, 1 ],
		[ 0, 2, 0, 1 ], 
		[ 0, 0, 0, 1 ]
	)
	const expectedOutward = [ 0.6882472, 0.6882472, 0.22941573, 0 ]
	
	expectedOutward.forEach((_, idx) => {
		assertAlmostEquals(actualOutward[idx], expectedOutward[idx], epsilon)
		assertAlmostEquals(actualInward[idx], -1 * expectedOutward[idx], epsilon)
	})
})
