import React from 'react';
import PubSub from 'pubsub-js';
import { topic } from '../../Domain/Enums/PubSubTopics';

import { Stage, Layer, Rect, Text, Circle } from 'react-konva';
import Konva from 'konva';

import Widget from '../../Common/components/Widget';
import '../../Common/components/Widget.css';

import Button from '@material-ui/core/Button';

class WorkspaceSheet extends React.Component {
  render() {
    const cam = this.props.camera;
    return (
      <Rect
        x={cam.transformX(-this.props.width/2.)}
        y={cam.transformY(-this.props.height/2.)}
        width={cam.scale(this.props.width)}
        height={cam.scale(this.props.height)}
        shadowBlur={30}
        shadowOffset={ {x: 10, y: 20} }
        fill={"white"}
      />
    )
  }
}

class TheElement extends React.Component {
  state = {
    type: "container",
    tag: Circle,
    x: 20,
    y: 40,
    width: 50,
    height: 80,
    color: 'red'
  }

  render() {
    const Tag = this.state.tag;
    const cam = this.props.camera;
    return <Tag
      x={cam.transformX(this.state.x)}
      y={cam.transformY(this.state.y)}
      width={cam.scale(this.state.width)}
      height={cam.scale(this.state.height)}
      fill={this.state.color}
      draggable={true}
      onDragEnd={(e) => { this.setState({x: cam.untransformX(e.target.x()), y: cam.untransformY(e.target.y())}) }}
    />
  }
}

class Camera
{
  constructor() {
    this.position = {
      x: 0,
      y: 0
    }
    this.zoom = 1.0
  }

  scale(v) {
    return this.zoom*v
  }

  transformX(posX) {
    return (-this.position.x + posX) * this.zoom
  }

  transformY(posY) {
    return (-this.position.y + posY) * this.zoom
  }
  
  untransformX(posX) {
    return this.position.x + posX / this.zoom
  }

  untransformY(posY) {
    return this.position.y + posY / this.zoom
  }
}

class EditingWidget extends Widget {
    state = {
        widgetName: "Design",
        stageWidth: 400,
        stageHeight: 320,
        stageMarginX: 0,
        stageMarginY: 8,
        camera: new Camera(),
        sheetWidth: 400,
        sheetHeight: 600,
    }

    constructor(props) {
        super(props);
        this._modelChangedEventToken = PubSub.subscribe(topic.ModelChanged, this.onModelChanged.bind(this));
    }

    componentDidMount() {
        this.windowResized();
        window.addEventListener("resize", this.windowResized.bind(this));

        this.state.camera.position.x = -this.state.stageWidth;
        this.state.camera.position.y = -this.state.stageHeight;

        this.refs.stage.on("mousedown", this.mouseDown.bind(this));
    }

    mouseDown(ev) {
      console.log(ev);
      console.log(this);
      ev.evt.preventDefault();
    }

    windowResized() {
      const width  = this.refs.container.offsetWidth;
      const height = this.refs.container.offsetHeight;

      this.setState( {
        stageWidth:  width - this.state.stageMarginX*2,
        stageHeight: height - this.state.stageMarginY*2
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
                style={{ margin: this.state.stageMarginX+" "+this.state.stageMarginY, padding: "0", position: "absolute" }}
                className="widget-content"
                ref="stage"
                draggable={true}
            >
                  
                <Layer
                    id="backLayer"
                    ref="backLayer">
                    <WorkspaceSheet width={this.state.sheetWidth} height={this.state.sheetHeight} camera={this.state.camera}/>
                </Layer>
                <Layer 
                    id="srcLayer"
                    ref="srcLayer">
                    <TheElement camera={this.state.camera}/>
                    <TheElement camera={this.state.camera}/>
                    <TheElement camera={this.state.camera}/>
                </Layer>
            </Stage>
          </div>
        )
    }

    getFooter() {
        return (
            <div className="widget-footer">
              Zoom: {(this.state.camera.zoom*100).toFixed(0)}%               
              <Button onClick={() => this.zoom(0.1)  } style={{ color: "white", padding: "0" }}>+</Button>
              <Button onClick={() => this.zoom(-0.1) } style={{ color: "white", padding: "0" }}>-</Button>
            </div>
        );
    }

    zoom(amount)
    {
      this.state.camera.zoom += amount;
      this.setState({camera:this.state.camera});
    }
    
    onModelChanged(msg, model) {
        console.info(model);

        var shape = new Konva.Rect({
                  x : this.state.camera.transformX(200),
                  y : this.state.camera.transformY(200),
                  width : this.state.camera.scale(50),
                  height : this.state.camera.scale(50),
                  fill : "black",
                  draggable : "true"
            });
          
        shape.on("mousedown", this.mouseDown );
      
        this.refs.srcLayer.add(shape);
        this.refs.stage.draw();
    }
}

export default EditingWidget;
