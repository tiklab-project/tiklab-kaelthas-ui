import React from 'react'
import { createGraphConfig} from '@antv/xflow'

export const useGraphConfig = createGraphConfig(config => {
  /** 设置XFlow画布配置项 */
  config.setX6Config({
    /** 画布网格 */
    grid: true,
    height: 400,
    /** 画布缩放等级 */
    scaling: {
      min: 0.2,
      max: 3,
    }
  })
})