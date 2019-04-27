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
import { RenderElement, UnknownRenderElement, ImageRenderElement, ButtonRenderElement, ContainerRenderElement, LabelRenderElement } from './RenderElements';
import Selector from './Selector';

import Button from '@material-ui/core/Button';

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
        elements: [],
        selectedElement: null
    }

    constructor(props) {
        super(props);
        props.manager.initSubscriptions(this);
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

    updateElementPosition(idx, x, y) {
        console.log("updateElementPosition " + idx + ": " + x + ", " + y);

        const e = this.state.elements[idx];
        e.properties.x = x;
        e.properties.y = y;
      
        this.state.elements[idx] = e;

        this.setState( { elements: this.state.elements } );
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
                    id="mainLayer"
                    ref="mainLayer">
                    {
                        this.state.elements.map( 
                            (element,i) => 
                              <RenderElement 
                                  idx={i}
                                  updateElementPosition={this.updateElementPosition.bind(this)}
                                  camera={this.state.camera} 
                                  model={element}
                              />
                            
                        )
                    }
                </Layer>
                <Layer
                  id="uiLayer"
                  ref="uiLayer"
                  listening={false}>
                    <Selector element={this.state.selectedElement} camera={this.state.camera}/>
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
    
    onModelChangedCb(msg, data) {
        
    }

    onSelectionChangedCb(msg, data) {
        this.setState({selectedElement: data.newSel});
    }

    onElemCreatedCb(msg, data) {
        this.state.elements.push(data);
        this.setState({elements: this.state.elements});
    }
}

export default EditingWidget;
