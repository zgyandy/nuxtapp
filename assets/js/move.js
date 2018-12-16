// 参数
// 1、dom 元素对象
// 2、target要改变的属性及最终结果
// 3、运动结束后的回调函数
// 4、速度
// 5、时间
function move({dom, target, fn, speed, time}) {
  var buffer = speed ? false : true
  clearInterval(dom.timer)
  dom.timer = setInterval(function() {
    var isOk = true
    var current
    for (var property in target) {
      // 1. 获取当前值
      if (property == 'opacity') {
        current = Math.round(parseFloat(getStyle(dom, property)) * 100)
      } else {
        current = parseInt(getStyle(dom, property)) // "100px"
      }
      // 2. 算速度
      if (buffer) {
        speed = (target[property] - current) / 8
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
      }
      // 3. 判断是否到达终点
      if (current != target[property]) {
        isOk = false
      } else {
        // 在当前属性到到达终点时, 直接跳过运动, 进行下一个属性
        continue // 4. 如果没有到达终点, 那么再做一次运动
      }
      if (property == 'opacity') {
        dom.style.opacity = '' + (current + speed) / 100
        dom.style.filter = 'alpha(opacity=' + (current + speed) + ')'
      } else {
        dom.style[property] = current + speed + 'px'
      }
    }
    // 在循环结束之后, 去检测isOk的状态
    if (isOk) {
      clearInterval(dom.timer)
      fn && fn()
    }
  }, time ? time : 30)
}

// 封装一个函数, 用于获取非行内样式
function getStyle(dom, property) {
  if (dom.currentStyle) {
    return dom.currentStyle[property]
  } else {
    return window.getComputedStyle(dom)[property]
  }
}
export {move, getStyle}
