import React from 'react';
import { Group, Text } from 'react-konva';

class LabelRenderElement extends React.Component {
    render() {
      return (
        <Group>
            <Text
                x={0} 
                y={0} 
                width={this.props.width} 
                height={this.props.height}
                align={"center"}
                text={this.props.content.text}/>
        </Group>
      );
    }
}

export default LabelRenderElement;
  