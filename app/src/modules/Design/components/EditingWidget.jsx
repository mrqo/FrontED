import React from 'react';

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

        let stage = React.createRef();
        let srcLayer = React.createRef();
        let dragLayer = React.createRef();
    }

    componentDidMount() {
        let parent = document.querySelector("#design .widget-content")
        this.setState({height: parent.clientHeight, width: parent.clientWidth})
        console.log(parent)
        console.log(parent.clientHeight)
        //this.stage.current.on('dragstart', (evt) => { this.onDragStart(evt.target) });
        //this.stage.current.on('dragend', (evt) => { this.onDragEnd(evt.target) });
    }

    getContent() {
        return (
            <Stage 
                width={this.state.width}
                height={this.state.height}
                className="widget-content"
                ref={this.stage}>
                <Layer 
                    id="srcLayer"
                    ref={this.srcLayer}>
                    <Text text="Try click on rect" />
                    <ColoredRect draggable="true"/>
                </Layer>
                <Layer 
                    id="dragLayer"
                    ref = {this.dragLayer}>
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
}

export default EditingWidget;
