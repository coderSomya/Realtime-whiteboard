interface Pos {
  x: number;
  y: number;
}

enum Tool {
  "PENCIL",
  "RECTANGLE",
  "TEXT",
}

class Whiteboard {
  paths: Pos[][] = [];
  mousePos: Pos = { x: 0, y: 0 };
  overallFontSize: number = 1;
  rectangles = [];
  texts = [];
  activeTool: Tool = Tool.PENCIL;

  constructor() {
    let mousedown: boolean = false;

    document.onmousedown = () => {
      this.paths.push([]);
      mousedown = true;
    };
    document.onmouseup = () => {
      mousedown = false;

    };
    document.addEventListener("mousemove", (e) => {
      if (mousedown) {
        const x = e.clientX;
        const y = e.clientY;
        this.mousePos = {x, y};
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D) {

    ctx.lineWidth = this.overallFontSize;
  
    if (this.paths.length > 0) {
  
      for (const path of this.paths) {
  
        if (path.length > 0) {
  
          ctx.beginPath();
          ctx.moveTo(path[0].x, path[0].y);
  
          for (let i = 1; i < path.length; i++) {
            ctx.lineTo(path[i].x, path[i].y);
          }
          
          ctx.stroke();
        }
      }
    }
  }
  update() {
    if (this.activeTool === Tool.PENCIL) {
      if (this.paths.length > 0) {
        this.paths[this.paths.length - 1].push(this.mousePos);
      }
    }
  }

  changeFontSize() {
    const fontSize = document.getElementById("FontSize") as HTMLInputElement;
    this.overallFontSize = Number(fontSize.value);
  }
}

export default Whiteboard;
