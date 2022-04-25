import React, { useEffect, useState } from 'react'
import { XFlow, XFlowCanvas } from '@antv/xflow'
/** 图的各种扩展交互组件 */
import { CanvasMiniMap, CanvasScaleToolbar, CanvasSnapline } from '@antv/xflow'
/** 图的配置项 */
import { useGraphConfig } from './components/config-graph'
import { message } from 'antd'
import { useCmdConfig } from '../brainMapFlow/config-cmd'
// import './index.less'
import '@antv/xflow/dist/index.css';
import { observer, inject } from "mobx-react";

const BrainMap = (props) => {
  const commandConfig = useCmdConfig(props)
  /** 画布配置 */
  const graphConfig = useGraphConfig()

  // const {graphData} = props;
  /** 画布渲染数据 */
  const [graphData, setGraphData] = useState(graphData)
  // useEffect(()=> {
  //   // setGraphData(graphData)
  //   onLoad()
  // },[graphData])
  const documentId = localStorage.getItem("documentId");
  // const {findDocument} = WikiCatalogueStore;
  const onLoad = async app => {
    const nodes = [
      { id: 'root1', width: 150, height: 40, renderKey: 'NODE1', info: { text: 'root1' } },
      { id: 'down1', width: 150, height: 40, renderKey: 'NODE2', info: { text: 'down1' } },
      { id: 'down2', width: 150, height: 40, renderKey: 'NODE2', info: { text: 'down2' } },
      { id: 'down3', width: 150, height: 40, renderKey: 'NODE2', info: { text: 'down3' } },
    ]
    const edges = [
      {
        id: 'root1-down1',
        source: 'root1',
        target: 'down1',
        renderKey: 'EDGE1',
        info: { line: 'root1-down1' },
      },
      {
        id: 'root1-down2',
        source: 'root1',
        target: 'down2',
        renderKey: 'EDGE2',
        info: { line: 'root1-down2' },
      },
      {
        id: 'root1-down3',
        source: 'root1',
        target: 'down3',
        label: '1:N(纯文本)',
        info: { line: 'root1-down3' },
      },
    ]
    const graphData = { nodes, edges }
    // findDocument(documentId).then((data) => {

		// 	if (data.code === 0) {
		// 		if(data.data.details){
    //         const jsonData = JSON.parse(data.data.details);
    //         console.log(jsonData)
    //         setGraphData(jsonData)
    //     }
		// 	}
		// })
    setGraphData(graphData)
  }

  return (
    <XFlow
      className="xflow-user-container"
      commandConfig={commandConfig}
      graphData={graphData}
      graphLayout={{
        layoutType: 'dagre',
        layoutOptions: {
          type: 'dagre',
          rankdir: 'TB',
          nodesep: 60,
          ranksep: 40,
        },
      }}
      onLoad={onLoad}
      isAutoCenter={true}
    >
      <XFlowCanvas config={graphConfig}>
        <CanvasScaleToolbar position={{ top: 12, left: 12 }} />
        <CanvasMiniMap
          miniMapClz="xflow-custom-minimap"
          nodeFillColor="#ccc"
          minimapOptions={{
            width: 200,
            height: 120,
          }}
          position={{ top: 12, right: 12 }}
        />
        <CanvasSnapline color="#1890ff" />
      </XFlowCanvas>
    </XFlow>
  )
}

// export default BrainMap;
export default inject("WikiCatalogueStore")(observer(BrainMap));