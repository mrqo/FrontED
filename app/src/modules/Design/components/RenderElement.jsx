import React from 'react';
import { ElementType } from '../../Domain/Enums/Elements.js';

import ButtonRenderElement from './Elements/ButtonRenderElement';
import ContainerRenderElement from './Elements/ContainerRenderElement';
import ImageRenderElement from './Elements/ImageRenderElement';
import LabelRenderElement from './Elements/LabelRenderElement';
import UnknownRenderElement from './Elements/UnknownRenderElement';

import PubSub from 'pubsub-js';
import { topic } from '../../Domain/Enums/PubSubTopics';

import { Group } from 'react-konva';

class RenderElement extends React.Component {

    getTag(type) {
        switch (type) {
            case ElementType.Container: return ContainerRenderElement;
            case ElementType.Image: return ImageRenderElement;
            case ElementType.Label: return LabelRenderElement;
            case ElementType.Button: return ButtonRenderElement;
        }
        console.warn("Unknown RenderElement type: " + type);
        return UnknownRenderElement;
    }

    render() {
        const Tag = this.getTag(this.props.model.meta.type);
        const mdl = this.props.model;
        const cam = this.props.camera;
        let width = mdl.properties.width == null ? 64 : mdl.properties.width; // weird hack because it is undefined
        if (width == "" || width < 0) width = "auto";
        let height = mdl.properties.height == null ? 64 : mdl.properties.height;
        if (height == "" || height < 0) height = "auto";
        const scale = 1.0;

        return (
          <Group
              draggable={true}
              onDragMove={this.onDrag} // sometimes laggy, but necessary for selector and properties
              onDragEnd= {this.onDrag}
              onClick={this.onClick}
              x={cam.transformX(mdl.properties.x)}
              y={cam.transformY(mdl.properties.y)}>
              <Tag
                  width={cam.scale(width)}
                  height={cam.scale(height)}
                  type={mdl.meta.type}
                  content={mdl.content}
                  model={mdl}
                  scale={cam.scale(scale)}/>
          </Group>
        );
    }

    onDrag = (e) => {
        this.props.updateElementPosition(
            this.props.idx,
            this.props.camera.untransformX(e.target.x()),
            this.props.camera.untransformY(e.target.y())
        )
        // Selecting element in Design view
        PubSub.publish(topic.ElemSelectionChanged, {
            oldSel: null,
            newSel: this.props.model
        })
    }

    onClick = (e) => {
        // Selecting element in Design view
        PubSub.publish(topic.ElemSelectionChanged, {
            oldSel: null,
            newSel: this.props.model
        })
    }
}

export default RenderElement;
