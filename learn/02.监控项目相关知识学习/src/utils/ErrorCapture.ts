/**
 * 异常采集 ​
 * */
export const errorInit = () => {
  // 捕获报错：不能捕获try catch已经捕获的
  window.onerror = (msg: any) => {
    console.log('window.onerror:', msg)
  }
  // 捕获报错：不能捕获catch已经捕获的
  window.onunhandledrejection = (msg: any) => {
    console.log('window.onunhandledrejection:', msg)
  }
}
