const three = require('three')
const glm = require('gl-matrix')
const print = require('./helpers/print')
const equal = require('./helpers/equal')

const Matrix4 = three.Matrix4
const Vector3 = three.Vector3
const Quaternion = three.Quaternion

const mat4 = glm.mat4
require('../lib/mat4.extension')(mat4)
const vec3 = glm.vec3
const quat = glm.quat

describe('mat4 parity tests', () => {
  it('mat4.transpose == Matrix4.set', () => {
    const values = [
      1.0, 1.0, 1.0, 3.0,
      1.0, 1.0, 3.0, 3.0,
      1.0, 1.0, 1.0, 3.0,
      1.0, 1.0, 1.0, 1.0,
    ]

    const s = mat4.fromValues(...values)
    mat4.transpose(s, s)

    const t = new Matrix4()
    t.set(...values)

    equal.mat4(s, t)
  })
  it('mat4.multiply == Matrix4.multiplyMatrices', () => {
    const a = [
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      2.0, 2.0, 2.0, 1.0,
    ]
    const b = [
      -1.0, 0.0, 0.0, 2.0,
      0.0, 1.0, 0.0, 2.0,
      0.0, 0.0, -1.0, 2.0,
      0.0, 0.0, 0.0, 1.0,
    ]

    const s = mat4.create()
    const t = new Matrix4()
    // Identity matrices are the same
    equal.mat4(s, t)

    const glmA = mat4.transpose([], mat4.fromValues(...a))
    const glmB = mat4.transpose([], mat4.fromValues(...b))
    
    const threeA = new Matrix4().set(...a)
    const threeB = new Matrix4().set(...b)

    // New mat4.fromValues must be transposed to match ThreeJS
    equal.mat4(glmA, threeA)
    equal.mat4(glmB, threeB)

    mat4.multiply(s, glmA, glmB)
    t.multiplyMatrices(threeA, threeB)

    equal.mat4(s,t)
  })
  it('mat4.fromQuat == Matrix4.makeRotationFromQuaternion', () => {
    const quatValues = [1.0, 2.0, 3.0, 4.0]
    const sQuat = quat.fromValues(...quatValues)
    const s = mat4.create()
    mat4.fromQuat(s, sQuat)

    const tQuat = new Quaternion(...quatValues)
    const t = new Matrix4()
    t.makeRotationFromQuaternion(tQuat)

    equal.mat4(s, t)
  })
  it('[Extension] mat4.getScaledRotation, mat4.getScaling, mat4.getTranslation == Matrix4.decompose', () => {
    const v = [
      1.0, 0.0, 0.0, 0.0,
      1.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    ]

    const s = mat4.transpose(mat4.create(), mat4.fromValues(...v))
    const sTranslation = mat4.getTranslation([], s)
    const sScaling = mat4.getScaling([], s)
    // ThreeJS decomposes matrixes into quaternion rotation by first removing the scalar component.
    const sRotation = mat4.getScaledRotation([], s)

    const t = new Matrix4()
    t.set(...v)
    let tRotation = new Quaternion()
    let tTranslation = new Vector3()
    let tScaling = new Vector3()
    t.decompose(tTranslation, tRotation, tScaling)

    equal.mat4(s, t)
    equal.quat(sRotation, tRotation)
    equal.vec3(sTranslation, tTranslation)
    equal.vec3(sScaling, tScaling)
  })
  it('mat4.fromRotationTranslationScale == Matrix4.compose', () => {
    const rotationValues = [0.0, 4.0, 2.0, 0.0]
    const translationValues = [1.0, 1.0, 1.0]
    const scaleValues = [0.0, 1.0, 1.0]

    const sRotation = quat.fromValues(...rotationValues)
    const sTranslation = vec3.fromValues(...translationValues)
    const sScaling = vec3.fromValues(...scaleValues)
    const s = mat4.create()
    mat4.fromRotationTranslationScale(s, sRotation, sTranslation, sScaling)

    const tRotation = new Quaternion(...rotationValues)
    const tTranslation = new Vector3(...translationValues)
    const tScaling = new Vector3(...scaleValues)
    const t = new Matrix4()
    t.compose(tTranslation, tRotation, tScaling)

    equal.mat4(s, t)
  })
  it('[Extension] mat4.extractRotation == Matrix4.extractRotation', () => {
    const a = [
      1.0, 2.0, 2.0, 0.0,
      1.0, 1.0, 25.0, 0.0,
      2.0, -1.0, -1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    ]
    const threeA = new Matrix4().set(...a)
    const glmA = mat4.transpose([], mat4.fromValues(...a))
    equal.mat4(glmA, threeA)

    const s = mat4.extractRotation(mat4.create(), glmA)
    const t = new Matrix4().extractRotation(threeA)

    equal.mat4(s, t)
  })
})