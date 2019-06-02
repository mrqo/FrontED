import React from 'react';
import { Group, Rect, Text, Image } from 'react-konva';

import useImage from 'use-image';

const UrlImage = (props) => {
    const [image] = useImage(props.url);
    return <Image image={image} {...props}/>
}

class ImageRenderElement extends React.Component {
    scaled(val) {
        return this.props.scale * val;
    }

    render() {
        return (
            <Group>
                <UrlImage
                    x={0}
                    y={0}
                    width={this.scaled(this.props.model.properties.width)}
                    height={this.scaled(this.props.model.properties.height)}
                    url={this.props.model.properties.src}/>
            </Group>
        );
    }
}

export default ImageRenderElement;
