// 获取点击的节点
export const instrumentDOMEvents = () => {
  document.body.addEventListener('click', (event: PointerEvent) => {
    // e.stopPropagation() 可被事件冒泡影响
    console.log('instrumentDOMEvents->click', event)
  })
}

export const instrumentFetch = () => {
  const fetch = window.fetch
  window.fetch = (...arg) => {
    console.log('拦截fetch')
    return fetch(...arg)
  }
}

// 代理 XHR 请求
export function instrumentXHR() {
  const originalXhrSend = XMLHttpRequest.prototype.send

  XMLHttpRequest.prototype.send = function (...args) {
    console.log('Captured XHR request:', this)

    this.addEventListener('load', function () {
      console.log('XHR response received:', this)
    })
    return originalXhrSend.apply(this, args)
  }
}

// 保底捕获错误-> 捕获错误上传
window.addEventListener('beforeunload', (e) => {
  console.log('beforeunload--->', e)
  // debugger
})

document.addEventListener('visibilitychange', (e) => {
  console.log('visibilitychange--->', e)
  // debugger
})

// domg观察

export const initObserver = () => {
  const observer = new MutationObserver((mutations) => {
    if (mutations[0].removedNodes.length) {
      console.log(
        'mutations---》',
        mutations[0].removedNodes[0].getAttribute('data-sp')
      )
    }
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false, // 不需要监听属性变化可关闭
    characterData: false
  })
}
