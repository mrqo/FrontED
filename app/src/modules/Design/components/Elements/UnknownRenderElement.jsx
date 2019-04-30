import React from 'react';
import { Group, Rect, Text } from 'react-konva';

class UnknownRenderElement extends React.Component {
    render() {
        return (
            <Group>
                <Rect
                    x={0}
                    y={0}
                    width={15}
                    height={15}
                    fill={"red"} />
                <Text
                    x={-200}
                    y={-10}
                    width={400}
                    align={"center"}
                    text={"Unknown element: " + this.props.type} />
            </Group>
        );
    }
}

export default UnknownRenderElement;