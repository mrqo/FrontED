import React from 'react';
import PubSub from 'pubsub-js';
import { topic } from '../../Domain/Enums/PubSubTopics';
import { ElementType } from '../../Domain/Enums/Elements.js';

import { Stage, Layer, Rect, Text, Circle, Group, Image } from 'react-konva';
import Konva from 'konva';

import Widget from '../../Common/components/Widget';
import '../../Common/components/Widget.css';

import Camera from './Camera';
import WorkspaceSheet from './WorkspaceSheet';
import RenderElement from './RenderElement';
import Selector from './Selector';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class EditingWidget extends Widget {
    state = {
        widgetName: "Design",
        stageWidth: 1000,
        stageHeight: 1000,
        stageMarginX: 0,
        stageMarginY: 8,
        camera: new Camera(),
        sheetWidth: 1366,
        sheetHeight: 768,
        elements: [],
        selectedElement: null,
        debug: false
    }

    keysPressed = {
        alt: false, ctrl: false, shift: false
    }

    constructor(props) {
        super(props);
        props.manager.initSubscriptions(this);
    }

    componentDidMount() {
        this.windowResized();
        window.addEventListener("resize", this.windowResized.bind(this));

        this.refs.stage.on("mousedown", this.mouseDown.bind(this));
        this.refs.stage.container().tabIndex = 1;
        this.refs.stage.container().addEventListener("keydown", this.keyDown.bind(this));
        this.refs.stage.container().addEventListener("keyup", this.keyUp.bind(this));
    }

    mouseDown(ev) {
        //console.log(ev);
        this.refs.stage.container().focus();
        //console.log(this);
        ev.evt.preventDefault();
    }
    
    keyDown(ev) {
        //console.log(ev);
        this.keysPressed.alt   = ev.altKey;
        this.keysPressed.shift = ev.shiftKey;
        this.keysPressed.ctrl  = ev.ctrlKey;
    }

    keyUp(ev) {
        //console.log(ev);
        this.keysPressed.alt   = ev.altKey;
        this.keysPressed.shift = ev.shiftKey;
        this.keysPressed.ctrl  = ev.ctrlKey;
    }

    windowResized() {
        const width  = this.refs.container.offsetWidth;
        const height = this.refs.container.offsetHeight;

        const newStageWidth  = width - this.state.stageMarginX * 2;
        const newStageHeight = height - this.state.stageMarginY * 2;

        const zoom = this.state.camera.zoom;

        this.state.camera.position.x = -newStageWidth/2. + this.state.sheetWidth / 2. * zoom;
        this.state.camera.position.y = -newStageHeight/2. + this.state.sheetHeight / 2. * zoom;
        this.setState( {
            camera: this.state.camera,
            stageWidth:  newStageWidth, 
            stageHeight: newStageHeight
        });
    }

    updateElementPosition(idx, x, y) {
        //console.log("updateElementPosition " + idx + ": " + x + ", " + y);

        const e = this.state.elements[idx];
        let tempX = e.properties.x;
        let tempY = e.properties.y;

        e.properties.x = x;
        e.properties.y = y;
        e.commit();

        this.state.elements[idx] = e;

        for (let i = 0; i < this.state.elements.length; i++) {
            const element = this.state.elements[i];
            if(element.parent.id === e.id){
                this.updateElementPosition(i, e.properties.x + (element.properties.x - tempX), e.properties.y + (element.properties.y - tempY))
            }
        }

        this.setState( { elements: this.state.elements } );
    }

    dragEnd(ev) {
        //console.info(ev);
        if (ev.target.parent == null)
        {
            this.state.camera.stagePosition.x = ev.target.x();
            this.state.camera.stagePosition.y = ev.target.y();
            console.log(ev.target.x() + "; " + ev.target.y());
        }
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
                onDragEnd={this.dragEnd.bind(this)}
            >
                  
                <Layer
                    id="backLayer"
                    ref="backLayer">
                    <WorkspaceSheet width={this.state.sheetWidth} height={this.state.sheetHeight} camera={this.state.camera}/>
                </Layer>
                <Layer 
                    id="mainLayer"
                    ref="mainLayer">
                    {
                        this.state.elements.map( 
                            (element,i) => 
                              <RenderElement 
                                  idx={i}
                                  key={"element_"+i}
                                  updateElementPosition={this.updateElementPosition.bind(this)}
                                  camera={this.state.camera} 
                                  model={element}
                                  keysPressed={this.keysPressed}
                              />
                            
                        )
                    }
                </Layer>
                <Layer
                  id="uiLayer"
                  ref="uiLayer"
                  listening={false}>
                    {
                        this.state.selectedElement ? 
                            <Selector element={this.state.selectedElement} camera={this.state.camera}/>
                            : null
                    }
                </Layer>
            </Stage>
          </div>
        )
    }

    getFooter() {
        return (
            <div className="widget-footer">
              { 
                  this.state.debug ? 
                      <React.Fragment>
                      <TextField value={this.state.camera.position.x} onChange={(val)=>{this.setCameraPositionX(val);}}/> 
                      <TextField value={this.state.camera.position.y} onChange={(val)=>{this.setCameraPositionY(val);}}/>
                      </React.Fragment>
                  : null
              }
              Zoom: {this.state.camera ? (this.state.camera.zoom*100).toFixed(0) : 0}%               
              <Button onClick={() => this.zoom(0.1)  } style={{ color: "white", padding: "0" }}>+</Button>
              <Button onClick={() => this.zoom(-0.1) } style={{ color: "white", padding: "0" }}>-</Button>
            </div>
        );
    }

    setCameraPositionX(e)
    {
        this.state.camera.position.x = e.target.value;
        this.setState({camera:this.state.camera});
    }

    setCameraPositionY(e)
    {
        this.state.camera.position.y = e.target.value;
        this.setState({camera:this.state.camera});
    }
    

    zoom(amount)
    {
        this.state.camera.zoom += amount;
        this.setState({camera:this.state.camera});
    }
    
    onModelChangedCb(msg, data) {
        var idx = this.state.elements.indexOf(data.model);
        this.state.elements[idx] = data.model;

        this.setState({elements: this.state.elements});
    }

    onSelectionChangedCb(msg, data) {
        this.setState({selectedElement: data.newSel});
    }

    onElemCreatedCb(msg, data) {
        if (data.model) data = data.model;

        this.state.elements.push(data);
        this.setState({elements: this.state.elements});
    }

    onElementRemovedCb(msg, data) {
        if (this.state.selectedElement == data.model)
        {
            this.state.selectedElement = null;
            this.setState({selectedElement: null});
        }

        var idx = this.state.elements.indexOf(data.model);
        this.state.elements.splice(idx, 1);

        this.setState({elements: this.state.elements});
    }
}

export default EditingWidget;
