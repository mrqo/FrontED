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
                align={this.props.model.properties.contentHorAlignment}
                verticalAlign={
                    this.props.model.properties.contentVerAlignment == 'center'
                    ? 'middle'
                    : this.props.model.properties.contentVerAlignment
                }
                width={this.props.width} 
                height={this.props.height}
                text={this.props.model.properties.text}
                fill={this.props.model.properties.bgColor}
                fontSize={this.scaled(this.props.model.properties.textSize)}/>
        </Group>
      );
    }
}

export default LabelRenderElement;
  