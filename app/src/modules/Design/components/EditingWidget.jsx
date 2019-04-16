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
        widgetName: "Design",
        stageWidth: 400,
        stageHeight: 320,
        margin: 2
    }

    constructor(props) {
        super(props);
        this._modelChangedEventToken = PubSub.subscribe(topic.ModelChanged, this.onModelChanged.bind(this));
    }

    componentDidMount() {
        this.windowResized();
        window.addEventListener("resize", this.windowResized.bind(this));
    }

    windowResized() {
      const width  = this.refs.container.offsetWidth;
      const height = this.refs.container.offsetHeight;

      this.setState( {
        stageWidth:  width - this.state.margin*2,
        stageHeight: height - this.state.margin*2
      });
    }
  
    getContent() {
        return (
          <div
            style={{ margin: "0", padding: "0px", width: "100%", height: "93.3%", border: "0px solid red" }}
            ref="container"
          >
            <Stage 
                width={this.state.stageWidth}
                height={this.state.stageHeight}
                style={{ margin: this.state.margin, padding: "0", position: "absolute" }}
                className="widget-content"
                ref="stage">
                <Layer 
                    id="srcLayer"
                    ref="srcLayer">
                    <ColoredRect/>
                </Layer>
            </Stage>
          </div>
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
