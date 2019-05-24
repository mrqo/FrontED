import React from 'react';
import { Group, Rect, Text, Image } from 'react-konva';

class ImageRenderElement extends React.Component {
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
                    fill={"red"}/>
                <Text
                    x={0}
                    y={0 - this.scaled(10)}
                    width={this.props.width}
                    height={this.props.height}
                    align={"center"}
                    text={"IMAGE PLACEHOLDER"}
                    fontSize={this.scaled(10)}/>
                <Image
                    x={0}
                    y={0}
                    width={this.props.width}
                    height={this.props.height}
                    src={this.props.model.properties.src}
                    image={this.props.model.properties.image}
                    />
            </Group>
        );
    }
}

export default ImageRenderElement;
