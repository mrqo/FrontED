import React from 'react';
import { Group, Rect, Text, Image } from 'react-konva';

class ImageRenderElement extends React.Component {
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
                    y={0 - 10}
                    width={this.props.width}
                    height={this.props.height}
                    align={"center"}
                    text={"IMAGE PLACEHOLDER"}/>
                <Image
                    x={0}
                    y={0}
                    width={this.props.width}
                    height={this.props.height}
                    src={this.props.content.src}/>
            </Group>
        );
    }
}

export default ImageRenderElement;