import React from 'react';
import { Group, Rect } from 'react-konva';

class ContainerRenderElement extends React.Component {
    scaled(val) {
        return this.props.scale * val;
    }

    render() {
        return (
            <Group>
                <Rect
                    x={0}
                    y={0}
                    width={this.props.width}
                    height={this.props.height}
                    stroke={"black"}
                    strokeWidth={1}
                    dash={[2,1]}
                />
            </Group>
        );
    }
}

export default ContainerRenderElement;
