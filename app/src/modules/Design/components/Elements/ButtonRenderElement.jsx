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
                    width= {this.props.width}
                    height={this.props.height}
                    cornerRadius={this.scaled(this.props.model.properties.borderRadius)}
                    strokeWidth={this.scaled(this.props.model.properties.strokeWidth)}
                    stroke={this.props.model.properties.borderColor}
                    fill={this.props.model.properties.bgColor}
                    lineCap={"round"}/>
                <Text
                    x={0}
                    y={this.props.height / 2}
                    width={this.props.width}
                    height={this.props.height / 8}
                    align={"center"}
                    verticalAlign={'middle'}
                    text={this.props.model.properties.text}
                    fill={this.props.model.properties.textColor}
                    fontSize={this.scaled(this.props.model.properties.textSize)}
                    scale={this.props.scale}/>
            </Group>
        );
    }
}

export default ButtonRenderElement;
