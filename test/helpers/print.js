module.exports = {
  vec3: (data, label = '') => {
    if(data.toArray) data = data.toArray()
    let msg = label + '  [' + data + ']'
    console.log(msg)
  },
  mat: (data, label = '') => {
    let msg = label + '  [' + ((data.elements) ? data.elements : data) + ']'
    console.log(msg)
  },
  quat: (data, label = '') => {
    if(data.toArray) {
      data = data.toArray()
    }
    let msg = label + '  [' + data + ']'
    console.log(msg)
  }
}