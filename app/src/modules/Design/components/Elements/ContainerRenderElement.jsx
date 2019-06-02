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
