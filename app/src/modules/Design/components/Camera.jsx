
class Camera
{
  constructor() {
    this.position = {
      x: 0,
      y: 0
    }
    this.zoom = 1.0

    this.stagePosition = {
      x: 0,
      y: 0
    }
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

export default Camera;
