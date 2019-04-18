import React from 'react';
import PubSub from 'pubsub-js';
import { topic } from '../../Domain/Enums/PubSubTopics';
import { ElementType } from '../../Domain/Enums/Elements.js';

import { Stage, Layer, Rect, Text, Circle, Group, Image } from 'react-konva';
import Konva from 'konva';



class RenderElement extends React.Component {

  getTag(type) {
    switch (type)
    {
      case ElementType.Container: return ContainerRenderElement;
      case ElementType.Image:     return ImageRenderElement;
      case ElementType.Label:     return LabelRenderElement;
      case ElementType.Button:    return ButtonRenderElement;
    }
    console.warn("Unknown RenderElement type: " + type);
    return UnknownRenderElement;
  }

  render() {
    const Tag = this.getTag(this.props.model.meta.type);
    const mdl = this.props.model;
    const cam = this.props.camera;
    const width  = mdl.properties.width  == null ? 64 : mdl.properties.width; // weird hack because it is undefined
    const height = mdl.properties.height == null ? 64 : mdl.properties.height;
    return <Tag
      x = { cam.transformX(mdl.properties.x) }
      y = { cam.transformY(mdl.properties.y) }
      width  = { cam.scale(width)  }
      height = { cam.scale(height) }
      type    = { mdl.meta.type }
      content = { mdl.content }

      draggable={true}
      onDragEnd={(e) => 
          { this.props.updateElementPosition(
                this.props.idx, 
                cam.untransformX(e.target.x()),
                cam.untransformY(e.target.y())
          )}
        }

    />
  }
}


class UnknownRenderElement extends React.Component {
  render() {
    return <Group draggable={true}>
      <Rect 
        x={this.props.x} 
        y={this.props.y} 
        width={15} 
        height={15}
        fill={"red"}
      />
      <Text
        x={this.props.x-200} 
        y={this.props.y-10} 
        width={400} 
        align={"center"}
        text={"Unknown element: " + this.props.type}
      />
    </Group>
  }
}

class ContainerRenderElement extends React.Component {
  render() {
    return <Group draggable={true}>
      <Rect 
        x={this.props.x} 
        y={this.props.y} 
        width={this.props.width} 
        height={this.props.height} 
        stroke={"black"}
      />
    </Group>
  }
}

class ImageRenderElement extends React.Component {
  render() {
    return <Group draggable={true}>
      <Rect 
        x={this.props.x} 
        y={this.props.y} 
        width={this.props.width} 
        height={this.props.height} 
        fill={"red"}
      />
      <Text
        x={this.props.x} 
        y={this.props.y-10} 
        width={this.props.width} 
        height={this.props.height} 
        align={"center"}
        text={"IMAGE PLACEHOLDER"}
      />
      <Image
        x={this.props.x} 
        y={this.props.y} 
        width={this.props.width} 
        height={this.props.height} 
        src={this.props.content.src}
      />
    </Group>
  }
}

class ButtonRenderElement extends React.Component {
  render() {
    return <Group draggable={true}>
      <Rect 
        x={this.props.x} 
        y={this.props.y} 
        width={this.props.width} 
        height={this.props.height} 
        fill={"red"}
      />
      <Text
        x={this.props.x} 
        y={this.props.y} 
        width={this.props.width} 
        height={this.props.height} 
        align={"center"}
        text={"BUTTON"}
      />
    </Group>
  }
}

class LabelRenderElement extends React.Component {
  render() {
    return <Group draggable={true}>
      <Text
        x={this.props.x} 
        y={this.props.y} 
        width={this.props.width} 
        height={this.props.height}
        align={"center"}
        text={this.props.content.text}
      />
    </Group>
  }
}



export { RenderElement, UnknownRenderElement, ButtonRenderElement, ContainerRenderElement, ImageRenderElement, LabelRenderElement };
