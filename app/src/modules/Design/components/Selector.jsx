import React from 'react';
//import { Stage, Layer, Rect, Text, Circle, Group, Image } from 'react-konva';
import { Rect } from 'react-konva';
//import Konva from 'konva';

class Selector extends React.Component
{
  state = {
    border: 6,
    strokeWidth: 0.9,
    strokeColor: 'blue'
  }

  render() {
    const e = this.props.element;
    
    if (e)
    {
      const cam = this.props.camera;

      var w = e.properties.width  == null ? 64 : e.properties.width;
      var h = e.properties.height == null ? 64 : e.properties.height;

      if (w === "" || w < 0) w = 1;
      if (h === "" || h < 0) h = 1;

      w = w + this.state.border;
      h = h + this.state.border;

      var x = e.properties.x - this.state.border/2;
      var y = e.properties.y - this.state.border/2;

      var right = x + w;
      var down  = y + h;

      // selector on all the children disabled 
      // because we do not need that for now
      // since we are not moving children with parent
      /*
      e.content.map(child => {
        const chX = child.properties.x;
        const chY = child.properties.y;
        const chW = child.properties.width;
        const chH = child.properties.height;

        if (chX < x) x = chX;
        if (chY < y) y = chY;

        if (right < chX+chW) right = chX+chW;
        if (down  < chY+chH) down  = chY+chH;
      });
      */

      w = right - x;
      h = down  - y;

      return <Rect
        stroke={this.state.strokeColor}
        strokeWidth={this.state.strokeWidth}
        x={cam.transformX(x)}
        y={cam.transformY(y)}
        width={cam.scale(w)}
        height={cam.scale(h)}
        dash={[12,6]}
      />
    }

    return null;
  }
}

export default Selector;
