import React from 'react';
import PubSub from 'pubsub-js';
import { topic } from '../../Domain/Enums/PubSubTopics';
import { ElementType } from '../../Domain/Enums/Elements.js';

import { Stage, Layer, Rect, Text, Circle, Group, Image } from 'react-konva';
import Konva from 'konva';

class WorkspaceSheet extends React.Component {
  render() {
    const cam = this.props.camera;
    return (
      <Rect
        x={cam.transformX(-this.props.width/2.)}
        y={cam.transformY(-this.props.height/2.)}
        width={cam.scale(this.props.width)}
        height={cam.scale(this.props.height)}
        shadowBlur={30}
        shadowOffset={ {x: 10, y: 20} }
        fill={"white"}
      />
    )
  }
}

export default WorkspaceSheet;
