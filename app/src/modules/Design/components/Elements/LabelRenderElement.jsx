import React from 'react';
import { Group, Text } from 'react-konva';

class LabelRenderElement extends React.Component {
    render() {
      return (
        <Group>
            <Text
                x={0} 
                y={0} 
                align={"center"}
                width={this.props.model.properties.width} 
                height={this.props.model.properties.height}
                text={this.props.model.properties.text}/>
        </Group>
      );
    }
}

export default LabelRenderElement;
  