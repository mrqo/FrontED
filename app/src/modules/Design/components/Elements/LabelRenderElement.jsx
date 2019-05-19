import React from 'react';
import { Group, Text } from 'react-konva';

class LabelRenderElement extends React.Component {
  scaled(val) {
    return this.props.scale * val;
  }

  render() {
      return (
        <Group>
            <Text
                x={0} 
                y={0} 
                align={"center"}
                width={this.props.model.properties.width} 
                height={this.props.model.properties.height}
                text={this.props.model.properties.text}
                fill={this.props.model.properties.bgColor}
                fontSize={this.scaled(this.props.model.properties.textSize)}/>
        </Group>
      );
    }
}

export default LabelRenderElement;
  