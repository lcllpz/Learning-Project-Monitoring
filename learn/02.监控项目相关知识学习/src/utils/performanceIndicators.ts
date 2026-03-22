/***
 * 指标性能采集
 * */

import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'

const performancesData = {
  fcp: null,
  lcp: null,
  ttfb: null,
  inp: null,
  cls: null
}
type keyType = keyof typeof performancesData

const collectData = (key: keyType, value: any) => {
  performancesData[key] = value
}

const handler = (key: keyType, keFN: any) => {
  return new Promise((res) => {
    keFN((value: any) => {
      collectData(key, value)
      res(value)
    })
  })
}

/**
 * 收集完指标一起输出上传
 */
export const colllectWebVitals = async () => {
  try {
    const data = await Promise.all([
      handler('fcp', onFCP),
      handler('inp', onINP),
      handler('lcp', onLCP),
      handler('ttfb', onTTFB),
      handler('cls', onCLS)
    ])
    console.log('performancesData', data)
  } catch (error) {
    console.log(error)
  }

  return
}

// 计算并获取当前页面的加载时长，优先通过标准的 Performance API 精准计算，无有效数据时用备选方案兜底。
// FMP First Meaningful Paint
export function onLoadPerformanceFMP() {
  // 获取当前导航条数
  // 浏览器 performance 核心 API，获取「导航类型」的性能条目（记录页面从开始加载到完成的全流程时间数据）；
  // 包含页面导航 / 加载的所有时间维度（如 startTime、loadEventEnd 等）；
  const navigationEntries = performance.getEntriesByType('navigation')
  console.log('navigationEntries', navigationEntries)

  // 如果存在导航条目，取第一个
  if (navigationEntries.length > 0) {
    const entry = navigationEntries[0] as PerformanceNavigationTiming

    // 计算页面加载时长
    let loadTime = entry ? entry.loadEventEnd - entry.startTime : 10

    // 确保 loadTime 不为 0 或负数
    if (loadTime <= 0) {
      // 尝试使用其他方法计算加载时间
      loadTime = performance.now()
    }

    // 执行回调函数
    console.log('onLoadPerformanceFMP->', loadTime)
  } else {
    // 如果没有导航条目，使用 performance.now() 作为备选
    const loadTime = performance.now()

    console.log(loadTime)
  }
}
