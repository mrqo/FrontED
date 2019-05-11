import React from 'react';
import { Stage, Layer, Rect, Text, Circle, Group, Image } from 'react-konva';
import Konva from 'konva';

class Selector extends React.Component
{
  state = {
    border: 10,
    strokeWidth: 4,
    strokeColor: 'blue'
  }

  render() {
    const e = this.props.element;
    
    if (e)
    {
      console.info(e);
      const cam = this.props.camera;

      var w = e.properties.width  == null ? 64 : e.properties.width;
      var h = e.properties.height == null ? 64 : e.properties.height;

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
        dash={[20,2]}
      />
    }

    return null;
  }
}

export default Selector;