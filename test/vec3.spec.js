const three = require('three')
const glm = require('gl-matrix')
const equal = require('./helpers/equal')
const print = require('./helpers/print')

const Vector3 = three.Vector3
const Matrix3 = three.Matrix3
const Matrix4 = three.Matrix4

const vec3 = glm.vec3
const mat3 = glm.mat3
const mat4 = glm.mat4

describe('vec3 parity tests', () => {
  it('vec3.create == new Vector3', () => {
    let s = vec3.create()
    let t = new Vector3()
    equal.vec3(s,t)
  })
  it('vec3.fromValues == new Vector3', () => {
    let s = vec3.fromValues(1.0, 2.0, 3.0)
    let t = new Vector3(1.0, 2.0, 3.0)
    equal.vec3(s,t)
  })
  it('vec3.copy == Vector3.copy', () => {
    let a = [1.0, 2.0, 3.0]
    let b = [0.0, 0.0, 0.0]

    let sA = vec3.fromValues(...a)
    let sB = vec3.fromValues(...b)
    let tA = new Vector3(...a)
    let tB = new Vector3(...b)
    equal.vec3(sA, tA)
    equal.vec3(sB, tB)
    // note the syntax difference
    vec3.copy(sA, sB)
    tA.copy(tB)

    equal.vec3(sA, tA)
  })
  it('vec3.transformMat3 == Vector3.applyMatrix3', () => {
    let vecValues = [1.0, 2.0, 3.0]
    let matValues = [
      1.0, 0.0, 1.0, 
      0.0, 1.0, 1.0,
      0.0, 0.0, 1.0
    ]
    
    let s = vec3.fromValues(...vecValues)
    let glmMat3 = mat3.fromValues(...matValues)
    // we transpose the matrix to match
    // Vector3.set() takes data in column-major ordering
    mat3.transpose(glmMat3,glmMat3)
    vec3.transformMat3(s, s, glmMat3)
    
    let t = new Vector3(...vecValues)
    let threeMat3 = new Matrix3()
    threeMat3.set(...matValues)
    t.applyMatrix3(threeMat3)
    
    equal.vec3(s,t)
  })
  it('vec3.transformMat4 == Vector3.applyMatrix4', () => {
    let vecValues = [1.0, 2.0, 3.0]
    let matValues = [
      1.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 0.0, 1.0, 1.0,
      0.0, 0.0, 0.0, 1.0
    ]
    
    let s = vec3.fromValues(...vecValues)
    // we transpose the matrix to match
    // Vector4.set() takes data in column-major ordering
    let glmMat4 = mat4.transpose([], mat4.fromValues(...matValues))
    vec3.transformMat4(s, s, glmMat4)
    
    let t = new Vector3(...vecValues)
    let threeMat4 = new Matrix4();
    threeMat4.set(...matValues)
    t.applyMatrix4(threeMat4)
    
    equal.vec3(s,t)
  })
})