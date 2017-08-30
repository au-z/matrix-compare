let Vector2 = require('three').Vector2
let vec2 = require('gl-matrix').vec2

describe('vec2 parity tests', () => {
	function expectEqual(glmVec, threeVec) {
		expect(threeVec.x).toBeCloseTo(glmVec[0], 6)
		expect(threeVec.y).toBeCloseTo(glmVec[1], 6)
	}

	it('vec2.create == new Vector2', () =>  {
		let s = vec2.create()
		let t = new Vector2()
		expectEqual(s,t)
	})
	it('vec2.fromValues == new Vector2', () => {
		let s = vec2.fromValues(1.0, 2.0)
		let t = new Vector2(1.0, 2.0)
		expectEqual(s,t)
	})
})