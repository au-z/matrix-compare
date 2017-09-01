const three = require('three')
const glm = require('gl-matrix')
const equal = require('./helpers/equal')
const print = require('./helpers/print')

const Vector2 = three.Vector2
const Vector3 = three.Vector3
const Matrix3 = three.Matrix3
const Matrix4 = three.Matrix4
const Quaternion = three.Quaternion

const vec2 = glm.vec2
const vec3 = glm.vec3
const mat3 = glm.mat3
const mat4 = glm.mat4
const quat = glm.quat

describe('viewer test parity', () => {
  it('gl-matrix rotation axis conversion == ThreeJS rotation axis conversion', () => {
    const rotateStartValues = [0.7, 0.3, 0.2]
    const rotateEndValues = [0.1, 0.3, 0.7]

    const sRotateStart = vec3.fromValues(...rotateStartValues)
    const tRotateStart = new Vector3(...rotateStartValues)

    const sRotateEnd = vec3.fromValues(...rotateEndValues)
    const tRotateEnd = new Vector3(...rotateEndValues)

    const sAngle = Math.acos(vec3.dot(sRotateStart, sRotateEnd))
    const tAngle = Math.acos(tRotateStart.dot(tRotateEnd))
    expect(sAngle).toBeCloseTo(tAngle, 6)

    const s = vec3.normalize(vec3.create(), vec3.cross(vec3.create(), sRotateEnd, sRotateStart))
    const t = new Vector3().crossVectors(tRotateEnd, tRotateStart).normalize()
    equal.vec3(s, t)
  })
  it('gl-matrix getMouseProjection = ThreeJS getMouseProjection', () => {
    const trackballRadius = 50
    const trackballCenterOverrideValues = [50, 50]
    const canvasPointValues = [20, 20]

    const sCanvasPoint = vec2.fromValues(...canvasPointValues)
    const sTrackballCenterOverride = vec2.fromValues(...trackballCenterOverrideValues)

    const tCanvasPoint = new Vector2(...canvasPointValues)
    const tTrackballCenterOverride = new Vector2(...trackballCenterOverrideValues)

    // gl-matrix
    var sPointOnTrackball = vec3.fromValues(sCanvasPoint[0] - sTrackballCenterOverride[0], -(sCanvasPoint[1] - sTrackballCenterOverride[1]), 0.0)
    if (vec3.length(sPointOnTrackball) < trackballRadius) {
      sPointOnTrackball[2] = Math.sqrt(Math.pow(trackballRadius, 2) - Math.pow(vec3.length(sPointOnTrackball), 2))       // Pythagorian theroem
    }
    const s = vec3.normalize(vec3.create(), sPointOnTrackball)
    
    // threeJS
    var tPointOnTrackball = new Vector3(tCanvasPoint.x - tTrackballCenterOverride.x, -(tCanvasPoint.y - tTrackballCenterOverride.y), 0.0);
    if (tPointOnTrackball.length() < trackballRadius) {
      tPointOnTrackball.z = Math.sqrt((trackballRadius * trackballRadius) - (tPointOnTrackball.lengthSq()));       // Pythagorian theroem
    }

    const t = tPointOnTrackball.normalize();

    //assert
    equal.vec3(s,t)
  })
})