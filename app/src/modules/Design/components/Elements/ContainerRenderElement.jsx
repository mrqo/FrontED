import React from 'react';
import { Group, Rect } from 'react-konva';

class ContainerRenderElement extends React.Component {
    render() {
        return (
            <Group>
                <Rect
                    x={0}
                    y={0}
                    width={this.props.model.properties.width}
                    height={this.props.model.properties.height}
                    stroke={"black"}
                    strokeWidth={1}
                    dash={[2,1]}
                />
            </Group>
        );
    }
}

export default ContainerRenderElement;
