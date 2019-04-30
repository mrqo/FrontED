import React from 'react';
import { Group, Rect, Text } from 'react-konva';

class ButtonRenderElement extends React.Component {
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
                    fill={"transparent"}
                    cornerRadius={this.scaled(3)}
                    strokeWidth={this.scaled(2)}
                    stroke={"green"}
                    lineCap={"round"} />
                <Text
                    x={0}
                    y={this.props.height / 2 - (this.scaled(13 / 2))}
                    width={this.props.width}
                    height={10}
                    align={"center"}
                    text={"BUTTON"}
                    fill={"green"}
                    fontSize={this.scaled(13)}
                    scale={this.props.scale} />
            </Group>
        );
    }
}

export default ButtonRenderElement;
