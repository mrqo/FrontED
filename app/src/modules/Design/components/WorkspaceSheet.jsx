import React from 'react';
//import PubSub from 'pubsub-js';
import { topic } from '../../Domain/Enums/PubSubTopics';
import { ElementType } from '../../Domain/Enums/Elements.js';

import { Rect } from 'react-konva';
//import { Stage, Layer, Rect, Text, Circle, Group, Image } from 'react-konva';
//import Konva from 'konva';

class WorkspaceSheet extends React.Component {
  render() {
    const cam = this.props.camera;
    //const x = -this.props.width / 2.;
    //const y = -this.props.height / 2.;
    const x = 0;
    const y = 0;
    return (
      <Rect
        x={cam.transformX(x)}
        y={cam.transformY(y)}
        width={cam.scale(this.props.width)}
        height={cam.scale(this.props.height)}
        shadowOpacity={0.2}
        shadowBlur={20}
        shadowOffset={{ x: 2, y: 2 }}
        fill={"white"}
      />
    )
  }
}

export default WorkspaceSheet;
