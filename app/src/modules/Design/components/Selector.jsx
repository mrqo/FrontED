import React from 'react';
import { Stage, Layer, Rect, Text, Circle, Group, Image } from 'react-konva';
import Konva from 'konva';

class Selector extends React.Component
{
  state = {
    border: 10,
    strokeWidth: 0.6,
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

      return <Rect
        stroke={this.state.strokeColor}
        strokeWidth={this.state.strokeWidth}
        x={cam.transformX(x)}
        y={cam.transformY(y)}
        width={cam.scale(w)}
        height={cam.scale(h)}
        dash={[10,6]}
      />
    }

    return null;
  }
}

export default Selector;
