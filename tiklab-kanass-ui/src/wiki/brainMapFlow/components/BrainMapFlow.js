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

import { useGraphConfig } from './ConfigGraph'
/** 配置Dnd组件面板 */
import { DndNode } from './DndNode.js'
import { message } from 'antd'

import './brainMapFlowRead.scss'

const BrainMapFlow = props => {
  const { meta,graphData, setGraphData } = props
  // const [meta, setMeta] = React.useState({})
  const toolbarConfig = useToolbarConfig(props)
  const menuConfig = useMenuConfig(props)
  const keybindingConfig = useKeybindingConfig(props)
  const graphRef = useRef()
  // const [graphData, setGraphData] = useState(value)
  const commandConfig = useCmdConfig(props)
  /** 画布配置 */
  const graphConfig = useGraphConfig()
  /**
   * @param app 当前XFlow工作空间
   * @param extensionRegistry 当前XFlow配置项
   */

  const setGraphLoacalData = (data) => {
    const newData = { nodes: [], edges: [] }
    data.forEach((item) => {
      if (item.shape === "react-shape") {
        newData.nodes.push(item.data)
      }
      if (item.shape === "edge") {
        newData.edges.push(item.data)
      }
      
    })
    setGraphData({ ...newData })
  }
  const onLoad = async app => {
    graphRef.current = await app.getGraphInstance()
    // executeCommand

    console.log(graphRef.current)
    graphRef.current.on('node:click', ({ e, x, y, node, view }) => {
      const nodeData = node.getData()
      console.log(nodeData)
      message.success(`${nodeData.id}节点被点击了`)
    })
    graphRef.current.on('edge:click', ({ e, x, y, edge, view }) => {
      edge.toFront()
      const edgeData = edge.getData()
      console.log(edgeData)
      message.success(`${edgeData.id}连线被点击了`)
    })

    graphRef.current.on('graph:mouseleave', ({ e }) => {
      const graph = graphRef.current;
      const graphDataJson = graph.toJSON().cells;
      setGraphLoacalData(graphDataJson);
    })
  }

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.on('node:click', (...arg) => {
        console.log(arg)
      })
    }
    // MODELS.GRAPH_META.useValue(app.modelService).then(meta => {
    //   setMeta(meta)
    //   console.log(meta)
    // })
  }, [graphRef])


  return (
    <XFlow
      className="flow-user-custom-clz"
      commandConfig={commandConfig}
      onLoad={onLoad}
      graphData={graphData}
      style={{height: 500}}
    >
      <FlowchartExtension />
      <FlowchartNodePanel
        registerNode={{
          title: '自定义节点',
          nodes: [
            {
              component: DndNode,
              popover: () => <div>自定义节点</div>,
              name: 'custom-node-indicator',
              width: 210,
              height: 130,
              label: '自定义节点',
            },
          ],
        }}
        position={{ width: 162, top: 40, bottom: 0, left: 0 }}
      />
      <CanvasToolbar
        {...props}
        className="xflow-workspace-toolbar-top"
        layout="horizontal"
        config={toolbarConfig}
        position={{ top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <FlowchartCanvas position={{ height: 400,top: 40, left: 0, right: 0, bottom: 0 }}>
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
      <FlowchartFormPanel show={true} position={{ width: 200, top: 40, bottom: 0, right: 0 }} />
      <KeyBindings config={keybindingConfig} />
    </XFlow>
  )
}

export default BrainMapFlow