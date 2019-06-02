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
                    lineCap={"round"}
                    shadowOffsetX={this.scaled(this.props.model.properties.shadowOffsetX)}
                    shadowOffsetY={this.scaled(this.props.model.properties.shadowOffsetY)}
                    shadowBlur={this.props.model.properties.shadowBlur}
                    shadowColor={this.props.model.properties.shadowColor}/>
                <Text
                    x={4}
                    y={4}
                    width={this.props.width - 4}
                    height={this.props.height}
                    align={this.props.model.properties.contentHorAlignment}
                    verticalAlign={
                        this.props.model.properties.contentVerAlignment == 'center'
                        ? 'middle'
                        : this.props.model.properties.contentVerAlignment
                    }
                    text={this.props.model.properties.text}
                    fill={this.props.model.properties.textColor}
                    fontSize={this.scaled(this.props.model.properties.textSize)}
                    fontFamily={this.props.model.properties.fontFamily}
                    scale={this.props.scale}/>
            </Group>
        );
    }
}

export default ButtonRenderElement;
