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
import { useCmdConfig } from '../components/config-cmd'
import { useMenuConfig } from '../components/config-menu'
import { useToolbarConfig } from '../components/config-toolbar'
import { useKeybindingConfig } from '../components/config-keybinding'

import { useGraphConfig } from '../components/config-graph'
import { DndNode } from '../components/dnd-node.js'
import { message } from 'antd'

import '../components/brainMapFlowRead.scss'

const BrainMapFlow = props => {
	const { graphData, setGraphData } = props;
	console.log(graphData)
	// const [meta, setMeta] = React.useState({})
	// const [graphData, setGraphData] = useState()
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
			style={{ height: 500 }}
		>
			<FlowchartCanvas config={{height: 400}} position={{ height: 400, top: 40, left: 0, right: 0, bottom: 0 }}>
				{/* <CanvasScaleToolbar
					layout="horizontal"
					position={{ top: -40, right: 0 }}
					style={{
						left: 'auto',
						height: 39,
					}}
				/> */}
				<CanvasSnapline color="#faad14" />
				<CanvasNodePortTooltip />
			</FlowchartCanvas>
			<KeyBindings config={keybindingConfig} />
		</XFlow>

	)
}

export default BrainMapFlow