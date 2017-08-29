let Vector2 = require('three').Vector2
let vec2 = require('gl-matrix').vec2

describe('vec2 parity tests', () => {
	function test(glmVec, threeVec) {
		expect(threeVec.x).toBe(glmVec[0])
		expect(threeVec.y).toBe(glmVec[1])
	}

	it('vec2.create == new Vector2', () =>  {
		let s = vec2.create()
		let t = new Vector2()
		test(s,t)
	})
	it('vec2.fromValues == new Vector2', () => {
		let s = vec2.fromValues(1.0, 2.0)
		let t = new Vector2(1.0, 2.0)
		test(s,t)
	})
})