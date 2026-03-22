import { useState } from 'react'

import {
  colllectWebVitals,
  errorInit,
  initObserver,
  instrumentDOMEvents,
  instrumentFetch,
  onLoadPerformanceFMP
} from './utils'
;(() => {
  // 性能指标采集
  colllectWebVitals()
  onLoadPerformanceFMP()
  // 异常采集 ​
  errorInit()
  // 事件采集(自定义、埋点)
  instrumentDOMEvents()
  instrumentFetch()
  initObserver()
})()

const App = () => {
  const [isShow, setIsShow] = useState(false)
  return (
    <div>
      <button
        onClick={() => {
          // e.preventDefault()
          fn()
          // e.stopPropagation()
        }}
      >
        全局错误捕获
      </button>
      <button
        onClick={() => {
          try {
            fn()
          } catch (error) {
            console.log('error', error)
          }
        }}
      >
        全局错误捕获2
      </button>
      <div></div>
      <button
        onClick={() => {
          Promise.reject('onunhandledrejection-->')
        }}
      >
        onunhandledrejection
      </button>
      <button
        onClick={() => {
          Promise.reject('onunhandledrejection-->').catch((err) => {
            console.log('err', err)
          })
        }}
      >
        onunhandledrejection2
      </button>
      <div></div>

      <button
        onClick={() => {
          console.log('this', this)

          fetch('/ll')
            .then((res) => {
              console.log(res)
            })
            .catch((err) => {
              console.log(err)
            })
        }}
      >
        instrumentFetch
      </button>

      <div></div>
      <button
        onClick={() => {
          setIsShow(!isShow)
        }}
      >
        控制显影
      </button>
      {isShow ? (
        <h1 data-sp="lcl">111 {isShow}</h1>
      ) : (
        <h2 data-sp="lcl">222{isShow}</h2>
      )}
    </div>
  )
}

export default App
