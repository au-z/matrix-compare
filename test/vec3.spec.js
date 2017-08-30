const three = require('three')
const glm = require('gl-matrix')

const Vector3 = three.Vector3
const Matrix3 = three.Matrix3
const Matrix4 = three.Matrix4

const vec3 = glm.vec3
const mat3 = glm.mat3
const mat4 = glm.mat4

describe('vec3 parity tests', () => {
	function test(glmVec, threeVec) {
		expect(threeVec.x).toBe(glmVec[0])
		expect(threeVec.y).toBe(glmVec[1])
		expect(threeVec.z).toBe(glmVec[2])
	}
	
	it('vec3.create == new Vector3', () => {
		let s = vec3.create()
		let t = new Vector3()
		test(s,t)
	})
	it('vec3.fromValues == new Vector3', () => {
		let s = vec3.fromValues(1.0, 2.0, 3.0)
		let t = new Vector3(1.0, 2.0, 3.0)
		test(s,t)
	})
	it('vec3.transformMat3 == Vector3.applyMatrix3', () => {
		let vecValues = [1.0, 2.0, 3.0]
		let matValues = [
			1.0, 0.0, 1.0, 
			0.0, 1.0, 1.0, 
			0.0, 0.0, 1.0
		]
		
		let s = vec3.fromValues(...vecValues)
		let glmMat3 = mat4.fromValues(...matValues)
		print('s', s)
		vec3.transformMat3(s, s, glmMat3)
		print('s', s)
		
		let t = new Vector3(...vecValues)
		let threeMat3 = new Matrix3()
		threeMat3.set(...matValues)
		print('t', t)
		t.applyMatrix3(threeMat3)
		print('t', t)
		
		test(s,t)
	})
	it('vec3.inverse', () => {
		let s = vec3.fromValues(1.0, 2.0, 3.0)
		print('s', s)
		vec3.inverse(s, s)
		print('s:inverse', s)
	})
	// it('vec3.transformMat4 == Vector3.applyMatrix4', () => {
	// 	let vecValues = [1.0, 2.0, 3.0]
	// 	let matValues = [
	// 		1.0, 1.0, 1.0, 1.0,
	// 		2.0, 3.0, 3.0, 1.0,
	// 		1.0, 1.0, 3.0, 1.0,
	// 		1.0, 3.0, 2.0, 1.0
	// 	]
		
	// 	let s = vec3.fromValues(...vecValues)
	// 	let glmMat4 = mat4.fromValues(...matValues)
		
	// 	let t = new Vector3(...vecValues)
	// 	let threeMat4 = new Matrix4();
	// 	threeMat4.set(...matValues)
		
	// 	vec3.transformMat4(s, s, glmMat4)
	// 	t.applyMatrix4(threeMat4)
	// 	test(s,t)
	// })
})

function print(label, data) {
	let msg = label + ' ['
	if(data.x) {
		for(let i in data) {
			if(i === 'x' || i === 'y' || i === 'z')
			msg += data[i] + ', '
		}
	} else {
		for(let i = 0; i < data.length; i++) {
			msg += data[i] + ', '
		}
	}
	msg += ']'
	console.log(msg)
}