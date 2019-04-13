import React from 'react';
import PubSub from 'pubsub-js';
import { topic } from '../../Domain/Enums/PubSubTopics';

import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';

import Widget from '../../Common/components/Widget';
import '../../Common/components/Widget.css';

class ColoredRect extends React.Component {
    state = {
      color: 'green'
    };

    handleClick = () => {
      this.setState({
        color: Konva.Util.getRandomColor()
      });
    };

    render() {
      return (
        <Rect
          x={20}
          y={20}
          width={50}
          height={50}
          fill={this.state.color}
          shadowBlur={5}
          onClick={this.handleClick}
          draggable
        />
      );
    }
  }

class EditingWidget extends Widget {
    state = {
        "widgetName": "Design",
        "height": 500,
        "width": 500,
    }

    constructor(props) {
        super(props);
        this._modelChangedEventToken = PubSub.subscribe(topic.ModelChanged, this.onModelChanged.bind(this));
    }

    componentDidMount() {
        let parent = document.querySelector("#design .widget-content")
        this.setState({height: parent.clientHeight+40, width: parent.clientWidth-30})
        //this.stage.current.on('dragstart', (evt) => { this.onDragStart(evt.target) });
        //this.stage.current.on('dragend', (evt) => { this.onDragEnd(evt.target) });
    }

    getContent() {
        return (
            <Stage 
                width={this.state.width}
                height={this.state.height}
                className="widget-content"
                ref="stage">
                <Layer 
                    id="srcLayer"
                    ref="srcLayer">
                    <ColoredRect/>
                </Layer>
            </Stage>
        )
    }
    
    onDragStart(shape) {
        shape.moveTo(this.dragLayer.current);
        this.stage.current.draw();
        
        shape.setAttrs({
            scale: {
                x: shape.getAttr('startScale') * 1.2,
                y: shape.getAttr('startScale') * 1.2
            }
        });
    }

    onDragEnd(shape) {
        shape.moveTo(this.srcLayer.current);
        this.stage.current.draw();
    }

    onModelChanged(msg, model) {
        this.refs.srcLayer.add(
            new Konva.Rect({
                  x : 200,
                  y : 200,
                  width : 50,
                  height : 50,
                  fill : "black",
                  draggable : "true"
            })
        )
        this.refs.stage.draw()
    }
}

export default EditingWidget;
