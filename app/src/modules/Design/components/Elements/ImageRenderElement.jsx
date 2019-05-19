import React from 'react';
import { Group, Rect, Text, Image } from 'react-konva';

class ImageRenderElement extends React.Component {
    render() {
        return (
            <Group>
                <Rect
                    x={0}
                    y={0}
                    width={this.props.model.properties.width}
                    height={this.props.model.properties.height}
                    fill={"red"}/>
                <Text
                    x={0}
                    y={0 - 10}
                    width={this.props.model.properties.width}
                    height={this.props.model.properties.height}
                    align={"center"}
                    text={"IMAGE PLACEHOLDER"}/>
                <Image
                    x={0}
                    y={0}
                    width={this.props.model.properties.width}
                    height={this.props.model.properties.height}
                    src={this.props.model.properties.src}
                    image={this.props.model.properties.image}
                    />
            </Group>
        );
    }
}

export default ImageRenderElement;
