import React from 'react';
import { Group, Rect } from 'react-konva';

class ContainerRenderElement extends React.Component {
    render() {
        return (
            <Group>
                <Rect
                    x={0}
                    y={0}
                    width={this.props.width}
                    height={this.props.height}
                    stroke={"black"}/>
            </Group>
        );
    }
}

export default ContainerRenderElement;