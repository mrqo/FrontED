import React from 'react';
//import PubSub from 'pubsub-js';
import { topic } from '../../Domain/Enums/PubSubTopics';
import { ElementType } from '../../Domain/Enums/Elements.js';

import { Rect, Group, Text } from 'react-konva';
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
      <Group>
        <Text
          x={cam.transformX(x)}
          y={cam.transformY(y - 35)}
          align={"left"}
          text={this.getTitle()}
          fontSize={cam.scale(25)}
          opacity={0.2}
          fontFamily={"calibri"}
          fontStyle={"italic"}/>
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
      </Group>

    )
  }

  getTitle() {
      // format of resulting string
      const format = "${name} (${width}x${height})";

      // fallback project name (when missing)
      const defaultProjectName = "Project";
      
      let projectName = this.props.projectName ? this.props.projectName : defaultProjectName;
      let width       = this.props.width  ? this.props.width  : 0;
      let height      = this.props.height ? this.props.height : 0;

      var str = format
                    .replace("${name}", projectName)
                    .replace("${width}", width)
                    .replace("${height}", height);
      
      if (str == format) 
          return "";

      return str;
  }
}

export default WorkspaceSheet;
