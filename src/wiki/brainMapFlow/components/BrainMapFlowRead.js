import React, { useRef, useEffect, useState } from 'react'
/** 交互组件 */
import {
  /** XFlow核心组件 */
  XFlow,
  /** 流程图画布组件 */
  FlowchartCanvas,
  /** 流程图配置扩展 */
  FlowchartExtension,
  /** 流程图节点组件 */
  FlowchartNodePanel,
  /** 流程图表单组件 */
  FlowchartFormPanel,
  /** 通用组件：快捷键 */
  KeyBindings,
  /** 通用组件：画布缩放 */
  CanvasScaleToolbar,
  /** 通用组件：右键菜单 */
  CanvasContextMenu,
  /** 通用组件：工具栏 */
  CanvasToolbar,
  /** 通用组件：对齐线 */
  CanvasSnapline,
  /** 通用组件：节点连接桩 */
  CanvasNodePortTooltip,
  MODELS,
  useXFlowApp,
  XFlowModelCommands
} from '@antv/xflow'
/** 配置Command*/
import { useCmdConfig } from './ConfigCmd'
/** 配置Menu */
import { useMenuConfig } from './ConfigMenu'
/** 配置Toolbar */
import { useToolbarConfig } from './ConfigToolbar'
/** 配置快捷键 */
import { useKeybindingConfig } from './ConfigKeybinding'

// import './index.less'
import './brainMapFlowRead.scss'
const BrainMapFlowRead = props => {
  const { meta,graphData, setGraphData } = props
  // const [meta, setMeta] = React.useState({})
  const toolbarConfig = useToolbarConfig(props)
  const menuConfig = useMenuConfig(props)
  const keybindingConfig = useKeybindingConfig(props)
  const graphRef = useRef()
  // const [graphData, setGraphData] = useState(value)
  const commandConfig = useCmdConfig(props)
  /**
   * @param app 当前XFlow工作空间
   * @param extensionRegistry 当前XFlow配置项
   */
  const onLoad = async app => {
    graphRef.current = await app.getGraphInstance()
    // executeCommand

  }

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.on('node:click', (...arg) => {
        console.log(arg)
      })
    }
  }, [graphRef])


  return (
    <XFlow
      className="flow-user-custom-clz"
      commandConfig={commandConfig}
      onLoad={onLoad}
      meta={meta}
      graphData={graphData}
      style={{height: 450}}
    >
      <FlowchartCanvas position={{height: 400, top: 40, left: 0, right: 0, bottom: 0 }}>
        <CanvasScaleToolbar
          layout="horizontal"
          position={{ top: -40, right: 0 }}
          style={{
            width: 120,
            left: 'auto',
            height: 39,
          }}
        />
        <CanvasContextMenu config={menuConfig} />
        <CanvasSnapline color="#faad14" />
        <CanvasNodePortTooltip />
      </FlowchartCanvas>
    </XFlow>
  )
}

export default BrainMapFlowRead;