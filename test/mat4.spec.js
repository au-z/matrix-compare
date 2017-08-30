const three = require('three')
const glm = require('gl-matrix')
const print = require('./helpers/print')
const equal = require('./helpers/equal')

const Matrix4 = three.Matrix4
const Vector3 = three.Vector3
const Quaternion = three.Quaternion

const mat4 = glm.mat4
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

  it('mat4.getPosition, mat4.getScaling, mat4.getTranslation == Matrix4.decompose', () => {
    const v = [
      1.0, 0.0, 0.0, 5.0,
      0.0, 1.0, 0.0, 5.0,
      0.0, 0.0, 1.0, 5.0,
      0.0, 0.0, 0.0, 1.0,
    ]

    const s = mat4.fromValues(...v)
    mat4.transpose(s, s)
    let sRotation = quat.create()
    let sTranslation = vec3.create()
    let sScaling = vec3.create()
    mat4.getTranslation(sTranslation, s)
    mat4.getRotation(sRotation, s)
    mat4.getScaling(sScaling, s)

    const t = new Matrix4()
    t.set(...v)
    let tRotation = new Quaternion()
    let tTranslation = new Vector3()
    let tScaling = new Vector3()
    t.decompose(tTranslation, tRotation, tScaling)

    print.quat(sRotation, 'sRotation')
    print.quat(tRotation, 'tRotation')

    print.vec3(sTranslation, 'sTranslation')
    print.vec3(tTranslation, 'tTranslation')

    print.vec3(sScaling, 'sScaling')
    print.vec3(tScaling, 'tScaling')

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
})