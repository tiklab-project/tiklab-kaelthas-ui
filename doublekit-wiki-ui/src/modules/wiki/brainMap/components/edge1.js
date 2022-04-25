import React from 'react'
import { NsGraph } from '@antv/xflow'
import { useAppContext } from '@antv/xflow'
import { Tooltip } from 'antd'
import './node.scss'

const Edge1 = props => {
  const ctx = useAppContext()
  // console.log('edge useAppContext', ctx);
  // console.log('edge props:', props);
  return (
    <div className="edge1-container">
      <Tooltip
        title="这是连线上渲染的React内容"
        // defaultVisible={true}
      >
        <div>hover我</div>
      </Tooltip>
    </div>
  )
}
export default Edge1